import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight, FaCheckCircle, FaWifi, FaCogs, FaChartLine, FaLeaf } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './InfoSection.css';

gsap.registerPlugin(ScrollTrigger);

const InfoSection = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  
  // 탭 데이터 정의
  const tabData = [
    {
      id: 1,
      tabTitle: 'Smart Sensing',
      icon: <FaWifi size={24} />,
      title: 'Smart Sensing System',
      desc: '농장 내부의 온도, 습도, CO2, 광량 등 작물 생장에 필수적인 환경 데이터를 초정밀 센서로 실시간 수집합니다. 수집된 데이터는 클라우드 서버로 전송되어 정밀한 분석의 기초가 됩니다.',
      features: [
        '초정밀 환경 감지 센서 네트워크 구축',
        '실시간 데이터 모니터링 및 이상 알림'
      ],
      mainImage: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?auto=format&fit=crop&w=200&q=80'
      ],
      link: '/business'
    },
    {
      id: 2,
      tabTitle: 'Auto Control',
      icon: <FaCogs size={24} />,
      title: 'Remote Control System',
      desc: '언제 어디서나 스마트폰과 PC를 통해 농장 설비를 원격으로 제어할 수 있습니다. 천창 개폐, 관수, 냉난방 등을 자동화하여 노동력을 절감하고 최적의 생육 환경을 유지합니다.',
      features: [
        '24시간 원격 제어 및 자동화 시스템',
        '복합 환경 제어 알고리즘 탑재'
      ],
      mainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=200&q=80'
      ],
      link: '/business'
    },
    {
      id: 3,
      tabTitle: 'Data Analysis',
      icon: <FaChartLine size={24} />,
      title: 'Growth Data Analysis',
      desc: '축적된 빅데이터를 AI가 분석하여 작물별 최적의 생육 레시피를 제공합니다. 생산량 예측, 병해충 예방 등 데이터 기반의 의사결정을 지원하여 농가 소득 증대에 기여합니다.',
      features: [
        '빅데이터 기반 작물 생육 정밀 분석',
        'AI 예측 모델링을 통한 생산성 향상'
      ],
      mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=200&q=80'
      ],
      link: '/business'
    },
    {
      id: 4,
      tabTitle: 'Green Energy',
      icon: <FaLeaf size={24} />,
      title: 'Eco-Friendly Energy',
      desc: '지열, 태양광 등 신재생 에너지를 활용한 저탄소 에너지 솔루션을 제공합니다. 에너지 비용을 절감하고 탄소 중립을 실현하여 지속 가능한 미래 농업을 만들어갑니다.',
      features: [
        '신재생 에너지 융복합 솔루션',
        '에너지 효율 최적화 및 탄소 저감'
      ],
      mainImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1497435334941-8c899ee7e8e9?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=200&q=80'
      ],
      link: '/business'
    }
  ];

  const currentData = tabData.find(item => item.id === activeTab);

  // 탭 변경 시 애니메이션 효과
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section className="info-section" ref={containerRef}>
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <h4 className="info-sub-header">ABOUT OUR TECHNOLOGIES</h4>
          <h2 className="info-main-header">BOAS-SE 핵심 솔루션</h2>
        </div>

        {/* Tab Navigation */}
        <div className="info-tabs-wrapper mb-5">
          <Row className="g-3 justify-content-center">
            {tabData.map((tab) => (
              <Col key={tab.id} lg={3} md={6} sm={6}>
                <div 
                  className={`info-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="tab-icon">{tab.icon}</div>
                  <span className="tab-title">{tab.tabTitle}</span>
                  {/* 말풍선 꼬리 (Active 시 표시) */}
                  {activeTab === tab.id && <div className="tab-arrow"></div>}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Content Area */}
        <div className="info-content-area" ref={contentRef}>
          <Row className="align-items-center">
            {/* Left: Image Gallery */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="info-gallery">
                <div className="main-img-wrapper mb-3">
                  <img src={currentData.mainImage} alt={currentData.title} className="main-img" />
                </div>
                <Row className="g-2">
                  {currentData.thumbnails.map((thumb, index) => (
                    <Col key={index} xs={4}>
                      <div className="thumb-img-wrapper">
                        <img src={thumb} alt={`Thumbnail ${index + 1}`} className="thumb-img" />
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            {/* Right: Text Info */}
            <Col lg={6} className="ps-lg-5">
              <div className="info-details">
                <h3 className="detail-title mb-4">{currentData.title}</h3>
                <p className="detail-desc mb-4">{currentData.desc}</p>
                
                <div className="detail-features mb-5">
                  {currentData.features.map((feature, idx) => (
                    <div key={idx} className="feature-item mb-2">
                      <FaCheckCircle className="feature-icon me-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a href={currentData.link} className="detail-btn">
                  솔루션 자세히 보기 <FaArrowRight className="ms-2" />
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default InfoSection;
