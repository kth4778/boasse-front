import React, { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import './InfoSection.css';

/*
 * [핵심 솔루션 소개 섹션]
 * 회사의 4대 핵심 비즈니스(스마트 팜, 팩토리, 모빌리티, 빌딩)를 소개하는 탭/캐러셀 형태의 섹션입니다.
 * 3D 카드 회전 애니메이션과 텍스트 전환 효과를 사용하여 인터랙티브하게 정보를 전달합니다.
 */
const InfoSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndex = useRef(0);
  const isAnimating = useRef(false); // 애니메이션 중복 실행 방지를 위한 플래그

  /*
   * [솔루션 데이터]
   * 각 비즈니스 영역의 카테고리, 제목, 설명, 이미지 경로, 링크 정보를 정의합니다.
   */
  const solutions = [
    {
      id: 1,
      category: 'Smart Farm',
      title: '스마트 팜 솔루션',
      desc: '빅데이터와 AI 기반의 정밀 제어 시스템으로 최적의 생육 환경을 제공합니다. 생산성을 극대화하고 노동력을 절감하는 미래형 농업 기술입니다.',
      image: '/images/smartFarm.jpg',
      link: '/business'
    },
    {
      id: 2,
      category: 'Smart Factory',
      title: '스마트 팩토리',
      desc: '제조 현장의 데이터를 실시간으로 수집하고 분석하여 공정을 최적화합니다. 예지 보전과 품질 관리 자동화로 생산 효율을 혁신합니다.',
      image: '/images/smartFactory.jpg',
      link: '/business'
    },
    {
      id: 3,
      category: 'Smart Mobility',
      title: '스마트 모빌리티',
      desc: '자율주행 물류 로봇과 통합 관제 시스템으로 물류의 흐름을 혁신합니다. 안전하고 효율적인 이동을 위한 최첨단 모빌리티 솔루션입니다.',
      image: '/images/smartMobility.jpg',
      link: '/business'
    },
    {
      id: 4,
      category: 'Smart Building',
      title: '스마트 빌딩 에너지',
      desc: '건물의 에너지 사용 패턴을 AI가 학습하여 최적의 제어를 수행합니다. 에너지 비용을 획기적으로 절감하고 쾌적한 공간 환경을 조성합니다.',
      image: '/images/smartBuilding.jpg',
      link: '/business'
    }
  ];

  // 배경 파티클 애니메이션 설정
  useGSAP(() => {
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

  // 스와이프/드래그 동작 감지 변수
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 다음 슬라이드로 이동
  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (activeIndex < solutions.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // 처음으로 루프
    }
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(solutions.length - 1); // 마지막으로 루프
    }
  };

  // 스와이프 제스처 처리
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
    // 탭 및 카드 전환 애니메이션
    const texts = gsap.utils.toArray('.info-text-group');
    const cards = gsap.utils.toArray('.image-card');
    
    // 이전 애니메이션 정리 (충돌 방지)
    gsap.killTweensOf(texts);
    gsap.killTweensOf(cards);

    const prevIdx = previousIndex.current;
    const currentIdx = activeIndex;

    // 1. 텍스트 전환 애니메이션
    if (prevIdx !== currentIdx) {
      // 비활성 텍스트 숨김 처리
      texts.forEach((text, i) => {
        if (i !== currentIdx && i !== prevIdx) {
          gsap.set(text, { autoAlpha: 0, x: -20 });
        }
      });

      // 이전 텍스트 퇴장
      gsap.to(texts[prevIdx], {
        autoAlpha: 0,
        x: -20,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
    
    // 현재 텍스트 등장
    gsap.fromTo(texts[currentIdx],
      { autoAlpha: 0, x: 20 },
      { 
        autoAlpha: 1, 
        x: 0, 
        duration: 0.5, 
        delay: 0.2, 
        ease: 'power2.out'
      }
    );

    // 2. 이미지 3D 회전(Carousel) 애니메이션
    const radius = 350; 
    const theta = 50;   
    
    cards.forEach((card, i) => {
      const offset = i - currentIdx;
      const angle = offset * theta;
      const distFactor = Math.abs(offset);
      
      const scale = i === currentIdx ? 1 : 0.8; 
      const opacity = i === currentIdx ? 1 : 0; 
      const zIndex = i === currentIdx ? 100 : 0;

      // 카드 위치 및 회전 애니메이션
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
            isAnimating.current = false; // 애니메이션 종료 후 잠금 해제
          }
        }
      });

      // 활성 카드 외 흐림 효과 적용
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
            {solutions.map((sol) => (
              <div 
                key={sol.id}  
                className="image-card"
                style={{ cursor: 'grab' }} 
              >
                <img src={sol.image} alt={sol.title} className="card-img" />
              </div>
            ))}
            
            {/* 네비게이션 버튼 (화살표) */}
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