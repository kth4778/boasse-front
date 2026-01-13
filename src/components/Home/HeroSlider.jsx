import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Button, Container } from 'react-bootstrap';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './HeroSlider.css';

const HeroSlider = () => {
  // 슬라이드 데이터 (나중에 CMS나 API로 교체 가능)
  const slides = [
    {
      id: 1,
      image: 'https://via.placeholder.com/1920x800/333333/ffffff?text=Slide+1+Image', // 임시 이미지
      subtitle: '오염물질을 제거하는',
      title: '산업전반 걸쳐 발생하는 각종,미스트, 흄 등의',
      desc: '제작형 백필터 집진기',
      link: '/products/bag-filter'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/1920x800/09827b/ffffff?text=Slide+2+Image', // 임시 이미지
      subtitle: '오염물질을 제거하는',
      title: '현장 맞춤형 이동식 집진기',
      desc: '강력한 흡입력과 편리한 이동성',
      link: '/products/portable'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/1920x800/308772/ffffff?text=Slide+3+Image', // 임시 이미지
      subtitle: '악취를 중화반응시켜 배출하는',
      title: '대기오염물질 배출시설 유해가스 처리',
      desc: '스크라바 집진기',
      link: '/products/scrubber'
    }
  ];

  return (
    <section className="hero-slider-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
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
              <Container>
                <div className="hero-content">
                  <span className="hero-subtitle animate-subtitle">{slide.subtitle}</span>
                  <h2 className="hero-title animate-title" style={{ whiteSpace: 'pre-line' }}>
                    {slide.title}
                  </h2>
                  <p className="hero-desc animate-desc">{slide.desc}</p>
                  <div className="animate-btn">
                    <Button 
                      variant="primary" 
                      className="rounded-pill px-4 py-2 bg-primary-custom border-0"
                      href={slide.link}
                    >
                      더 보기
                    </Button>
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
