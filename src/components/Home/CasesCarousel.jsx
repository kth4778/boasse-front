import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CasesCarousel.css';

import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const CasesCarousel = () => {
  const containerRef = useRef(null);

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

  // GSAP: 확장 애니메이션 (박스 -> 전면 -> 박스)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        end: 'bottom 5%',
        scrub: 2,
        invalidateOnRefresh: true,
      }
    });

    tl.fromTo('.cases-expand-wrapper', 
      {
        width: '85%',
        maxWidth: '1400px',
        borderRadius: '150px',
      },
      {
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0px',
        duration: 0.35,
        ease: 'power1.inOut',
      }
    )
    .to('.cases-expand-wrapper', {
      duration: 0.3,
    })
    .to('.cases-expand-wrapper', {
      width: '85%',
      maxWidth: '1400px',
      borderRadius: '150px',
      duration: 0.35,
      ease: 'power1.inOut',
    });

    // 기존 등장 애니메이션도 타임라인에 통합하거나 별도 유지 가능 (여기서는 별도 유지)
    gsap.from('.section-header', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cases-expand-wrapper',
        start: 'top 80%',
      }
    });

  }, { scope: containerRef });

  return (
    <section className="cases-section" ref={containerRef}>
      <div className="cases-expand-wrapper">
        <Container className="position-relative">
          <div className="section-header">
            {/* TODO: [TEXT] 섹션 소제목 수정 */}
            <span className="sub-title">SUB TITLE</span>
            {/* TODO: [TEXT] 섹션 메인 제목 수정 */}
            <h2 className="main-title">MAIN TITLE</h2>
          </div>

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
        </Container>
      </div>
    </section>
  );
};

export default CasesCarousel;
