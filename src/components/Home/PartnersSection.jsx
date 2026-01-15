import React from 'react';
import './PartnersSection.css';

const PartnersSection = () => {
  // 협력사 로고 데이터
  const basePartners = [
    { id: 1, name: 'LG', logo: 'https://cdn.simpleicons.org/lg' },
    { id: 2, name: 'SAMSUNG', logo: 'https://cdn.simpleicons.org/samsung' },
    { id: 3, name: 'HYUNDAI', logo: 'https://cdn.simpleicons.org/hyundai' },
    { id: 4, name: 'NAVER', logo: 'https://cdn.simpleicons.org/naver' },
    { id: 5, name: 'KAKAO', logo: 'https://cdn.simpleicons.org/kakao' },
    { id: 6, name: 'LINE', logo: 'https://cdn.simpleicons.org/line' },
    { id: 7, name: 'KIA', logo: 'https://cdn.simpleicons.org/kia' },
    { id: 8, name: 'SK', logo: 'https://cdn.simpleicons.org/sk' }, // SK 추가
    { id: 9, name: 'KT', logo: 'https://cdn.simpleicons.org/kt' }, // KT 추가
    { id: 10, name: 'POSCO', logo: 'https://cdn.simpleicons.org/sony' } // 대체 아이콘
  ];

  // 무한 스크롤 끊김 방지를 위해 데이터 충분히 복제 (4번 반복)
  const partners = [...basePartners, ...basePartners, ...basePartners, ...basePartners];

  return (
    <section className="partners-section">
      <div className="partners-title-wrapper text-center">
        <span className="partners-sub-title">TRUSTED BY</span>
        <h2 className="partners-main-title">Trusted Companies with BOAS-SE</h2>
      </div>

      <div className="partners-container">
        {/* 첫 번째 줄 (홀수): 왼쪽으로 천천히 */}
        <div className="partners-row">
          <div className="partners-track scroll-left-slow">
            {partners.map((partner, index) => (
              <div className="partner-card" key={`row1-${index}`}>
                <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
              </div>
            ))}
          </div>
        </div>

        {/* 두 번째 줄 (짝수): 오른쪽으로 더 천천히 */}
        <div className="partners-row">
          <div className="partners-track scroll-right-slower">
            {partners.map((partner, index) => (
              <div className="partner-card" key={`row2-${index}`}>
                <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
              </div>
            ))}
          </div>
        </div>

        {/* 세 번째 줄 (홀수): 왼쪽으로 아주 약간 빠르게 */}
        <div className="partners-row">
          <div className="partners-track scroll-left-medium">
            {partners.map((partner, index) => (
              <div className="partner-card" key={`row3-${index}`}>
                <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
