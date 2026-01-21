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

const HeroSlider = () => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 컨텐츠 애니메이션 함수
  const animateContent = (swiper) => {
    setActiveIndex(swiper.realIndex); // 실제 인덱스 업데이트 (Loop 모드 대응)

    // ... 기존 애니메이션 로직 ...
    const activeSlide = swiper.slides[swiper.activeIndex];
    const content = activeSlide.querySelector('.hero-content');
    
    if (!content) return;

    gsap.set(content, { autoAlpha: 1 });
    const elements = content.querySelectorAll('.hero-subtitle, .hero-title, .hero-highlight, .btn-wrapper');
    
    gsap.fromTo(elements, 
      { y: 40, autoAlpha: 0 }, 
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: 'power3.out', overwrite: true }
    );
  };

  const slides = [
    {
      id: 1,
      // Smart Farm: 깨끗한 스마트 온실 내부 (신뢰감, 청정 이미지, 인물 없음)
      image: '/images/HeroSlider-smartFarm.jpg',
      subtitle: 'BOAS-SE SMART FARM SOLUTION',
      title: '데이터로 완성하는\n미래 농업의 기준',
      highlight: 'AI 기반 정밀 생육 제어 시스템',
      link: '/business'
    },
    {
      id: 2,
      // Smart Factory: 자동화 로봇 팔 (전문성, 기술력, 인물 없음)
      image: '/images/HeroSlider-smartFactory.jpg',
      subtitle: 'SMART FACTORY INNOVATION',
      title: '제조 현장의 혁신,\n지능형 자동화 솔루션',
      highlight: '실시간 설비 예지 보전과 품질 관리',
      link: '/product'
    },
    {
      id: 3,
      // Smart Mobility: 현대적인 물류 창고 (규모감, 효율성, 인물 없음)
      image: '/images/HeroSlider-smartLogitics.jpg',
      subtitle: 'AUTONOMOUS LOGISTICS',
      title: '공간을 연결하는\n자율주행의 시작',
      highlight: '스마트 물류 로봇과 통합 관제',
      link: '/product'
    }
  ];

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

      {/* 커스텀 페이지네이션 (슬라이딩 바) */}
      <div className="custom-pagination-container">
        <div className="pagination-track">
          {/* 이동하는 녹색 바 */}
          <div 
            className="active-indicator" 
            style={{ transform: `translateX(${activeIndex * 50}px)` }} // 40px(width) + 10px(gap)
          ></div>
          
          {/* 고정된 회색 불렛들 */}
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
