import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ProductCards.css';

gsap.registerPlugin(ScrollTrigger);

const ProductCards = () => {
  const containerRef = useRef(null);

  // 홈 화면용 추천 제품 데이터 (실제 상세 페이지 ID와 매핑)
  const products = [
    {
      id: 2, // IoT 토양 센서
      date: 'HARDWARE',
      title: 'IoT Sensor Node : 초정밀 온실 환경 감지 센서',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
      link: '/product/2',
      heightClass: 'tall'
    },
    {
      id: 18, // 스마트팜 생육 관리
      date: 'SYSTEM',
      title: 'Auto Control System : 복합 환경 자동 제어기',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      link: '/product/18',
      heightClass: 'short'
    },
    {
      id: 11, // 병해충 예찰 앱
      date: 'SOLUTION',
      title: 'Smart Farm App : 언제 어디서나 농장 통합 관제',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      link: '/product/11',
      heightClass: 'short'
    },
    {
      id: 4, // 산업용 AI 카메라 (시설 대신 사용)
      date: 'FACILITY',
      title: 'Nutrient Supply : 작물별 맞춤 양액 공급 시스템',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80',
      link: '/product/4',
      heightClass: 'tall'
    },
    {
      id: 5, // 승강기 진단 센서 (에너지 대신 사용)
      date: 'ENERGY',
      title: 'Growth LED : 에너지 저감형 식물 생장 조명',
      image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=600&q=80',
      link: '/product/5',
      heightClass: 'tall'
    },
    {
      id: 6, // 대기 환경 관측 스테이션
      date: 'AI & DRONE',
      title: 'Drone Monitoring : AI 기반 드론 예찰 시스템',
      image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=600&q=80',
      link: '/product/6',
      heightClass: 'short'
    }
  ];

  useGSAP(() => {
    // 0. 레이아웃 재계산
    ScrollTrigger.refresh();

    // 1. 컨테이너 확장 애니메이션 (박스 -> 전면 -> 박스)
    // 진입할 때 커지고, 영역을 벗어날 때 다시 작아지는 효과
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%',
        end: 'bottom 5%',
        scrub: 2,           // 관성 증가 (더 부드럽고 느리게 반응)
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
        duration: 0.35,     // 확장 구간 비중 확대 (0.2 -> 0.35)
        ease: 'power1.inOut',
      }
    )
    .to('.product-expand-wrapper', {
      duration: 0.3,        // 유지 구간 비중 조정
    })
    .to('.product-expand-wrapper', {
      width: '85%',
      maxWidth: '1400px',
      borderRadius: '150px',
      duration: 0.35,     // 축소 구간 비중 확대 (0.2 -> 0.35)
      ease: 'power1.inOut',
    });

    const stickyWrapper = containerRef.current.querySelector('.sticky-wrapper');
    const masonryGrid = containerRef.current.querySelector('.masonry-grid');

    if (stickyWrapper && masonryGrid) {
      // 2. Sticky Pinning 효과 (검은색 카드)
      // 오른쪽 카드의 위아래 영역만큼만 움직이게 설정
      ScrollTrigger.create({
        trigger: masonryGrid,
        start: 'top 120px', // 헤더 높이 등을 고려한 상단 여백
        end: 'bottom 570px',
        pin: stickyWrapper,
        pinSpacing: false,
        pinType: 'transform',
        invalidateOnRefresh: true,
      });
    }
  }, { scope: containerRef });

  return (
    <section className="product-section" ref={containerRef}>
      <div className="product-expand-wrapper">
        <Container>
          <Row className="product-content-row">
            {/* 좌측: Sticky Title Card */}
            <Col lg={4} className="position-relative">
              <div className="sticky-wrapper">
                <div className="title-card">
                  <h2 className="title-card-head">
                    혁신적인<br />
                    스마트팜 솔루션
                  </h2>
                  <p className="title-card-desc">
                    BOAS-SE는 최첨단 IoT 기술과 데이터 분석을 통해
                    농업의 생산성을 극대화하고 탄소 배출을 줄이는
                    지속 가능한 솔루션을 제공합니다.
                  </p>
                  <Link to="/product" className="title-card-btn">
                    전체 솔루션 보기
                  </Link>
                </div>
              </div>
            </Col>

            {/* 우측: Masonry Grid */}
            <Col lg={8}>
              <div className="masonry-grid">
                {products.map((item) => (
                  <Link to={item.link} key={item.id} className={`masonry-item ${item.heightClass}`}>
                    <div 
                      className="masonry-bg" 
                      style={{ backgroundImage: `url(${item.image})` }} 
                    />
                    <div className="masonry-overlay">
                      <span className="masonry-date">{item.date}</span>
                      <h3 className="masonry-title">{item.title}</h3>
                    </div>
                  </Link>
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