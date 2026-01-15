import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ProductCards.css';

gsap.registerPlugin(ScrollTrigger);

const ProductCards = () => {
  const containerRef = useRef(null);

  // TODO: [DATA] 제품 목록 데이터
  const products = [
    {
      id: 1,
      date: 'HARDWARE',
      title: 'IoT Sensor Node',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
      link: '/product/1',
      heightClass: 'medium' // 첫 번째 열: 적당한 높이
    },
    {
      id: 2,
      date: 'SYSTEM',
      title: 'Auto Control System',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      link: '/product/2',
      heightClass: 'tall' // 두 번째 열: 길게 (펭귄처럼)
    },
    {
      id: 3,
      date: 'SOLUTION',
      title: 'Smart Farm App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      link: '/product/3',
      heightClass: 'short' // 세 번째 열: 짧게 (바나나처럼)
    },
    {
      id: 4,
      date: 'FACILITY',
      title: 'Nutrient Supply',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80',
      link: '/product/4',
      heightClass: 'tall' // 첫 번째 열 아래: 길게 (마스크처럼)
    },
    {
      id: 5,
      date: 'ENERGY',
      title: 'Growth LED',
      image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=600&q=80',
      link: '/product/5',
      heightClass: 'medium' // 두 번째 열 아래: 사자처럼
    },
    {
      id: 6,
      date: 'AI & DRONE',
      title: 'Drone Monitoring',
      image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=600&q=80',
      link: '/product/6',
      heightClass: 'tall' // 세 번째 열 아래: 해변처럼
    }
  ];

  useGSAP(() => {
    ScrollTrigger.refresh();

    // 단일 타임라인으로 확장과 축소를 한 번에 관리
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom', // 아래에서 보이기 시작할 때
        end: 'bottom top',   // 위로 완전히 사라질 때
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
        width: '100%',
        maxWidth: '100%',
        borderRadius: '0px',
        duration: 0.5,
        ease: 'power1.inOut'
      }
    )
    .to('.product-expand-wrapper', {
      duration: 1, // 중앙에서는 확장 상태 유지
    })
    .to('.product-expand-wrapper', {
      width: '85%',
      maxWidth: '1400px',
      borderRadius: '150px',
      duration: 0.5,
      ease: 'power1.inOut'
    });

  }, { scope: containerRef });

  return (
    <section className="product-section" ref={containerRef}>
      <div className="product-expand-wrapper">
        <Container>
          <Row className="product-content-row">
            {/* 좌측: Sticky Title Card (3열 비중) */}
            <Col lg={3} className="position-relative d-none d-lg-block">
              <div className="sticky-wrapper">
                <div className="title-card">
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
              </div>
            </Col>

            {/* 우측: Masonry Grid (9열 비중 - 3 Column Grid) */}
            <Col lg={9}>
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
