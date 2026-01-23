import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import 'swiper/css';

import './HeroSlider.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * [히어로 슬라이더 컴포넌트]
 * 메인 페이지 최상단에 위치하여 회사의 핵심 가치와 비전을 시각적으로 전달하는 슬라이더입니다.
 * Swiper 라이브러리를 사용하여 슬라이드 기능을 구현하고, GSAP를 사용하여 텍스트 등장 및 스크롤 연동 애니메이션 효과를 제공합니다.
 */
const HeroSlider = () => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 슬라이드 변경 시 실행되는 텍스트 애니메이션
  const animateContent = (swiper) => {
    setActiveIndex(swiper.realIndex); // 실제 인덱스 업데이트 (Loop 모드 대응)

    // 현재 활성화된 슬라이드의 DOM 요소 가져오기
    const activeSlide = swiper.slides[swiper.activeIndex];
    const content = activeSlide.querySelector('.hero-content');
    
    if (!content) return;

    // 초기 상태 설정 후 애니메이션 실행
    gsap.set(content, { autoAlpha: 1 });
    const elements = content.querySelectorAll('.hero-subtitle, .hero-title, .hero-highlight, .btn-wrapper');
    
    gsap.fromTo(elements, 
      { y: 40, autoAlpha: 0 }, 
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: 'power3.out', overwrite: true }
    );
  };

  /*
   * [슬라이드 데이터]
   * 각 슬라이드의 ID, 이미지 경로, 소제목, 대제목, 강조 문구, 링크 정보를 정의합니다.
   * 이미지 선택 기준: 신뢰감, 전문성, 규모감, 효율성을 강조하는 인물 없는 이미지 사용
   */
  const slides = [
    {
      id: 1,
      image: '/images/HeroSlider-smartFarm.jpg',
      subtitle: 'BOAS-SE SMART FARM SOLUTION',
      title: '데이터로 완성하는\n미래 농업의 기준',
      highlight: 'AI 기반 정밀 생육 제어 시스템',
      link: '/business'
    },
    {
      id: 2,
      image: '/images/HeroSlider-smartFactory.jpg',
      subtitle: 'SMART FACTORY INNOVATION',
      title: '제조 현장의 혁신,\n지능형 자동화 솔루션',
      highlight: '실시간 설비 예지 보전과 품질 관리',
      link: '/product'
    },
    {
      id: 3,
      image: '/images/HeroSlider-smartLogitics.jpg',
      subtitle: 'AUTONOMOUS LOGISTICS',
      title: '공간을 연결하는\n자율주행의 시작',
      highlight: '스마트 물류 로봇과 통합 관제',
      link: '/product'
    }
  ];

  // 스크롤에 따른 배경 장식 요소(원형 데코) 이동 애니메이션
  useGSAP(() => {
    gsap.to('.hero-circle-deco', {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: sectionRef });

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section className="hero-slider-section" ref={sectionRef}>
      <Swiper
        modules={[Autoplay]}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-slider"
        onInit={(swiper) => {
          swiperRef.current = swiper;
          animateContent(swiper);
        }}
        onSlideChange={(swiper) => animateContent(swiper)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="hero-slide" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-circle-deco"></div>

              <Container>
                <div className="hero-content" style={{ opacity: 0 }}>
                  <span className="hero-subtitle">{slide.subtitle}</span>
                  <h2 className="hero-title">{slide.title}</h2>
                  <span className="hero-highlight">{slide.highlight}</span>
                  <div className="btn-wrapper">
                    <a href={slide.link} className="hero-btn">더 보기</a>
                  </div>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 페이지네이션 (슬라이딩 바 UI) */}
      <div className="custom-pagination-container">
        <div className="pagination-track">
          {/* 이동하는 활성 표시 바 (Active Indicator) */}
          <div 
            className="active-indicator" 
            style={{ transform: `translateX(${activeIndex * 50}px)` }} // 40px(width) + 10px(gap)
          ></div>
          
          {/* 고정된 위치 표시 점들 */}
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className="pagination-dot"
              onClick={() => handleDotClick(idx)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;