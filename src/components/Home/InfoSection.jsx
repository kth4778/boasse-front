import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import './InfoSection.css';

const InfoSection = () => {
  const infoData = [
    {
      id: 1,
      title: '방문컨설팅',
      // 임시 아이콘 이미지 (추후 assets/images에 실제 파일 넣고 경로 변경 필요)
      icon: 'https://via.placeholder.com/80/09827b/ffffff?text=Consult',
      link: '/consulting'
    },
    {
      id: 2,
      title: '전문가 현장분석',
      icon: 'https://via.placeholder.com/80/308772/ffffff?text=Analysis',
      link: '/analysis'
    },
    {
      id: 3,
      title: '시공사례',
      icon: 'https://via.placeholder.com/80/53B572/ffffff?text=Cases',
      link: '/cases'
    },
    {
      id: 4,
      title: '시공문의',
      icon: 'https://via.placeholder.com/80/71e7c5/ffffff?text=Inquiry',
      link: '/contact'
    }
  ];

  return (
    <section className="info-section">
      <Container>
        <Row className="g-4">
          {infoData.map((item) => (
            <Col key={item.id} lg={3} md={6} sm={12}>
              <div className="info-card">
                <div className="info-icon-wrapper">
                  <img src={item.icon} alt={item.title} className="info-icon" />
                </div>
                <div className="info-text-wrapper">
                  <h3 className="info-title">{item.title}</h3>
                  <a href={item.link} className="info-btn">
                    자세히 보기 <FaChevronRight />
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default InfoSection;
