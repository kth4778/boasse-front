import React, { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import './InfoSection.css';

const InfoSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndex = useRef(0);
  const isAnimating = useRef(false); // 애니메이션 진행 상태 추적

  const solutions = [
    {
      id: 1,
      category: 'Smart Sensing',
      title: '스마트 센싱 시스템',
      desc: '농장 내부의 온도, 습도, CO2, 광량 등 작물 생장에 필수적인 환경 데이터를 초정밀 센서로 실시간 수집합니다. 수집된 데이터는 클라우드 서버로 전송되어 정밀한 분석의 기초가 됩니다.',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&w=1200&q=80',
      link: '/business'
    },
    {
      id: 2,
      category: 'Auto Control',
      title: '원격 제어 시스템',
      desc: '언제 어디서나 스마트폰과 PC를 통해 농장 설비를 원격으로 제어할 수 있습니다. 천창 개폐, 관수, 냉난방 등을 자동화하여 노동력을 절감하고 최적의 생육 환경을 유지합니다.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=1200&q=80',
      link: '/business'
    },
    {
      id: 3,
      category: 'Data Analysis',
      title: '생육 데이터 분석',
      desc: '축적된 빅데이터를 AI가 분석하여 작물별 최적의 생육 레시피를 제공합니다. 생산량 예측, 병해충 예방 등 데이터 기반의 의사결정을 지원하여 농가 소득 증대에 기여합니다.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=1200&q=80',
      link: '/business'
    },
    {
      id: 4,
      category: 'Green Energy',
      title: '친환경 에너지 솔루션',
      desc: '지열, 태양광 등 신재생 에너지를 활용한 저탄소 에너지 솔루션을 제공합니다. 에너지 비용을 절감하고 탄소 중립을 실현하여 지속 가능한 미래 농업을 만들어갑니다.',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&w=1200&q=80',
      link: '/business'
    }
  ];

  useGSAP(() => {
    // 배경 파티클 애니메이션 (계속 움직임)
    gsap.to('.leaf-particle', {
      y: 'random(-50, 50)',
      x: 'random(-30, 30)',
      rotation: 'random(-180, 180)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });
  }, { scope: sectionRef });

  // 스와이프/드래그 상태 관리
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (activeIndex < solutions.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Loop back to start
    }
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(solutions.length - 1); // Loop to end
    }
  };

  // 스와이프 처리 함수
  const handleSwipe = () => {
    const threshold = 50; 
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => { touchEndX.current = e.changedTouches[0].clientX; handleSwipe(); };
  const onMouseDown = (e) => { e.preventDefault(); touchStartX.current = e.clientX; };
  const onMouseUp = (e) => { touchEndX.current = e.clientX; handleSwipe(); };

  useEffect(() => {
    // 탭 전환 애니메이션
    const texts = gsap.utils.toArray('.info-text-group');
    const cards = gsap.utils.toArray('.image-card');
    
    // 이전 애니메이션 강제 종료 (겹침 방지)
    gsap.killTweensOf(texts);
    gsap.killTweensOf(cards);

    const prevIdx = previousIndex.current;
    const currentIdx = activeIndex;

    // 1. 텍스트 전환
    if (prevIdx !== currentIdx) {
      // 숨겨져야 할 텍스트들 즉시 숨김 처리 (안전장치)
      texts.forEach((text, i) => {
        if (i !== currentIdx && i !== prevIdx) {
          gsap.set(text, { autoAlpha: 0, x: -20 });
        }
      });

      gsap.to(texts[prevIdx], {
        autoAlpha: 0,
        x: -20,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
    
    gsap.fromTo(texts[currentIdx],
      { autoAlpha: 0, x: 20 },
      { 
        autoAlpha: 1, 
        x: 0, 
        duration: 0.5, 
        delay: 0.2, 
        ease: 'power2.out',
        onComplete: () => {
           // 텍스트 애니메이션이 끝나는 시점을 전체 애니메이션 종료로 간주 (가장 늦게 끝남)
           // 혹은 이미지 애니메이션 시간과 맞춰서 넉넉하게 잡음
        }
      }
    );

    // 2. 이미지 전환 (3D 원형 회전 Carousel)
    const radius = 350; 
    const theta = 50;   
    
    // 가장 긴 애니메이션 시간을 추적하여 잠금 해제
    let maxDuration = 0.8; 

    cards.forEach((card, i) => {
      const offset = i - currentIdx;
      const angle = offset * theta;
      const distFactor = Math.abs(offset);
      
      const scale = i === currentIdx ? 1 : 0.8; 
      const opacity = i === currentIdx ? 1 : 0; 
      const zIndex = i === currentIdx ? 100 : 0;

      gsap.to(card, {
        rotateY: angle,
        translateZ: radius - (distFactor * 50), 
        x: offset < 0 ? offset * 10 : offset * 30, 
        scale: scale,
        autoAlpha: opacity, 
        zIndex: zIndex,
        duration: 0.8,
        ease: 'power3.out',
        transformOrigin: "50% 50% -400px",
        onComplete: () => {
          if (i === currentIdx) {
            // 메인 카드의 애니메이션이 끝났을 때 잠금 해제
            isAnimating.current = false;
          }
        }
      });

      if (i === currentIdx) {
        gsap.to(card, { filter: 'brightness(1) blur(0px)', duration: 0.8 });
      } else {
        gsap.to(card, { filter: 'brightness(0.5) blur(1px)', duration: 0.8 });
      }
    });

    previousIndex.current = activeIndex;
  }, [activeIndex]);

  const handleTabClick = (index) => {
    if (isAnimating.current || index === activeIndex) return;
    isAnimating.current = true;
    setActiveIndex(index);
  };

  return (
    <section className="info-section" ref={sectionRef}>
      <div className="forest-bg">
        <div className="forest-layer forest-layer-1"></div>
        <div className="forest-layer forest-layer-2"></div>
        <div className="forest-light-rays"></div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`leaf-particle leaf-${i + 1}`}></div>
        ))}
      </div>

      <div className="info-container">
        
        <div className="info-header">
          <h4 className="info-top-label">Business Divisions</h4>
          <h2 className="info-main-title">BOAS-SE<br />핵심 솔루션</h2>
        </div>

        <div className="info-nav-list">
          {solutions.map((sol, idx) => (
            <div 
              key={sol.id} 
              className={`info-nav-item ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => handleTabClick(idx)}
              role="button"
              tabIndex={0}
            >
              {sol.category}
            </div>
          ))}
        </div>

        <div 
          className="info-content-wrapper"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          style={{ userSelect: 'none' }} 
        >
          <div className="info-text-area">
            {solutions.map((sol, idx) => (
              <div 
                key={sol.id} 
                className="info-text-group"
                style={{ visibility: idx === 0 ? 'visible' : 'hidden', opacity: idx === 0 ? 1 : 0 }}
              >
                <h3 
                  className="solution-title"
                  onClick={() => handleTabClick(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {sol.title}
                </h3>
                <p className="solution-desc">{sol.desc}</p>
                <a href={sol.link} className="solution-link">
                  자세히 보기 <FaArrowRight className="ms-2" />
                </a>
              </div>
            ))}
          </div>

          <div className="info-image-area">
            {solutions.map((sol, idx) => (
              <div 
                key={sol.id} 
                className="image-card"
                style={{ cursor: 'grab' }} 
              >
                <img src={sol.image} alt={sol.title} className="card-img" />
              </div>
            ))}
            
            {/* 네비게이션 화살표 추가 */}
            <div className="info-controls">
              <button className="nav-arrow prev-arrow" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                <FaArrowLeft />
              </button>
              <button className="nav-arrow next-arrow" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InfoSection;
