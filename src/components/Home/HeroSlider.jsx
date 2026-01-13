import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Container } from 'react-bootstrap';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './HeroSlider.css';

const HeroSlider = () => {
  // TODO: [DATA] 메인 슬라이더 데이터 수정 (이미지, 텍스트, 링크)
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80', // TODO: 실제 배경 이미지 경로로 변경
      subtitle: '서브 타이틀 텍스트가 들어갑니다',
      title: '메인 타이틀 텍스트',
      highlight: '강조할 키워드',
      link: '/link-1' // TODO: 이동할 페이지 경로
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80',
      subtitle: '두 번째 슬라이드 서브 설명',
      title: '두 번째 메인 타이틀',
      highlight: '핵심 포인트',
      link: '/link-2'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80',
      subtitle: '세 번째 슬라이드 서브 설명',
      title: '세 번째 메인 타이틀',
      highlight: '강조 문구',
      link: '/link-3'
    }
  ];

  return (
    <section className="hero-slider-section">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-slider"
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
                <div className="hero-content">
                  <span className="hero-subtitle animate-subtitle">{slide.subtitle}</span>
                  <h2 className="hero-title animate-title">
                    {slide.title}
                  </h2>
                  <span className="hero-highlight animate-highlight">{slide.highlight}</span>
                  
                  <div className="hero-bar animate-bar"></div>

                  <div className="animate-btn">
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
