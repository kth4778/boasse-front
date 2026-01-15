import React from 'react';
import './PartnersSection.css';

// assets/Companies 폴더의 모든 이미지를 자동으로 가져오기
const companyLogos = import.meta.glob('../../assets/Companies/*.{png,jpg,jpeg,svg}', { eager: true });

const PartnersSection = () => {
  // 가져온 이미지 객체를 배열로 변환
  const basePartners = Object.entries(companyLogos).map(([path, module], index) => {
    // 파일명에서 이름 추출 (예: ../../assets/Companies/삼성.png -> 삼성)
    const fileName = path.split('/').pop().split('.')[0];
    return {
      id: index + 1,
      name: fileName,
      logo: module.default
    };
  });

  // 무한 스크롤 끊김 방지를 위해 데이터 충분히 복제
  // 데이터 개수가 많아졌으므로 복제 횟수를 조절 (2번만 반복해도 충분)
  const partners = [...basePartners, ...basePartners];

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
