import React, { useState, useEffect } from 'react';
import partnerApi from '../../api/partnerApi';
import './PartnersSection.css';

// assets/Companies 폴더의 모든 이미지를 자동으로 가져오기 (Fallback용)
const companyLogos = import.meta.glob('../../assets/Companies/*.{png,jpg,jpeg,svg}', { eager: true });

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 기본 파트너 데이터 (로컬 파일)
  const defaultPartners = Object.entries(companyLogos).map(([path, module], index) => {
    const fileName = path.split('/').pop().split('.')[0];
    return {
      id: `default-${index}`,
      name: fileName,
      logo: module.default
    };
  });

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnerApi.getPartners();
        if (response.data.success && response.data.data.length > 0) {
          setPartners(response.data.data);
        } else {
          // 등록된 파트너가 없으면 기본 로컬 파일 사용
          setPartners(defaultPartners);
        }
      } catch (error) {
        console.error('Failed to load partners:', error);
        setPartners(defaultPartners);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // 무한 스크롤 끊김 방지를 위해 데이터 충분히 복제
  // 데이터 개수가 적으면 스크롤이 끊겨 보일 수 있으므로 최소 개수 확보
  const displayPartners = partners.length > 0 
    ? [...partners, ...partners, ...partners, ...partners] // 충분히 길게 복제
    : [];

  if (loading) return null; // 또는 로딩 스피너

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
            {displayPartners.map((partner, index) => (
              partner.link ? (
                <a 
                  href={partner.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="partner-card partner-card-link" 
                  key={`row1-${index}`}
                >
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </a>
              ) : (
                <div className="partner-card" key={`row1-${index}`}>
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </div>
              )
            ))}
          </div>
        </div>

        {/* 두 번째 줄 (짝수): 오른쪽으로 더 천천히 */}
        <div className="partners-row">
          <div className="partners-track scroll-right-slower">
            {displayPartners.map((partner, index) => (
              partner.link ? (
                <a 
                  href={partner.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="partner-card partner-card-link" 
                  key={`row2-${index}`}
                >
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </a>
              ) : (
                <div className="partner-card" key={`row2-${index}`}>
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </div>
              )
            ))}
          </div>
        </div>

        {/* 세 번째 줄 (홀수): 왼쪽으로 아주 약간 빠르게 */}
        <div className="partners-row">
          <div className="partners-track scroll-left-medium">
            {displayPartners.map((partner, index) => (
              partner.link ? (
                <a 
                  href={partner.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="partner-card partner-card-link" 
                  key={`row3-${index}`}
                >
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </a>
              ) : (
                <div className="partner-card" key={`row3-${index}`}>
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
