import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ProductCards.css';

gsap.registerPlugin(ScrollTrigger);

const ProductCards = () => {
  const containerRef = useRef(null);
  const titleCardRef = useRef(null);
  const rightColRef = useRef(null);

  // TODO: [DATA] 제품 목록 데이터
  const products = [
    // ... products data ...
    {
      id: 1,
      date: 'HARDWARE',
      title: 'IoT Sensor Node',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
      link: '/product/1',
      heightClass: 'medium'
    },
    {
      id: 2,
      date: 'SYSTEM',
      title: 'Auto Control System',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      link: '/product/2',
      heightClass: 'tall'
    },
    {
      id: 3,
      date: 'SOLUTION',
      title: 'Smart Farm App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      link: '/product/3',
      heightClass: 'short'
    },
    {
      id: 4,
      date: 'FACILITY',
      title: 'Nutrient Supply',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80',
      link: '/product/4',
      heightClass: 'tall'
    },
    {
      id: 5,
      date: 'ENERGY',
      title: 'Growth LED',
      image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=600&q=80',
      link: '/product/5',
      heightClass: 'medium'
    },
    {
      id: 6,
      date: 'AI & DRONE',
      title: 'Drone Monitoring',
      image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=600&q=80',
      link: '/product/6',
      heightClass: 'tall'
    }
  ];

  useGSAP(() => {
    ScrollTrigger.refresh();

    // 1. 배경 확장 애니메이션 (기존 유지)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.fromTo('.product-expand-wrapper', 
      {
        width: '85%',
        maxWidth: '1400px',
        borderRadius: '150px',
      },
      {
        width: '96%',
        maxWidth: '1800px',
        borderRadius: '50px',
        duration: 1.2,
        ease: 'power2.inOut'
      }
    )
    .to('.product-expand-wrapper', { duration: 0.6 })
    .to('.product-expand-wrapper', {
      width: '85%',
      maxWidth: '1400px',
      borderRadius: '150px',
      duration: 1.2,
      ease: 'power2.inOut'
    });

    // 2. Title Card Pinning (우측 리스트 길이에 맞춰 고정 - 동적 계산)
    ScrollTrigger.create({
      trigger: rightColRef.current, 
      start: 'top top+=150', 
      // 우측 리스트 높이 - 좌측 카드 높이만큼 스크롤되는 동안 고정
      end: () => `+=${rightColRef.current.offsetHeight - titleCardRef.current.offsetHeight - 67}`,
      pin: titleCardRef.current, 
      pinSpacing: false, 
      invalidateOnRefresh: true, // 리사이즈 시 재계산
    });

  }, { scope: containerRef });

  return (
    <section className="product-section" ref={containerRef}>
      <div className="product-expand-wrapper">
        <Container>
          <Row className="product-content-row">
            {/* 좌측: Sticky Title Card */}
            <Col lg={3} className="position-relative d-none d-lg-block d-flex flex-column">
              <div className="title-card" ref={titleCardRef}>
                <h2 className="title-card-head">
                  따끈 따끈<br />
                  새로운 아티클
                </h2>
                <p className="title-card-desc">
                  이번주 지구에는 무슨 일이? 새롭게 올라온 지구 환경 주간 이슈를 살펴보세요!
                </p>
                <a href="/product" className="title-card-btn">
                  아티클 더 보러가기
                </a>
              </div>
            </Col>

            {/* 우측: Masonry Grid (9열 비중 - 3 Column Grid) */}
            <Col lg={9} ref={rightColRef}>
              <div className="masonry-grid">
                {products.map((item) => (
                  <a href={item.link} key={item.id} className={`masonry-item ${item.heightClass}`}>
                    <div 
                      className="masonry-bg" 
                      style={{ backgroundImage: `url(${item.image})` }} 
                    />
                    <div className="masonry-overlay">
                      <span className="masonry-date">{item.date}</span>
                      <h3 className="masonry-title">{item.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ProductCards;
