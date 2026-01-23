import React, { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  FaBrain, FaIndustry, FaCarSide, FaLeaf, FaArrowRight, 
  FaHandshake, FaBalanceScale, FaUsers, 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBuilding, FaShoePrints
} from 'react-icons/fa';
import { BsBuildingGear } from 'react-icons/bs';
import KakaoMap from './Location/KakaoMap';
import './About.css';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* 
 * [데이터] 기업 연혁 정보 목록
 * 연도별(year) 주요 사업 성과, 납품 실적, 기술 개발 및 인증 현황(content)을 
 * 역순으로 배열에 정의하여 History 섹션의 타임라인을 구성하는 데 사용합니다.
 */
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
  const portfolioSectionRef = useRef(null);
  const historyRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // 1. 히어로 영역 패럴랙스 효과
    if (aboutTopWrapperRef.current) {
      gsap.to('.forest-layer-1', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: aboutTopWrapperRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.forest-layer-2', {
        yPercent: 60, ease: 'none',
        scrollTrigger: { trigger: aboutTopWrapperRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.utils.toArray('.leaf-particle').forEach((leaf, i) => {
        gsap.to(leaf, {
          y: (i + 1) * 80, x: (i % 2 === 0 ? 1 : -1) * 40, rotation: 360, opacity: 0,
          scrollTrigger: { trigger: aboutTopWrapperRef.current, start: 'top top', end: 'bottom 20%', scrub: 1.5 }
        });
      });
    }

    // 2. 미션 섹션 패럴랙스 효과
    if (missionSectionRef.current) {
      gsap.to('.mission-bg-layer-1', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: missionSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.to('.mission-bg-layer-2', {
        yPercent: 40, ease: 'none',
        scrollTrigger: { trigger: missionSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }

    // 3. 포트폴리오 섹션 패럴랙스 효과
    if (portfolioSectionRef.current) {
      gsap.to('.portfolio-bg-layer-1', {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: portfolioSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.utils.toArray('.side-leaf').forEach((leaf, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(leaf, 
          { x: isLeft ? -100 : 100, y: 0, rotation: 0, opacity: 0.8 },
          { 
            x: isLeft ? 100 : -100, y: 300, rotation: isLeft ? 45 : -45, opacity: 0, ease: "power1.inOut",
            scrollTrigger: { trigger: portfolioSectionRef.current, start: "top center", end: "bottom center", scrub: 1.5 }
          }
        );
      });
    }

    // 4. 연혁 패럴랙스 및 3D 발자국 효과 (균등 간격 적용)
    if (historyRef.current) {
      gsap.to('.history-bg-layer-1', {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: historyRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.to('.history-bg-layer-2', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: historyRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });

      // 발자국 애니메이션: 타임라인으로 균등 배분
      // 초기 상태 설정
      const footprints = gsap.utils.toArray('.footprint-icon');
      gsap.set(footprints, { opacity: 0, scale: 3, filter: "blur(12px)" });

      const fpTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top 60%", // 섹션 상단이 화면 중간보다 조금 아래에 오면 시작
          end: "bottom 90%", // 섹션이 거의 다 올라갈 때까지
          scrub: 1, // 스크롤 속도에 맞춰 부드럽게 재생
        }
      });

      // 순차적으로 발자국이 찍히도록 설정
      fpTimeline.to(footprints, {
        opacity: 0.6,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.8, // 발자국 간의 간격
        duration: 1,  // 각 발자국이 찍히는 시간
        ease: "power4.in" // 쿵 하는 타격감 유지
      });

      // 미세 입자(Spores) 애니메이션 유지
      gsap.utils.toArray('.history-spore').forEach((spore) => {
        gsap.set(spore, { x: gsap.utils.random(-20, 20), opacity: gsap.utils.random(0.3, 0.7), scale: gsap.utils.random(0.5, 1.5) });
        gsap.to(spore, {
          y: -400, x: `+=${gsap.utils.random(-50, 50)}`, rotation: gsap.utils.random(-180, 180),
          opacity: 0, duration: gsap.utils.random(5, 10), repeat: -1, ease: "none", delay: gsap.utils.random(0, 5)
        });
      });
    }

    // 섹션별 배경색 전환 애니메이션 (Atmosphere)
    ScrollTrigger.create({
      trigger: missionSectionRef.current, start: "top 60%", end: "bottom 60%",
      onEnter: () => gsap.to('.about-page', { backgroundColor: '#1a2920', duration: 0.8 }),
      onLeaveBack: () => gsap.to('.about-page', { backgroundColor: '#f7fdf9', duration: 0.8 })
    });
    ScrollTrigger.create({
      trigger: '.portfolio-section', start: "top 60%", end: "bottom 60%",
      onEnter: () => gsap.to('.about-page', { backgroundColor: '#dcedc8', duration: 0.8 }),
      onLeaveBack: () => gsap.to('.about-page', { backgroundColor: '#1a2920', duration: 0.8 })
    });
    ScrollTrigger.create({
      trigger: '.history-section', start: "top 60%", end: "bottom bottom",
      onEnter: () => gsap.to('.about-page', { backgroundColor: '#d7ccc8', duration: 0.8 }), 
      onLeaveBack: () => gsap.to('.about-page', { backgroundColor: '#dcedc8', duration: 0.8 })
    });

    // 텍스트 등장 애니메이션
    gsap.set('.intro-section h1', { y: 50, opacity: 0 });
    gsap.to('.intro-section h1', { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 });
    gsap.set('.intro-desc', { y: 30, opacity: 0 });
    gsap.to('.intro-desc', { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 });
    
    // 핵심 가치 아이템 등장 애니메이션
    gsap.set('.value-item', { scale: 0.8, opacity: 0 });
    gsap.to('.value-item', { scale: 1, opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.values-section', start: "top 80%" } });

    // 미션 텍스트 등장 애니메이션
    if (missionSectionRef.current) {
      gsap.set('.mission-main-text', { y: 50, opacity: 0 });
      gsap.to('.mission-main-text', { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: missionSectionRef.current, start: "top 70%" } });
    }

    // 포트폴리오 리스트 등장 애니메이션
    gsap.utils.toArray('.portfolio-list li').forEach((li, i) => {
      gsap.set(li, { y: 50, opacity: 0 });
      gsap.to(li, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, scrollTrigger: { trigger: li, start: "top 90%" } });
    });

    // 연혁 타임라인 행 등장 애니메이션 (Apple 스타일: 깔끔하고 미세한 블러 효과)
    const historyRows = gsap.utils.toArray('.timeline-row');
    historyRows.forEach((row) => {
      gsap.set(row, { opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }); 

      gsap.to(row, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)", 
        duration: 0.8, 
        ease: "expo.out", 
        scrollTrigger: {
          trigger: row,
          start: "top 85%", 
          once: true 
        }
      });
    });

    // 타임라인 트랙 채우기 애니메이션
    const timer = setTimeout(() => {
      const iconCells = gsap.utils.toArray('.t-icon-cell'); 
      if (iconCells.length > 0) {
        const first = iconCells[0];
        const last = iconCells[iconCells.length - 1];
        const topOffset = 12; 
        const totalHeight = (last.offsetTop + topOffset) - (first.offsetTop + topOffset);
        
        gsap.set('.history-track-fill', { top: first.offsetTop + topOffset });
        gsap.to('.history-track-fill', {
          height: totalHeight, ease: 'none',
          scrollTrigger: { trigger: '.history-timeline', start: "top center", end: "bottom center", scrub: 0.5, invalidateOnRefresh: true }
        });
      }
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);

  }, { scope: containerRef });


  // 미세 입자(Spores) 위치 초기화 (메모이제이션)
  const sporePositions = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      key: i,
      left: Math.random() * 100,
      bottom: -(Math.random() * 20)
    }));
  }, []);

  return (
    <div className="about-page" ref={containerRef}>
      
      {/* 
        [섹션] Hero 및 핵심 가치(Values) 영역
        페이지 상단에 위치하여 숲 배경의 패럴랙스 효과와 함께 회사의 비전(BOAS-SE)을 소개하고,
        Respect, Balance, Synergy라는 3대 핵심 가치를 아이콘과 함께 강조하여 보여줍니다.
      */}
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

      {/*
        [섹션] 미션(Mission) 소개 영역
        하드웨어와 소프트웨어의 융합이라는 회사의 미션을 텍스트와 하이라이트로 전달하며,
        배경의 반딧불이 애니메이션 효과를 통해 감성적인 분위기를 연출합니다.
      */}
      <section className="about-section mission-section-static" ref={missionSectionRef}>
        <div className="bg-layer mission-bg-layer-1"></div>
        <div className="bg-layer mission-bg-layer-2"></div>
        <div className="section-deco-container">
          {[...Array(8)].map((_, i) => <div key={i} className={`local-firefly lf-${i}`}></div>)}
        </div>
        <div className="section-content">
          <div className="mission-grid">
            <div className="mission-title-col"><h2>Mission</h2></div>
            <div className="mission-desc-col">
              <p className="mission-main-text">하드웨어 제조 기술과 <span className="text-highlight">ICT 기술을 융합</span>해<br />수시로 변하는 다양한 산업의 요구를 해결하며,<br /><span className="text-highlight">효율성을 높이는 지능형 기업</span>입니다.</p>
              <p className="mission-sub-text">우리는 단순히 소프트웨어를 개발하는 것을 넘어, 하드웨어와 소프트웨어의 완벽한 결합을 통해 실질적인 문제를 해결합니다. 스마트 팩토리부터 디지털 트윈, 모빌리티 관제까지, BOAS-SE의 기술은 산업 현장 곳곳에서 새로운 가치를 창출하고 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/*
        [섹션] 포트폴리오(Portfolio) 영역
        AI 예측, 스마트 팩토리, 모빌리티 등 회사의 5대 주요 사업 영역을 카드 형태로 나열하여
        각 분야의 전문성과 솔루션 개요를 아이콘과 함께 시각적으로 제공합니다.
      */}
      <section className="about-section portfolio-section" ref={portfolioSectionRef}>
        <div className="bg-layer portfolio-bg-layer-1"></div>
        <div className="bg-layer portfolio-bg-layer-2"></div>
        <div className="portfolio-leaves-container">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`side-leaf side-leaf-${i} ${i % 2 === 0 ? 'left-leaf' : 'right-leaf'}`}></div>
          ))}
        </div>
        <div className="section-content">
          <div className="portfolio-container">
            <h2 className="portfolio-title">BOAS-SE 만의<br />포트폴리오</h2>
            <ul className="portfolio-list">
              <li><div className="portfolio-card"><div className="portfolio-icon-wrapper"><FaBrain /></div><div className="portfolio-item-content"><h3>AI 기반 예측 및 최적화</h3><p>빅데이터 분석과 머신러닝을 통해<br/>비즈니스 효율성을 극대화합니다.</p></div></div></li>
              <li><div className="portfolio-card"><div className="portfolio-icon-wrapper"><FaIndustry /></div><div className="portfolio-item-content"><h3>스마트 팩토리 & DT</h3><p>IoT 센서와 MES를 연동하여<br/>생산 현장을 실시간 시각화합니다.</p></div></div></li>
              <li><div className="portfolio-card"><div className="portfolio-icon-wrapper"><FaCarSide /></div><div className="portfolio-item-content"><h3>스마트 모빌리티 관제</h3><p>차량 운행 데이터를 정밀 분석하여<br/>교통 안전 솔루션을 제시합니다.</p></div></div></li>
              <li><div className="portfolio-card"><div className="portfolio-icon-wrapper"><BsBuildingGear /></div><div className="portfolio-item-content"><h3>스마트 빌딩 & 안전 진단</h3><p>3D 비전 기술로 시설물의 이상 징후를<br/>조기에 감지하고 예방합니다.</p></div></div></li>
              <li><div className="portfolio-card"><div className="portfolio-icon-wrapper"><FaLeaf /></div><div className="portfolio-item-content"><h3>스마트 팜 & 농업 데이터</h3><p>데이터 기반의 정밀 농업을 실현하여<br/>농가의 생산성을 획기적으로 높입니다.</p></div></div></li>
            </ul>
          </div>
        </div>
      </section>

      {/*
        [섹션] 연혁(History) 타임라인 영역
        HISTORY_DATA 데이터를 기반으로 회사가 걸어온 길을 연도별로 나열하며,
        스크롤에 따라 발자국이 찍히는 애니메이션과 타임라인이 채워지는 인터랙션을 제공합니다.
      */}
      <section className="about-section history-section" ref={historyRef}>
        <div className="bg-layer history-bg-layer-1"></div>
        <div className="bg-layer history-bg-layer-2"></div>
        <div className="history-living-bg">
          {sporePositions.map((pos) => (
            <div key={pos.key} className="history-spore" style={{left: `${pos.left}%`, bottom: `${pos.bottom}%`}}></div>
          ))}
        </div>
        
        <div className="history-footprints-container">
          {[...Array(10)].map((_, i) => (
            <FaShoePrints 
              key={i} 
              className="footprint-icon" 
              style={{
                top: `${8 + i * 10}%`, 
                left: i % 2 === 0 ? '60px' : '140px', 
                transform: `rotate(${i % 2 === 0 ? -25 : 25}deg)`
              }} 
            />
          ))}
        </div>
        
        <div className="section-content history-flex-container">
          <div className="history-title-column"><h2>BOAS-SE가<br />걸어온 길</h2></div>
          <div className="history-timeline-column">
            <div className="history-timeline">
              <div className="history-track-bg"><div className="history-track-fill"></div></div>
              {HISTORY_DATA.map((item, index) => (
                <div key={index} className={`timeline-row ${index % 2 === 0 ? 'row-right-content' : 'row-left-content'}`}>
                  <div className="t-year-col"><span className="t-year">{item.year}</span></div>
                  <div className="t-icon-cell"><div className="t-icon"></div></div>
                  <div className="t-content-col">{item.content.map((text, i) => <p key={i}>{text}</p>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
        [섹션] 위치 안내(Location) 및 문의 유도(CTA) 영역
        카카오맵 API를 연동한 지도와 본사/공장 주소, 연락처 정보를 제공하며,
        하단에는 문의 페이지로 이동할 수 있는 버튼을 배치하여 사용자 행동을 유도합니다.
      */}
      <section className="about-section location-section">
        <div className="section-content">
          <div className="location-wrapper">
            <KakaoMap />
            <div className="location-info-card">
              <h3>오시는 길</h3>
              <div className="location-group mb-3"><div className="location-detail" style={{alignItems:'flex-start'}}><FaBuilding className="text-primary-custom mt-1 flex-shrink-0" /><div><strong style={{display:'block', marginBottom:'2px', color:'#1e2f23'}}>사무실 (본사)</strong><span style={{fontSize:'0.9rem'}}>충북 청주시 흥덕구 오송읍<br/>오송생명로 194, 7층 702호</span></div></div></div>
              <div className="location-group mb-4"><div className="location-detail" style={{alignItems:'flex-start'}}><FaIndustry className="text-primary-custom mt-1 flex-shrink-0" /><div><strong style={{display:'block', marginBottom:'2px', color:'#1e2f23'}}>공장</strong><span style={{fontSize:'0.9rem'}}>충북 청주시 흥덕구 월명로<br/>55번길 31</span></div></div></div>
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
            <button className="cta-button" onClick={() => navigate('/contact')}>프로젝트 문의하기 <FaArrowRight className="cta-icon" /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;