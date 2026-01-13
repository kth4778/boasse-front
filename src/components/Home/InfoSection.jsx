import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronRight, FaChalkboardTeacher, FaTools, FaImages, FaQuestionCircle } from 'react-icons/fa';
import './InfoSection.css';

const InfoSection = () => {
  // TODO: [DATA] 안내 섹션 데이터 수정 (아이콘, 제목, 링크)
  const infoData = [
    {
      id: 1,
      title: '서비스 이름 1',
      icon: <FaChalkboardTeacher size={50} color="#09827b" />, // TODO: 아이콘 교체 가능
      link: '/service-1'
    },
    {
      id: 2,
      title: '서비스 이름 2',
      icon: <FaTools size={45} color="#308772" />,
      link: '/service-2'
    },
    {
      id: 3,
      title: '서비스 이름 3',
      icon: <FaImages size={45} color="#53B572" />,
      link: '/service-3'
    },
    {
      id: 4,
      title: '서비스 이름 4',
      icon: <FaQuestionCircle size={45} color="#71e7c5" />,
      link: '/service-4'
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
                  {item.icon}
                </div>
                <div className="info-text-wrapper">
                  <h3 className="info-title">{item.title}</h3>
                  <a href={item.link} className="info-btn">
                    자세히 보기 <FaChevronRight size={12} />
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