import React, { useState, useEffect } from 'react';
import partnerApi from '../../api/partnerApi';
import './PartnersSection.css';

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnerApi.getPartners();
        // 배열인지 확인 후 설정 (안전 장치)
        if (response.data.success && Array.isArray(response.data.data)) {
          setPartners(response.data.data);
        } else {
          setPartners([]);
        }
      } catch (error) {
        console.error('Failed to load partners:', error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // 데이터 로딩 중이어도 섹션 구조는 유지 (원한다면 로딩 스피너 표시 가능)
  if (loading) return null;

  // 무한 스크롤을 위해 데이터 복제 (데이터가 있을 때만)
  const displayPartners = partners.length > 0 
    ? [...partners, ...partners, ...partners, ...partners] 
    : [];

  return (
    <section className="partners-section">
      <div className="partners-title-wrapper text-center">
        <span className="partners-sub-title">TRUSTED BY</span>
        <h2 className="partners-main-title">Trusted Companies with BOAS-SE</h2>
      </div>

      <div className="partners-container">
        {partners.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted fs-5">등록된 파트너사가 준비 중입니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
