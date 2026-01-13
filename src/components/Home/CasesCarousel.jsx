import React from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import './CasesCarousel.css';

// Swiper Style (이미 HeroSlider에서 import 했지만, 명시적으로 포함)
import 'swiper/css';
import 'swiper/css/navigation';

const CasesCarousel = () => {
  const cases = [
    {
      id: 1,
      title: '후드 & 닥트 설치 사진',
      image: 'https://via.placeholder.com/600x400/333333/ffffff?text=Hood+Duct',
      link: '/cases/1'
    },
    {
      id: 2,
      title: '여과집진기(백필터) 설치 사진',
      image: 'https://via.placeholder.com/600x400/555555/ffffff?text=Filter',
      link: '/cases/2'
    },
    {
      id: 3,
      title: '흡착탑(활성탄집진기) 설치 사진',
      image: 'https://via.placeholder.com/600x400/777777/ffffff?text=Activated+Carbon',
      link: '/cases/3'
    },
    {
      id: 4,
      title: '스크라바 집진기 설치 사진',
      image: 'https://via.placeholder.com/600x400/999999/ffffff?text=Scrubber',
      link: '/cases/4'
    },
    {
      id: 5,
      title: '집진기 제작 현장',
      image: 'https://via.placeholder.com/600x400/222222/ffffff?text=Factory',
      link: '/cases/5'
    }
  ];

  return (
    <section className="cases-section">
      <Container>
        <div className="section-header text-center text-lg-start">
          <h6 className="sub-title">SAFETY HUMANITY</h6>
          <h2 className="main-title">설치사례</h2>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="cases-swiper"
        >
          {cases.map((item) => (
            <SwiperSlide key={item.id}>
              <a href={item.link} className="case-card">
                <div className="case-img-wrapper">
                  <img src={item.image} alt={item.title} className="case-img" />
                </div>
                <div className="case-info">
                  <h3 className="case-title">{item.title}</h3>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default CasesCarousel;
