import React, { useEffect, useRef } from 'react';
import './KakaoMap.css';

const KakaoMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoMap = () => {
      const { kakao } = window;
    
      if (!kakao || !kakao.maps) {
        console.error("Kakao maps script not loaded.");
        return;
      }

      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch('충청북도 청주시 흥덕구 오송읍 오송생명로 194', (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            const mapOption = {
              center: coords,
              level: 4,
            };
    
            const map = new kakao.maps.Map(mapContainer.current, mapOption);
    
            const marker = new kakao.maps.Marker({
              position: coords,
            });
    
            marker.setMap(map);
    
            // 지도 컨트롤 추가
            const mapTypeControl = new kakao.maps.MapTypeControl();
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    
            const zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
            // 지도 드래그 이동 활성화
            map.setDraggable(true);
          } else {
            console.error('주소 검색에 실패했습니다.');
          }
        });
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoMap);
      // Unmount 시 스크립트 태그를 제거할 수도 있습니다.
      // document.head.removeChild(kakaoMapScript);
    };
  }, []);

  return (
    <div 
      id="kakao-map" 
      ref={mapContainer}
    >
      {/* 지도가 이 div에 렌더링됩니다. */}
    </div>
  );
};

export default KakaoMap;
