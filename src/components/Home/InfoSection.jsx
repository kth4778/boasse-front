import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import './InfoSection.css';

gsap.registerPlugin(ScrollTrigger);

const InfoSection = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&w=1200&q=80',
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
    const totalSlides = solutions.length;
    const cards = gsap.utils.toArray('.image-card');
    const texts = gsap.utils.toArray('.info-text-group');

    // 1. 초기 상태 설정
    // 모든 텍스트 숨김 (첫 번째만 보이게 처리할 예정이나, 타임라인에서 처리)
    gsap.set(texts, { autoAlpha: 0, x: -50 });
    // 첫 번째 텍스트 보이기
    gsap.set(texts[0], { autoAlpha: 1, x: 0 });

    // 카드 초기 위치 설정
    // 카드 0: 중앙, 카드 1: 우측 뒤, 카드 2,3...: 더 뒤로 숨김
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, { xPercent: 0, scale: 1, zIndex: 10, autoAlpha: 1 });
      } else {
        // 다음 카드들은 우측에 대기 (살짝 보이게)
        gsap.set(card, { xPercent: 60 + (i * 10), scale: 0.8 - (i * 0.05), zIndex: 10 - i, autoAlpha: 1 });
      }
    });

    // 2. ScrollTrigger 및 타임라인 생성
    // 전체 섹션을 고정(Pin)하고, 스크롤 길이를 슬라이드 개수에 비례하게 설정
    const scrollDuration = 3000; // 스크롤 길이
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top', // 섹션 상단이 뷰포트 상단에 닿을 때
        end: `+=${scrollDuration}`, 
        pin: true,
        scrub: 1, // 부드러운 스크러빙
        anticipatePin: 1,
        onUpdate: (self) => {
          // 현재 진행률에 따라 Active Index 계산 (네비게이션 용)
          const progress = self.progress;
          // progress 0~1 사이를 totalSlides 등분
          // 약간의 오차 보정을 위해 Math.min 사용
          const index = Math.min(
            Math.floor(progress * totalSlides),
            totalSlides - 1
          );
          setActiveIndex(index);
        }
      }
    });

    // 3. 슬라이드 전환 애니메이션 시퀀스 생성
    // 0 -> 1 -> 2 -> 3 순서로 전환
    for (let i = 0; i < totalSlides - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];
      
      const currentText = texts[i];
      const nextText = texts[i + 1];

      // 타임라인에 순차적으로 추가
      // Step: 현재 슬라이드 퇴장 & 다음 슬라이드 등장
      const stepTl = gsap.timeline();

      // --- 이미지 전환 ---
      // 현재 카드: 왼쪽으로 이동하며 사라짐 (혹은 뒤로 빠짐)
      stepTl.to(currentCard, {
        xPercent: -120, // 왼쪽으로 완전히 빠짐
        scale: 0.8,
        opacity: 0, 
        duration: 1,
        ease: 'power1.inOut'
      }, 0);

      // 다음 카드: 중앙으로 이동하며 확대
      stepTl.to(nextCard, {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut'
      }, 0);

      // 다다음 카드들(i+2 이상)도 앞으로 조금씩 당겨오기 (3D 효과)
      for(let j = i + 2; j < totalSlides; j++) {
        stepTl.to(cards[j], {
          xPercent: 60 + ((j - (i + 1)) * 10), // 한 단계씩 앞으로
          scale: 0.8 - ((j - (i + 1)) * 0.05),
          duration: 1,
          ease: 'power1.inOut'
        }, 0);
      }

      // --- 텍스트 전환 ---
      // 요청 사항: 
      // 이전 텍스트: 오른쪽 -> 왼쪽으로 지워짐 (x: 0 -> -50, alpha: 1 -> 0)
      stepTl.to(currentText, {
        x: -50,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power1.in'
      }, 0);

      // 다음 텍스트: 왼쪽 -> 오른쪽으로 나타남 (from x: -50, alpha: 0 -> x: 0, alpha: 1)
      stepTl.fromTo(nextText, {
        x: -50,
        autoAlpha: 0
      }, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power1.out'
      }, 0.4); // 텍스트가 겹치지 않게 약간 늦게 시작

      // 메인 타임라인에 추가 (각 단계 사이에 약간의 텀을 줄 수도 있음)
      tl.add(stepTl);
    }

  }, { scope: sectionRef });

  return (
    <section className="info-section" ref={sectionRef}>
      <div className="info-container" ref={wrapperRef}>
        
        {/* 고정 헤더 영역 */}
        <div className="info-header">
          <h4 className="info-top-label">Business Divisions</h4>
          <h2 className="info-main-title">BOAS-SE<br />핵심 솔루션</h2>
        </div>

        {/* 우측 상단 네비게이션 */}
        <div className="info-nav-list">
          {solutions.map((sol, idx) => (
            <div 
              key={sol.id} 
              className={`info-nav-item ${activeIndex === idx ? 'active' : ''}`}
            >
              {sol.category} {activeIndex === idx && '←'}
            </div>
          ))}
        </div>

        {/* 컨텐츠 영역 */}
        <div className="info-content-wrapper">
          {/* 좌측 텍스트 영역 */}
          <div className="info-text-area">
            {solutions.map((sol) => (
              <div key={sol.id} className="info-text-group">
                <h3 className="solution-title">{sol.title}</h3>
                <p className="solution-desc">{sol.desc}</p>
                <a href={sol.link} className="solution-link">
                  자세히 보기 <FaArrowRight className="ms-2" />
                </a>
              </div>
            ))}
          </div>

          {/* 우측 이미지 영역 (3D Carousel) */}
          <div className="info-image-area">
            {solutions.map((sol) => (
              <div key={sol.id} className="image-card">
                <img src={sol.image} alt={sol.title} className="card-img" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InfoSection;
