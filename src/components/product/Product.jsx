import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Product.css';

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const containerRef = useRef();

  const products = [
    {
      id: 1,
      title: "스마트 DTG 단말기",
      category: "Smart Mobility",
      image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
      description: "차량 운행 데이터(위치, 속도 등)를 실시간으로 수집하는 고정밀 IoT 단말기"
    },
    {
      id: 8,
      title: "스마트 운전자 앱",
      category: "Smart Mobility",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      description: "운행 기록 조회 및 안전 운전 점수를 제공하는 모바일 애플리케이션"
    },
    {
      id: 16,
      title: "운전 패턴 분석 AI",
      category: "Smart Mobility",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
      description: "사고 위험도를 예측하고 안전 운전을 유도하는 지능형 드라이빙 솔루션"
    },
    {
      id: 13,
      title: "탄소 배출 분석 플랫폼",
      category: "Smart Mobility",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      description: "주행 데이터 및 공정 데이터를 기반으로 탄소 배출량을 자동 산정하는 소프트웨어"
    },
    {
      id: 14,
      title: "물류 가시성 플랫폼",
      category: "Smart Mobility",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      description: "배송 차량의 현재 위치와 도착 예정 시간을 실시간으로 관제하는 시스템"
    },
    {
      id: 20,
      title: "지능형 배차 최적화",
      category: "Smart Mobility",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
      description: "최단 경로 및 적재율을 계산하여 물류 효율성을 극대화하는 배차 솔루션"
    },
    {
      id: 3,
      title: "IoT 게이트웨이",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
      description: "다양한 생산 설비의 데이터를 수집하여 서버로 전송하는 산업용 게이트웨이"
    },
    {
      id: 4,
      title: "산업용 AI 카메라",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      description: "공장 및 시설물의 안전 상태를 실시간으로 감지하고 분석하는 지능형 카메라"
    },
    {
      id: 7,
      title: "산업용 스마트 태그",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      description: "공장 내 자재 및 제품의 위치를 추적하는 초소형 무선 인식 태그"
    },
    {
      id: 10,
      title: "스마트 팩토리 MES",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
      description: "생산 계획부터 공정 관리까지 제조 현장을 효율적으로 운영하는 실행 시스템"
    },
    {
      id: 15,
      title: "AI 공정 최적화",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      description: "빅데이터 분석을 통해 생산 스케줄을 최적화하고 납기를 준수하는 AI 솔루션"
    },
    {
      id: 17,
      title: "디지털 트윈 관제",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800",
      description: "현실 공간을 3D로 시각화하여 원격 제어 및 모니터링을 지원하는 플랫폼"
    },
    {
      id: 12,
      title: "통합 안전 관제 S/W",
      category: "Smart Factory",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      description: "다양한 시설물의 상태 데이터를 수집하여 통합 모니터링하는 웹 대시보드"
    },
    {
      id: 2,
      title: "IoT 토양 센서",
      category: "Smart Farm",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
      description: "스마트팜 환경에서 토양 온습도 및 영양분을 정밀 측정하는 센서 모듈"
    },
    {
      id: 6,
      title: "대기 환경 관측 스테이션",
      category: "Smart Farm",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
      description: "대기 온도, 습도, 미세먼지 등 환경 데이터를 실시간 수집하는 실외 장비"
    },
    {
      id: 11,
      title: "병해충 예찰 앱",
      category: "Smart Farm",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800",
      description: "농작물의 병해충 발생 위험 시기를 예측하여 알림을 제공하는 농업 플랫폼"
    },
    {
      id: 18,
      title: "스마트팜 생육 관리",
      category: "Smart Farm",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      description: "데이터 기반으로 작물의 최적 생육 환경을 자동으로 제어하는 토탈 솔루션"
    },
    {
      id: 5,
      title: "승강기 진단 센서",
      category: "Smart Building",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
      description: "승강기 플랫벨트의 미세한 흔들림과 파손을 감지하는 고성능 뎁스 카메라"
    },
    {
      id: 9,
      title: "ZEB 에너지 모니터링",
      category: "Smart Building",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: "제로에너지빌딩의 에너지 생산/소비 현황을 실시간으로 관리하는 시스템"
    },
    {
      id: 19,
      title: "승강기 예지 보전",
      category: "Smart Building",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
      description: "부품 고장을 사전에 예측하여 사고를 예방하는 지능형 유지보수 시스템"
    },
    {
      id: 21,
      title: "에너지 자립 최적화",
      category: "Smart Building",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
      description: "빌딩의 에너지 생산과 소비를 분석하여 에너지 자립률을 최적화하는 AI 엔진"
    }
  ];

  const filteredProducts = activeCategory === '전체' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const categories = ['전체', 'Smart Factory', 'Smart Mobility', 'Smart Farm', 'Smart Building'];

  useGSAP(() => {
    gsap.set('.product-card', { y: 100, opacity: 0 });
    ScrollTrigger.batch('.product-card', {
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true
        });
      }
    });
    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [filteredProducts] });

  return (
    <div className="product-container" ref={containerRef}>
      <div className="product-intro-section">
        <div className="product-header">
          <h1 className="product-title">Product</h1>
          <p className="product-description">
            효율적인 시스템 구축과 사용자 요구에 알맞는 커스터마이징 제품. 최고의 서비스와 품질.<br />
            다양한 산업 분야의 고객 요구를 반영한 제품들을 만나보세요.
          </p>
        </div>

        <div className="product-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`product-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-card-image" />
            <div className="product-card-content">
              <div className="product-card-tags">
                <span className="product-tag">{product.category}</span>
              </div>
              <h3 className="product-card-title">{product.title}</h3>
              <p className="product-card-desc">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
