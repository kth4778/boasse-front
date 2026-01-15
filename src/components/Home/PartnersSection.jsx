import React from 'react';
import './PartnersSection.css';

const PartnersSection = () => {
  // 협력사 로고 데이터 (가장 안정적인 SVG CDN 및 직접 삽입 조합)
  const partners = [
    { id: 1, name: 'LG', logo: 'https://cdn.simpleicons.org/lg' },
    { id: 2, name: 'SAMSUNG', logo: 'https://cdn.simpleicons.org/samsung' },
    { id: 3, name: 'HYUNDAI', logo: 'https://cdn.simpleicons.org/hyundai' },
    { id: 4, name: 'NAVER', logo: 'https://cdn.simpleicons.org/naver' },
    { id: 5, name: 'KAKAO', logo: 'https://cdn.simpleicons.org/kakao' },
    { id: 6, name: 'LINE', logo: 'https://cdn.simpleicons.org/line' },
    { id: 7, name: 'KIA', logo: 'https://cdn.simpleicons.org/kia' },
    { id: 8, name: 'KAKAOTALK', logo: 'https://cdn.simpleicons.org/kakaotalk' },
  ];

  // 무한 루프를 위해 배열을 복제
  const doublePartners = [...partners, ...partners];

  return (
    <section className="partners-section">
      <div className="partners-title-wrapper text-center">
        <span className="partners-sub-title">TRUSTED BY</span>
        <h2 className="partners-main-title">협력사 및 파트너</h2>
      </div>

      <div className="partners-slider-container">
        <div className="partners-track">
          {doublePartners.map((partner, index) => (
            <div className="partner-logo-item" key={`${partner.id}-${index}`}>
              <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
