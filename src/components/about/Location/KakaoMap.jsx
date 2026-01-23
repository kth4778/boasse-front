import React, { useEffect, useRef, useState } from 'react';
import './KakaoMap.css';

// 지도에 표시할 위치 정보 (본사, 공장)
const LOCATIONS = [
  { id: 0, title: '본사 (사무실)', address: '충청북도 청주시 흥덕구 오송읍 오송생명로 194' },
  { id: 1, title: '공장', address: '충북 청주시 흥덕구 월명로 55번길 31' }
];

/*
 * [카카오맵 지도 컴포넌트]
 * Kakao Maps API를 사용하여 회사 위치(본사, 공장)를 지도에 표시합니다.
 * 주소를 좌표로 변환(Geocoding)하여 마커를 생성하고, 버튼 클릭 시 해당 위치로 지도를 이동시키는 기능을 제공합니다.
 */
const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [coordsList, setCoordsList] = useState([]); 
  const [activeId, setActiveId] = useState(0); 

  useEffect(() => {
    // Kakao Maps SDK 스크립트 로드 확인 및 삽입
    let kakaoMapScript = document.querySelector('script[src*="dapi.kakao.com"]');
    
    if (!kakaoMapScript) {
      kakaoMapScript = document.createElement('script');
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(kakaoMapScript);
    }

    // 스크립트 로드 완료 후 지도 초기화 함수
    const onLoadKakaoMap = () => {
      const { kakao } = window;
    
      if (!kakao || !kakao.maps) {
        console.error("Kakao maps script not loaded.");
        return;
      }

      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        
        // 주소를 좌표로 변환하는 비동기 작업 병렬 처리
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

          // 초기 중심 좌표 설정 (본사 기준)
          const officeCoords = validCoords.find(c => c.id === 0);
          const initialCenter = officeCoords 
            ? new kakao.maps.LatLng(officeCoords.lat, officeCoords.lng) 
            : new kakao.maps.LatLng(36.6424341, 127.4890319); 

          const mapOption = {
            center: initialCenter,
            level: 3, // 지도 확대 레벨
          };
          const map = new kakao.maps.Map(mapContainer.current, mapOption);
          setMapInstance(map);

          // 지도 컨트롤 추가 (스카이뷰/지도타입, 줌 컨트롤)
          const mapTypeControl = new kakao.maps.MapTypeControl();
          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
          map.setDraggable(true);

          // 마커 및 커스텀 오버레이 생성
          validCoords.forEach(coord => {
            const position = new kakao.maps.LatLng(coord.lat, coord.lng);
            
            new kakao.maps.Marker({
              map: map,
              position: position,
            });

            // 마커 위에 표시될 위치 이름 라벨 (인포윈도우 대신 커스텀 오버레이 사용)
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
                margin-bottom: 40px; 
              ">${coord.title}</div>
            `;
            const infowindow = new kakao.maps.CustomOverlay({
                position: position,
                content: iwContent,
                yAnchor: 2.4 // 마커 머리 위쪽에 위치하도록 조정
            });
            infowindow.setMap(map);
          });
        });
      });
    };

    // 이미 스크립트가 로드되어 있다면 즉시 실행, 아니면 로드 이벤트 리스너 등록
    if (window.kakao && window.kakao.maps) {
      onLoadKakaoMap();
    } else {
      kakaoMapScript.addEventListener('load', onLoadKakaoMap);
    }

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, []);

  // 위치 버튼 클릭 시 해당 좌표로 지도 중심 이동
  const handleLocationClick = (id) => {
    setActiveId(id);
    if (!mapInstance) return;

    const target = coordsList.find(c => c.id === id);
    if (target && window.kakao) {
      const moveLatLon = new window.kakao.maps.LatLng(target.lat, target.lng);
      mapInstance.panTo(moveLatLon); // 부드러운 이동 효과
    }
  };

  return (
    <div className="map-wrapper">
      {/* 위치 전환 버튼 그룹 */}
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
      
      {/* 지도 컨테이너 */}
      <div 
        id="kakao-map" 
        ref={mapContainer}
      >
      </div>
    </div>
  );
};

export default KakaoMap;
