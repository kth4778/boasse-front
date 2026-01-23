import React, { useEffect, useRef, useState } from 'react';
import './KakaoMap.css';

const LOCATIONS = [
  { id: 0, title: '본사 (사무실)', address: '충청북도 청주시 흥덕구 오송읍 오송생명로 194' },
  { id: 1, title: '공장', address: '충북 청주시 흥덕구 월명로 55번길 31' }
];

const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [coordsList, setCoordsList] = useState([]); 
  const [activeId, setActiveId] = useState(0); 

  useEffect(() => {
    let kakaoMapScript = document.querySelector('script[src*="dapi.kakao.com"]');
    
    if (!kakaoMapScript) {
      kakaoMapScript = document.createElement('script');
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(kakaoMapScript);
    }

    const onLoadKakaoMap = () => {
      const { kakao } = window;
    
      if (!kakao || !kakao.maps) {
        console.error("Kakao maps script not loaded.");
        return;
      }

      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        
        const promises = LOCATIONS.map(loc => {
          return new Promise((resolve) => {
            geocoder.addressSearch(loc.address, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                resolve({
                  id: loc.id,
                  title: loc.title,
                  lat: result[0].y,
                  lng: result[0].x
                });
              } else {
                resolve(null);
              }
            });
          });
        });

        Promise.all(promises).then(results => {
          const validCoords = results.filter(c => c !== null);
          setCoordsList(validCoords);

          const officeCoords = validCoords.find(c => c.id === 0);
          const initialCenter = officeCoords 
            ? new kakao.maps.LatLng(officeCoords.lat, officeCoords.lng) 
            : new kakao.maps.LatLng(36.6424341, 127.4890319); 

          const mapOption = {
            center: initialCenter,
            level: 3, 
          };
          const map = new kakao.maps.Map(mapContainer.current, mapOption);
          setMapInstance(map);

          const mapTypeControl = new kakao.maps.MapTypeControl();
          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
          map.setDraggable(true);

          validCoords.forEach(coord => {
            const position = new kakao.maps.LatLng(coord.lat, coord.lng);
            
            // Marker 생성 (변수 할당 불필요)
            new kakao.maps.Marker({
              map: map,
              position: position,
            });

            // 인포윈도우 스타일 최적화 (텍스트 크기에 맞게)
            const iwContent = `
              <div style="
                padding: 4px 10px; 
                font-size: 12px; 
                font-weight: bold; 
                color: #1e2f23;
                background: #fff; 
                border: 1px solid #8CC63F; 
                border-radius: 20px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                white-space: nowrap;
                display: inline-block;
                margin-bottom: 40px; /* 마커 위에 떠 있게 조정 */
              ">${coord.title}</div>
            `;
            const infowindow = new kakao.maps.CustomOverlay({
                position: position,
                content: iwContent,
                yAnchor: 2.4 // 마커 위쪽으로 위치 조정
            });
            infowindow.setMap(map);
          });
        });
      });
    };

    if (window.kakao && window.kakao.maps) {
      onLoadKakaoMap();
    } else {
      kakaoMapScript.addEventListener('load', onLoadKakaoMap);
    }

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, []);

  const handleLocationClick = (id) => {
    setActiveId(id);
    if (!mapInstance) return;

    const target = coordsList.find(c => c.id === id);
    if (target && window.kakao) {
      const moveLatLon = new window.kakao.maps.LatLng(target.lat, target.lng);
      mapInstance.panTo(moveLatLon);
    }
  };

  return (
    <div className="map-wrapper">
      <div className="map-controls">
        {LOCATIONS.map(loc => (
          <button
            key={loc.id}
            className={`map-control-btn ${activeId === loc.id ? 'active' : ''}`}
            onClick={() => handleLocationClick(loc.id)}
          >
            {loc.title}
          </button>
        ))}
      </div>
      
      <div 
        id="kakao-map" 
        ref={mapContainer}
      >
      </div>
    </div>
  );
};

export default KakaoMap;