import React from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './CasesCarousel.css';

import 'swiper/css';

const CasesCarousel = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  // TODO: [DATA] 설치 사례 데이터 수정 (이미지, 제목)
  const cases = [
    {
      id: 1,
      title: '설치 사례 제목 1',
      image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=600&q=80', // TODO: 현장 사진으로 교체
      link: '/case-1'
    },
    {
      id: 2,
      title: '설치 사례 제목 2',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
      link: '/case-2'
    },
    {
      id: 3,
      title: '설치 사례 제목 3',
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=600&q=80',
      link: '/case-3'
    },
    {
      id: 4,
      title: '설치 사례 제목 4',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
      link: '/case-4'
    }
  ];

  return (
    <section className="cases-section" ref={elementRef}>
      <Container className="position-relative">
        <div className={`section-header fade-up-element ${isVisible ? 'is-visible' : ''}`}>
          {/* TODO: [TEXT] 섹션 소제목 수정 */}
          <span className="sub-title">SUB TITLE</span>
          {/* TODO: [TEXT] 섹션 메인 제목 수정 */}
          <h2 className="main-title">MAIN TITLE</h2>
        </div>

        <div className={`fade-up-element ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.nav-btn-prev',
              nextEl: '.nav-btn-next',
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            className="cases-swiper"
          >
            {cases.map((item) => (
              <SwiperSlide key={item.id}>
                <a href={item.link} className="case-card apple-card">
                  <div className="case-img-wrapper">
                    <img src={item.image} alt={item.title} className="case-img" />
                  </div>
                  <h3 className="case-title">{item.title}</h3>
                </a>
              </SwiperSlide>
            ))}

            <div className="custom-nav-wrapper">
              <button className="nav-btn nav-btn-prev">
                <FaChevronLeft />
              </button>
              <button className="nav-btn nav-btn-next">
                <FaChevronRight />
              </button>
            </div>
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default CasesCarousel;
