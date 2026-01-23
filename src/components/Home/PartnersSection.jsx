import React, { useState, useEffect } from 'react';
import partnerApi from '../../api/partnerApi';
import './PartnersSection.css';

/*
 * [파트너사(협력사) 소개 섹션]
 * 회사의 파트너사 로고들을 무한 스크롤되는 배너 형태로 보여주는 섹션입니다.
 * 신뢰감을 주기 위해 'Trusted Companies'라는 타이틀을 사용하며, 로고 클릭 시 해당 파트너사 링크로 이동할 수 있습니다.
 */
const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 파트너사 데이터 로드
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnerApi.getPartners();
        const res = response.data;

        // API 응답 구조에 따라 데이터 추출 (유연한 처리)
        let partnerList = [];
        if (res.success && res.data) {
          if (Array.isArray(res.data.items)) {
            partnerList = res.data.items;
          } else if (Array.isArray(res.data)) {
            partnerList = res.data;
          } else if (Array.isArray(res.data.partners)) {
            partnerList = res.data.partners;
          }
        }
        setPartners(partnerList);
      } catch (error) {
        console.error('Failed to load partners:', error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) return null;

  // 무한 스크롤 효과를 위해 데이터를 4배로 복제하여 배열 생성 (끊김 없는 흐름 연출)
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
            {/* 첫 번째 줄 (홀수 줄): 왼쪽 방향으로 천천히 흐름 */}
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
                      <img src={partnerApi.getImageUrl(partner.logo)} alt={partner.name} className="partner-logo-img" />
                    </a>
                  ) : (
                    <div className="partner-card" key={`row1-${index}`}>
                      <img src={partnerApi.getImageUrl(partner.logo)} alt={partner.name} className="partner-logo-img" />
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* 두 번째 줄 (짝수 줄): 오른쪽 방향으로 더 천천히 흐름 */}
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
                      <img src={partnerApi.getImageUrl(partner.logo)} alt={partner.name} className="partner-logo-img" />
                    </a>
                  ) : (
                    <div className="partner-card" key={`row2-${index}`}>
                      <img src={partnerApi.getImageUrl(partner.logo)} alt={partner.name} className="partner-logo-img" />
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* 세 번째 줄 (홀수 줄): 다시 왼쪽 방향으로 조금 빠르게 흐름 */}
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
                      <img src={partnerApi.getImageUrl(partner.logo)} alt={partner.name} className="partner-logo-img" />
                    </a>
                  ) : (
                    <div className="partner-card" key={`row3-${index}`}>
                      <img src={partnerApi.getImageUrl(partner.logo)} alt={partner.name} className="partner-logo-img" />
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