import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  FaBrain, FaIndustry, FaCarSide, FaLeaf, FaArrowRight, 
  FaHandshake, FaBalanceScale, FaUsers, 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaw
} from 'react-icons/fa';
import { BsBuildingGear } from 'react-icons/bs';
import KakaoMap from './Location/KakaoMap';
import './About.css';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HISTORY_DATA = [
  { year: "2025", content: ["지에스티산업 AI 기반 생산공정 스케줄 최적화 및 납기예측을 위한 DX 서비스 개발", "LS Electric 설비진단 고도화를 위한 센서 4종 및 엔지니어링 연계 개발"] },
  { year: "2024", content: ["과수 병해충 예측 및 방제 빅데이터 통합 플랫폼 구축", "LS Electric 진단 솔루션 고도화 및 서버 이중화 시스템 개발"] },
  { year: "2023", content: ["국유양묘장 데이터 표준화 및 관리 시스템 구축", "(주)LG이노텍, SK실트론 전력 진단 시스템 납품"] },
  { year: "2022", content: ["감귤 농장 생육환경 모니터링 시스템 개발", "(주)LG화학 전력 진단시스템 납품"] },
  { year: "2021", content: ["제주 감귤 농장 당도예측 시스템 구축", "농산물 유통 모니터링 시스템 개발"] },
  { year: "2020", content: ["농업 실용화재단 모니터링 시스템 납품", "서울풍물시장 LoRa 460ea 설치", "서울디지털재단 LoRa 100ea 설치 운용"] },
  { year: "2019", content: ["농업 실용화 재단 생육 모니터링 시스템 납품", "청담동 버버리본사 모니터링 시스템 납품 (LoRa센서 300ea 설치 운용)"] },
  { year: "2018", content: ["LS Electric 송/배전 전력진단시스템 공급", "건축물 에너지 분석/모니터링 솔루션 납품"] },
  { year: "2017", content: ["농장 환경 생육정보 모니터링 솔루션 납품 (6개 농장 센서 500ea 설치 운용)"] },
  { year: "2016", content: ["성주참외 환경/유통 모니터링 시스템 납품 (성주농협 센서 20ea 설치 운용)"] },
  { year: "2015", content: ["충주사과 환경/유통 모니터링 시스템 납품 (충주사과농협 센서 20ea 설치 운용)"] },
  { year: "2014", content: ["제주 딸기/키위 모니터링 시스템 납품 (5개 농장 센서 30ea 설치 운용)"] },
  { year: "2013", content: ["사과 과수원 환경모니터링, 수확/유통 관리 시스템 개발", "환경/과수센서 300ea 설치 운용"] },
  { year: "2011", content: ["벤처기업 인증", "무선센싱기술 2.6억 보증"] },
  { year: "2010", content: ["회사설립"] }
];

const About = () => {
  const containerRef = useRef(null);
  const aboutTopWrapperRef = useRef(null);
  const missionSectionRef = useRef(null);
  const historyRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // 1. Intro Animation
    gsap.set('.intro-section h1', { y: 50, opacity: 0 });
    gsap.to('.intro-section h1', { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 });
    gsap.set('.intro-desc', { y: 30, opacity: 0 });
    gsap.to('.intro-desc', { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 });

    // 2. Values & Mission
    gsap.set('.value-item', { scale: 0.8, opacity: 0 });
    gsap.to('.value-item', { scale: 1, opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.values-section', start: "top 80%" } });

    if (missionSectionRef.current) {
      gsap.set('.mission-main-text', { y: 50, opacity: 0 });
      gsap.to('.mission-main-text', {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: missionSectionRef.current, start: "top 70%" }
      });
    }

    // 3. Portfolio Animation
    gsap.utils.toArray('.portfolio-list li').forEach((li, i) => {
      gsap.set(li, { y: 50, opacity: 0 });
      gsap.to(li, {
        y: 0, opacity: 1, duration: 0.8, delay: i * 0.1,
        scrollTrigger: { trigger: li, start: "top 90%" }
      });
    });

    // 4. History Timeline Line Animation
    const timer = setTimeout(() => {
      const iconCells = gsap.utils.toArray('.t-icon-cell'); // 아이콘 셀 기준
      if (iconCells.length > 0) {
        const first = iconCells[0];
        const last = iconCells[iconCells.length - 1];
        
        // 아이콘 셀의 상단 오프셋 + 내부 패딩(5px) + 아이콘 절반 높이(7px)
        const topOffset = 12; 
        const totalHeight = (last.offsetTop + topOffset) - (first.offsetTop + topOffset);
        
        gsap.set('.history-track-fill', { top: first.offsetTop + topOffset });
        
        gsap.to('.history-track-fill', {
          height: totalHeight,
          ease: 'none',
          scrollTrigger: {
            trigger: '.history-timeline',
            start: "top center", 
            end: "bottom center",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });
      }
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);

  }, { scope: containerRef });


  return (
    <div className="about-page" ref={containerRef}>
      
      {/* 1. Hero & Values */}
      <div ref={aboutTopWrapperRef} className="about-top-wrapper">
        <div className="forest-bg">
          <div className="forest-layer forest-layer-1"></div>
          <div className="forest-layer forest-layer-2"></div>
          <div className="forest-light-rays"></div>
          {[...Array(10)].map((_, i) => <div key={i} className={`leaf-particle leaf-${i + 1}`} style={{top: `${10+i*8}%`, left: `${(i%3)*30+5}%`}}></div>)}
        </div>

        <section className="about-section intro-section">
          <div className="section-content">
            <div className="intro-title-wrapper">
              <h1>Belong to <br /><span className="highlight">BOAS-SE</span></h1>
            </div>
            <p className="intro-desc">
              BOAS-SE는 끊임없는 혁신과 기술 융합을 통해<br />
              고객의 비즈니스 가치를 극대화하고, 지속 가능한 미래를 설계하는<br />
              <strong>스마트 기술 파트너</strong>입니다.
            </p>
          </div>
        </section>

        <section className="about-section values-section">
          <div className="section-content">
            <div className="values-container">
              <div className="value-item"><div className="value-content"><FaHandshake className="value-icon"/><div className="value-text">Respect</div><div className="value-sub">상호 존중과 신뢰</div></div></div>
              <div className="value-item"><div className="value-content"><FaBalanceScale className="value-icon"/><div className="value-text">Balance</div><div className="value-sub">일과 삶의 조화</div></div></div>
              <div className="value-item"><div className="value-content"><FaUsers className="value-icon"/><div className="value-text">Synergy</div><div className="value-sub">협력의 가치 창출</div></div></div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Mission */}
      <section className="about-section mission-section-static" ref={missionSectionRef}>
        {/* Mission 전용 장식: 은은한 반딧불이 */}
        <div className="section-deco-container">
          {[...Array(5)].map((_, i) => <div key={i} className={`local-firefly lf-${i}`}></div>)}
        </div>

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
                우리는 단순히 소프트웨어를 개발하는 것을 넘어, 하드웨어와 소프트웨어의 완벽한 결합을 통해 실질적인 문제를 해결합니다. 
                스마트 팩토리부터 디지털 트윈, 모빌리티 관제까지, BOAS-SE의 기술은 산업 현장 곳곳에서 새로운 가치를 창출하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Portfolio */}
      <section className="about-section portfolio-section">
        {/* Portfolio 전용 장식: 살랑거리는 나뭇잎 */}
        <div className="section-deco-container">
          <div className="local-leaf leaf-1">🌿</div>
          <div className="local-leaf leaf-2">🍃</div>
          <div className="local-leaf leaf-3">🌱</div>
        </div>

        <div className="section-content">
          <div className="portfolio-container">
            <h2 className="portfolio-title">BOAS-SE 만의<br />포트폴리오</h2>
            <ul className="portfolio-list">
              <li>
                <div className="portfolio-card">
                  <div className="portfolio-icon-wrapper"><FaBrain /></div>
                  <div className="portfolio-item-content"><h3>AI 기반 예측 및 최적화</h3><p>빅데이터 분석과 머신러닝을 통해<br/>비즈니스 효율성을 극대화합니다.</p></div>
                </div>
              </li>
              <li>
                <div className="portfolio-card">
                  <div className="portfolio-icon-wrapper"><FaIndustry /></div>
                  <div className="portfolio-item-content"><h3>스마트 팩토리 & DT</h3><p>IoT 센서와 MES를 연동하여<br/>생산 현장을 실시간 시각화합니다.</p></div>
                </div>
              </li>
              <li>
                <div className="portfolio-card">
                  <div className="portfolio-icon-wrapper"><FaCarSide /></div>
                  <div className="portfolio-item-content"><h3>스마트 모빌리티 관제</h3><p>차량 운행 데이터를 정밀 분석하여<br/>교통 안전 솔루션을 제시합니다.</p></div>
                </div>
              </li>
              <li>
                <div className="portfolio-card">
                  <div className="portfolio-icon-wrapper"><BsBuildingGear /></div>
                  <div className="portfolio-item-content"><h3>스마트 빌딩 & 안전 진단</h3><p>3D 비전 기술로 시설물의 이상 징후를<br/>조기에 감지하고 예방합니다.</p></div>
                </div>
              </li>
              <li>
                <div className="portfolio-card">
                  <div className="portfolio-icon-wrapper"><FaLeaf /></div>
                  <div className="portfolio-item-content"><h3>스마트 팜 & 농업 데이터</h3><p>데이터 기반의 정밀 농업을 실현하여<br/>농가의 생산성을 획기적으로 높입니다.</p></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. History Section (New Grid) */}
      <section className="about-section history-section" ref={historyRef}>
        <div className="history-bg-pattern"></div>

        <div className="section-content history-flex-container">
          <div className="history-title-column">
            <h2>BOAS-SE가<br />걸어온 길</h2>
          </div>
          <div className="history-timeline-column">
            <div className="history-timeline">
              {/* 중앙 선 */}
              <div className="history-track-bg">
                <div className="history-track-fill"></div>
              </div>

              {HISTORY_DATA.map((item, index) => (
                <div key={index} className={`timeline-row ${index % 2 === 0 ? 'row-right-content' : 'row-left-content'}`}>
                  {/* 연도 (Year) */}
                  <div className="t-year-col">
                    <span className="t-year">{item.year}</span>
                  </div>

                  {/* 중앙 아이콘 (Icon) */}
                  <div className="t-icon-cell">
                    <div className="t-icon"></div>
                  </div>

                  {/* 내용 (Content) */}
                  <div className="t-content-col">
                    {item.content.map((text, i) => <p key={i}>{text}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Location & CTA */}
      <section className="about-section location-section">
        <div className="section-content">
          <div className="location-wrapper">
            <KakaoMap />
            <div className="location-info-card">
              <h3>오시는 길</h3>
              <div className="location-detail"><FaMapMarkerAlt className="text-primary-custom" /><span>충북 청주시 흥덕구 오송읍 오송생명로 194, 2층</span></div>
              <div className="location-detail"><FaPhoneAlt className="text-primary-custom" /><span>043-123-4567</span></div>
              <div className="location-detail"><FaEnvelope className="text-primary-custom" /><span>contact@boasse.com</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section cta-section">
        <div className="section-content">
          <div className="cta-container">
            <h2 className="cta-title">새로운 혁신을 시작할 준비가 되셨나요?</h2>
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