import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import 'swiper/css';
import 'swiper/css/pagination';
/* import 'swiper/css/effect-fade'; 제거 */

import './HeroSlider.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSlider = () => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  // 컨텐츠 애니메이션 함수
  const animateContent = (swiper) => {
    // 활성 슬라이드 찾기 (Loop 모드일 경우 duplicate 슬라이드 처리 주의)
    const activeSlide = swiper.slides[swiper.activeIndex];
    const content = activeSlide.querySelector('.hero-content');
    
    if (!content) return;

    // 1. 부모 컨테이너 보이게 설정
    gsap.set(content, { autoAlpha: 1 });
    
    // 2. 자식 요소들 애니메이션
    const elements = content.querySelectorAll('.hero-subtitle, .hero-title, .hero-highlight, .btn-wrapper');
    
    // 이전 애니메이션 제거 후 새로 시작
    gsap.fromTo(elements, 
      { 
        y: 40, 
        autoAlpha: 0 
      }, 
      { 
        y: 0, 
        autoAlpha: 1, 
        duration: 1, 
        stagger: 0.15, 
        ease: 'power3.out',
        overwrite: true 
      }
    );
  };

  // TODO: [DATA] 메인 슬라이더 데이터 수정 (이미지, 텍스트, 링크)
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1920&q=80',
      subtitle: 'BOAS-SE SMART FARM SOLUTION',
      title: '데이터로 완성하는\n미래 농업의 기준',
      highlight: '최적의 생육 환경 제어',
      link: '/business'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
      subtitle: 'ZERO CARBON TECHNOLOGY',
      title: '탄소 배출 0%,\n지구와 상생하는 기술',
      highlight: '친환경 에너지 관리 시스템',
      link: '/about'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1920&q=80',
      subtitle: 'IoT CONTROL SYSTEM',
      title: '언제 어디서나\n손끝으로 만드는 수확',
      highlight: '초정밀 원격 제어 솔루션',
      link: '/product'
    }
  ];

  useGSAP(() => {
    // 스크롤 시 데코 요소 패럴랙스만 유지
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

  return (
    <section className="hero-slider-section" ref={sectionRef}>
      <Swiper
        modules={[Pagination, Autoplay]}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
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
                <div className="hero-content" style={{ opacity: 0 }}> {/* 초기 겹침 방지 위해 컨테이너 opacity 0 시작 (GSAP가 1로 만듦) */}
                  <span className="hero-subtitle">{slide.subtitle}</span>
                  <h2 className="hero-title">
                    {slide.title}
                  </h2>
                  <span className="hero-highlight">{slide.highlight}</span>

                  <div className="btn-wrapper">
                    <a href={slide.link} className="hero-btn">
                      더 보기
                    </a>
                  </div>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
