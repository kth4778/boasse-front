import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaBrain, FaIndustry, FaCarSide, FaLeaf, FaArrowRight } from 'react-icons/fa';
import { BsBuildingGear } from 'react-icons/bs';
import KakaoMap from './Location/KakaoMap';
import './About.css';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const aboutTopWrapperRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // ---------------------------------------------------------
    // 1. Top Section: Forest Background Animation (유지)
    // ---------------------------------------------------------
    
    // Forest Layers Parallax
    gsap.to('.forest-layer-1', {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: aboutTopWrapperRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    gsap.to('.forest-layer-2', {
      y: -15,
      ease: "none",
      scrollTrigger: {
        trigger: aboutTopWrapperRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    // Leaf Particles Animation
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

    // Mission Section Animation 제거됨

  }, { scope: containerRef });


  return (
    <div className="about-page" ref={containerRef}>
      {/* Wrapper for Intro & Values with Forest Background */}
      <div ref={aboutTopWrapperRef} className="about-top-wrapper">
        <div className="forest-bg">
          <div className="forest-layer forest-layer-1"></div>
          <div className="forest-layer forest-layer-2"></div>
          <div className="forest-light-rays"></div>
          {/* Leaf Particles */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`leaf-particle leaf-${i + 1}`}></div>
          ))}
        </div>

        {/* 1. Intro Section */}
        <section className="about-section intro-section">
          <div className="section-content">
            <h1>Belong to BOAS-SE</h1>
            <p>BOAS-SE 는 고객의 의견을 지속적으로 반영 및 개선하여 정확한 시스템을 개발해 높은 만족도를 제공합니다.<br />
            프로젝트를 성공으로 이끌 BOAS-SE만의 3가지 가치와 <br />
            팀 협업과 단계적 계획으로 오류를 최소화하고, 빠르고 안정적으로 프로젝트를 완수해 나가겠습니다.</p>
          </div>
        </section>

        {/* 2. Values Section */}
        <section className="about-section values-section">
          <div className="section-content">
            <div className="values-container">
              <div className="value-item">
                <div className="circle">Respect</div>
              </div>
              <div className="connector"></div>
              <div className="value-item">
                <div className="circle">Balance</div>
              </div>
              <div className="connector"></div>
              <div className="value-item">
                <div className="circle">Synergy</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ======================================================= */}
      {/* 3. Mission Section (Static Design) */}
      {/* ======================================================= */}
      <section className="about-section mission-section-static">
        <div className="section-content">
          <div className="mission-grid">
            <div className="mission-title-col">
              <h2>Mission</h2>
            </div>
            <div className="mission-desc-col">
              <p className="mission-main-text">
                하드웨어 제조 기술과 <span className="text-highlight">ICT 기술을 융합</span>해<br />
                수시로 변하는 다양한 산업의 요구를 해결하며,<br />
                <span className="text-highlight">효율성을 높이는 지능형 기업</span>입니다.
              </p>
              <p className="mission-sub-text">
                우리는 끊임없는 기술 혁신을 통해 고객의 비즈니스 가치를 극대화하고,
                지속 가능한 미래를 함께 만들어갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Section */}
      <section className="about-section portfolio-section">
        <div className="section-content">
          <div className="portfolio-container">
            <h2 className="portfolio-title">BOAS-SE 만의<br />포트폴리오</h2>
            <ul className="portfolio-list">
              <li>
                <div className="portfolio-icon-wrapper">
                  <FaBrain />
                </div>
                <div className="portfolio-item-content">
                  <h3>AI 기반 예측 및 최적화 솔루션</h3>
                  <p>다양한 산업 현장의 빅데이터를 분석하여 핵심 인사이트를 도출하고, <strong>AI 기반 예측 및 최적화 모델</strong>을 통해 <br /><strong>비즈니스 효율성을 극대화</strong>합니다.
                  제조 공정의 납기 예측 및 스케줄 최적화, 차량 운행 데이터 기반의 위험 운전 패턴 분석, 제로에너지빌딩(ZEB)의 에너지 소비량 예측, 농작물 병해충 발생 시기 예측 등 각 분야에 특화된<br />
                   AI 기술로 높은 정확도와 신뢰성을 갖춘 솔루션을 제공합니다.</p>
                </div>
              </li>
              <li>
                <div className="portfolio-icon-wrapper">
                  <FaIndustry />
                </div>
                <div className="portfolio-item-content">
                  <h3>스마트 팩토리 & 디지털 트윈</h3>
                  <p>제조 공정의 디지털 전환(DX)을 위한 통합 솔루션을 제공합니다.<br />
                  생산 설비에 IoT 센서와 MES를 연동하여 설비 가동률, 생산 수량, 품질 상태 등의 데이터를 실시간으로 <br />
                  수집하고, 이를 <strong>3D 디지털 트윈 환경에서 시각화</strong>하여 <strong>생산 공정 전체를 원격으로 모니터링하고 제어</strong>할 수 있습니다. 강화학습, 유전 알고리즘 등 AI 기술을 활용하여 복잡한 생산 환경에서도 최적의 작업 순서를 도출하고 연쇄 지연을 최소화합니다.</p>
                </div>
              </li>
              <li>
                <div className="portfolio-icon-wrapper">
                  <FaCarSide />
                </div>
                <div className="portfolio-item-content">
                  <h3>스마트 모빌리티 & 관제 플랫폼</h3>
                  <p>차량 운행 데이터(DTG)를 실시간으로 수집하고 분석하여 차량 관제, 교통 안전, 친환경 물류를 지원하는 <strong>AI 기반 모빌리티 플랫폼</strong>을 개발합니다. 스마트폰과 연동되는
                  '스마트 DTG'를 통해 운행 데이터(위치, 속도, 연료 소모 등)를 수집하고, <strong>위험 운전 패턴 분석 및 사고 위험도 예측</strong>, 주행 데이터 기반의 정밀 탄소 배출량 산정 등
                  지능형 관제 서비스를 제공합니다.</p>
                </div>
              </li>
              <li>
                <div className="portfolio-icon-wrapper">
                  <BsBuildingGear />
                </div>
                <div className="portfolio-item-content">
                  <h3>스마트 빌딩 & 시설 안전 진단</h3>
                  <p>건물 및 주요 시설물의 <strong>에너지 효율성과 안전성을 극대화</strong>하는 지능형 관리 시스템을 구축합니다. <br />
                  제로에너지빌딩(ZEB)의 에너지 생산·소비·자립률을 실시간으로 모니터링하는 '에너지 관리 시스템'부터,<br />
                  3D 영상 및 뎁스 카메라 분석 기술을 통해 승강기 플랫벨트의 이상(흔들림, 파손)을 정밀하게 진단하고 원격으로<br />
                  감시하는 '<strong>시설 안전 진단 솔루션</strong>'까지 제공합니다.</p>
                </div>
              </li>
              <li>
                <div className="portfolio-icon-wrapper">
                  <FaLeaf />
                </div>
                <div className="portfolio-item-content">
                  <h3>스마트 팜 & 농업 빅데이터 플랫폼</h3>
                  <p> IoT 센서와 빅데이터, AI 기술을 융합하여 <strong>지속 가능한 정밀 농업</strong>을 위한 스마트 팜 솔루션을 제공합니다. <br />
                  토양과 대기 환경 데이터를 실시간으로 수집하는 자체 개발 센서와 외부 공공 데이터를 통합하여, <strong>과수 병해충의 발생을 예측</strong>하고 최적의 방제 시기와 방법을 안내하는 빅데이터 플랫폼을 구축·운영합니다. <br />
                  이를 통해 노동력 및  운영 비용을 절감하고 생산성 증대에 기여합니다.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. History Section */}
      <section className="about-section history-section">
        <div className="section-content history-flex-container">
          <div className="history-title-column">
            <h2>BOAS-SE가 걸어온 길</h2>
          </div>
          <div className="history-timeline-column">
            <div className="history-timeline">
              <div className="timeline-item">
                <div className="timeline-year">2025</div>
                <div className="timeline-content">
                  <p>스마프 팩토리,스마트팜,스마트빌딩 등<br />차세대 산업 AI 솔루션 고도화</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2022</div>
                <div className="timeline-content">
                  <p>제로에너지빌딩(ZEB) 모니터링<br />및 스마트 모빌리티(DTG) 사업 본격화</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2020</div>
                <div className="timeline-content">
                  <p>AI/빅데이터 기반 산업별 DX(디지털전환) 솔루션 사업 확장</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2017</div>
                <div className="timeline-content">
                  <p>건축물 에너지 분석 및 LS산전<br />전력 진단 시스템 공급 등 사업 다각화</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2013</div>
                <div className="timeline-content">
                  <p>IoT 기반 스마트 팜 HW/SW 시스템 구축<br />및 솔루션 사업 개시</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2010</div>
                <div className="timeline-content">
                  <p>BOAS-SE 법인 설립</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Location Section */}
      <section className="about-section location-section">
        <div className="section-content">
          <h2>오시는 길</h2>
          <KakaoMap />
        </div>
      </section>

      {/* 7. CTA Section (New) */}
      <section className="about-section cta-section">
        <div className="section-content">
          <div className="cta-container">
            <h2 className="cta-title">새로운 혁신을 시작할 준비가 되셨나요?</h2>
            <p className="cta-desc">BOAS-SE의 전문가들이 귀사의 비즈니스에 최적화된 솔루션을 제안해 드립니다.</p>
            <button className="cta-button" onClick={() => navigate('/contact')}>
              프로젝트 문의하기 <FaArrowRight className="cta-icon" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;