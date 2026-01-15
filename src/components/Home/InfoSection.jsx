import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative, Controller } from 'swiper/modules';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import './InfoSection.css';

const InfoSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // 데이터 정의
  const solutions = [
    {
      id: 1,
      category: 'Smart Sensing',
      title: '스마트 센싱 시스템',
      desc: '농장 내부의 온도, 습도, CO2, 광량 등 작물 생장에 필수적인 환경 데이터를 초정밀 센서로 실시간 수집합니다. 수집된 데이터는 클라우드 서버로 전송되어 정밀한 분석의 기초가 됩니다.',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&w=1200&q=80',
      link: '/business'
    },
    {
      id: 2,
      category: 'Auto Control',
      title: '원격 제어 시스템',
      desc: '언제 어디서나 스마트폰과 PC를 통해 농장 설비를 원격으로 제어할 수 있습니다. 천창 개폐, 관수, 냉난방 등을 자동화하여 노동력을 절감하고 최적의 생육 환경을 유지합니다.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&w=1200&q=80',
      link: '/business'
    },
    {
      id: 3,
      category: 'Data Analysis',
      title: '생육 데이터 분석',
      desc: '축적된 빅데이터를 AI가 분석하여 작물별 최적의 생육 레시피를 제공합니다. 생산량 예측, 병해충 예방 등 데이터 기반의 의사결정을 지원하여 농가 소득 증대에 기여합니다.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=1200&q=80',
      link: '/business'
    },
    {
      id: 4,
      category: 'Green Energy',
      title: '친환경 에너지 솔루션',
      desc: '지열, 태양광 등 신재생 에너지를 활용한 저탄소 에너지 솔루션을 제공합니다. 에너지 비용을 절감하고 탄소 중립을 실현하여 지속 가능한 미래 농업을 만들어갑니다.',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&w=1200&q=80',
      link: '/business'
    }
  ];

  const activeSolution = solutions[activeIndex];

  // GSAP: 섹션 진입 시 텍스트 애니메이션
  useGSAP(() => {
    gsap.fromTo('.info-text-content', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
  }, { scope: containerRef });

  // 슬라이드 변경 핸들러
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    // 텍스트 변경 시 깜빡임 효과
    gsap.fromTo('.info-text-anim',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  };

  const handleNavClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <section className="info-section" ref={containerRef}>
      <Container fluid className="px-lg-5">
        <Row className="mb-5 align-items-end info-header-row">
          <Col lg={4} className="mb-4 mb-lg-0">
            <h4 className="info-top-label">Business Divisions</h4>
            <h2 className="info-main-title">BOAS-SE<br />핵심 솔루션</h2>
          </Col>
          <Col lg={8} className="d-flex justify-content-lg-end align-items-center">
             <div className="info-nav-list">
               {solutions.map((sol, idx) => (
                 <div 
                  key={sol.id} 
                  className={`info-nav-item ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => handleNavClick(idx)}
                 >
                   {activeIndex === idx && <span className="arrow-indicator">→</span>}
                   <span className="nav-text">{sol.category}</span>
                 </div>
               ))}
             </div>
          </Col>
        </Row>

        <Row className="align-items-stretch content-row">
          {/* Left: Text Content */}
          <Col lg={4} className="d-flex flex-column justify-content-center pe-lg-5 mb-5 mb-lg-0 info-text-col">
            <div className="info-text-content info-text-anim">
              <h3 className="solution-title mb-4">{activeSolution.title}</h3>
              <p className="solution-desc mb-5">{activeSolution.desc}</p>
              <a href={activeSolution.link} className="solution-link">
                자세히 보기 <FaArrowRight className="ms-2" />
              </a>
            </div>
          </Col>

          {/* Right: Swiper Slider */}
          <Col lg={8} className="ps-lg-0 info-slider-col">
            <Swiper
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              modules={[Navigation, Pagination, EffectCreative, Controller]}
              spaceBetween={30}
              slidesPerView={1.5} // 중요: 다음/이전 슬라이드가 보이도록 설정
              centeredSlides={true} // 활성 슬라이드를 가운데(혹은 왼쪽 정렬 제어)
              grabCursor={true}
              effect={'creative'}
              creativeEffect={{
                limitProgress: 2, // 렌더링 최적화
                prev: {
                  // 이전 슬라이드: 왼쪽으로 이동하면서 살짝 보임, 스케일 줄임, 어둡게
                  translate: ['-55%', 0, -200], // [x, y, z]
                  scale: 0.9,
                  opacity: 0.6,
                  origin: 'right center', // 오른쪽 기준 정렬
                },
                next: {
                  // 다음 슬라이드: 오른쪽에서 대기, 약간 겹침
                  translate: ['60%', 0, 0], 
                  scale: 1,
                  opacity: 1,
                  origin: 'left center',
                  shadow: true,
                },
              }}
              className="info-swiper"
              breakpoints={{
                // 모바일에서는 하나씩
                320: {
                  slidesPerView: 1,
                  effect: 'slide', // 모바일은 일반 슬라이드
                  spaceBetween: 20
                },
                992: {
                  slidesPerView: 1.6, // 데스크탑 비율
                  spaceBetween: -50, // 겹침 효과를 위해 음수 마진 활용 가능 (creative effect와 조합)
                }
              }}
            >
              {solutions.map((sol) => (
                <SwiperSlide key={sol.id} className="info-slide">
                  <div className="slide-img-wrapper">
                    <img src={sol.image} alt={sol.title} className="slide-img" />
                    <div className="slide-overlay"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons (Optional) */}
            <div className="swiper-custom-nav mt-4 d-flex gap-3 d-lg-none">
                {/* 모바일용 간단 네비게이션 */}
                <button onClick={() => swiperInstance?.slidePrev()} className="btn btn-outline-dark btn-sm">Prev</button>
                <button onClick={() => swiperInstance?.slideNext()} className="btn btn-outline-dark btn-sm">Next</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InfoSection;
