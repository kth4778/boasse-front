import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../api/productData';
import { FaBrain, FaChartLine, FaShieldAlt, FaLeaf, FaBolt, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // URL의 id와 일치하는 상품 찾기
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="product-detail-container" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h2>상품을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/product')} className="btn-back" style={{ marginTop: '20px' }}>
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  // [디자인용 더미 데이터] Bento Grid용 스펙
  const getSpecs = (category) => {
    switch (category) {
      case 'Smart Mobility':
        return [
          { icon: <FaChartLine />, label: '데이터 분석', highlight: '99.9%', text: '운행 기록 정확도', className: '' },
          { icon: <FaBrain />, label: 'AI Engine', highlight: 'Real-time', text: '위험 운전 실시간 감지', className: 'card-wide' },
          { icon: <FaShieldAlt />, label: 'Safety', highlight: '사고 예방', text: '안전 운전 솔루션', className: '' },
          { icon: <FaMobileAlt />, label: 'Connectivity', highlight: '5G/LTE', text: '초고속 데이터 전송', className: '' },
        ];
      case 'Smart Factory':
        return [
          { icon: <FaBolt />, label: 'Efficiency', highlight: '30% UP', text: '생산 효율성 증대', className: 'card-wide card-gradient' },
          { icon: <FaBrain />, label: 'AI Analysis', highlight: 'Predictive', text: '설비 고장 사전 예측', className: '' },
          { icon: <FaShieldAlt />, label: 'Security', highlight: 'ISO 27001', text: '국제 표준 보안 규격', className: '' },
          { icon: <FaChartLine />, label: 'Monitoring', highlight: '24/7', text: '중단 없는 실시간 관제', className: '' },
        ];
      case 'Smart Farm':
        return [
          { icon: <FaLeaf />, label: 'Growth', highlight: '최적 환경', text: '작물별 맞춤 제어', className: 'card-tall' },
          { icon: <FaChartLine />, label: 'Yield', highlight: '20% 증대', text: '평균 수확량 증가', className: '' },
          { icon: <FaMobileAlt />, label: 'Control', highlight: 'Remote', text: '언제 어디서나 원격 제어', className: '' },
          { icon: <FaBrain />, label: 'Data', highlight: 'Big Data', text: '생육 데이터 정밀 분석', className: 'card-wide' },
        ];
      case 'Smart Building':
        return [
          { icon: <FaBolt />, label: 'Energy', highlight: 'Zero', text: '에너지 자립률 최적화', className: 'card-wide' },
          { icon: <FaShieldAlt />, label: 'Diagnosis', highlight: 'AI Vision', text: '시설물 이상 자동 감지', className: '' },
          { icon: <FaChartLine />, label: 'Savings', highlight: 'Cost Down', text: '운영 비용 절감 효과', className: '' },
          { icon: <FaBrain />, label: 'Management', highlight: 'Smart', text: '지능형 통합 관제', className: '' },
        ];
      default:
        return [
          { icon: <FaBrain />, label: 'Technology', highlight: 'Advanced', text: '최신 기술 적용', className: 'card-wide' },
          { icon: <FaChartLine />, label: 'Performance', highlight: 'High', text: '고성능 처리 엔진', className: '' },
          { icon: <FaShieldAlt />, label: 'Reliability', highlight: 'Stable', text: '안정적인 시스템 운영', className: '' },
        ];
    }
  };

  // [디자인용 더미 데이터] 상세 기능 리스트
  const getDetailFeatures = (category) => {
    switch (category) {
      case 'Smart Mobility':
        return [
          { title: "운행 데이터 정밀 분석", desc: "GPS와 가속도 센서를 융합하여 차량의 위치, 속도, 급가속/감속 여부를 초단위로 정밀하게 기록합니다." },
          { title: "실시간 관제 대시보드", desc: "웹/모바일 대시보드를 통해 전체 차량의 현재 위치와 상태를 한눈에 파악하고 효율적인 배차를 지원합니다." },
          { title: "위험 운전 행동 감지", desc: "운전자의 졸음운전, 전방 주시 태만 등 위험 행동을 AI 카메라로 감지하여 즉시 경고음을 송출합니다." },
          { title: "경제 운전 가이드", desc: "연비 효율을 높이는 최적의 주행 경로와 속도 패턴을 분석하여 운전자에게 가이드를 제공합니다." }
        ];
      case 'Smart Factory':
        return [
          { title: "설비 예지 보전 (PdM)", desc: "설비의 진동, 소음 데이터를 학습한 AI가 고장 징후를 사전에 포착하여 다운타임을 획기적으로 줄입니다." },
          { title: "품질 관리 자동화", desc: "비전 검사 장비와 연동하여 제품의 미세한 불량을 실시간으로 검출하고 불량률 통계를 자동 생성합니다." },
          { title: "에너지 관리 시스템 (FEMS)", desc: "공장 내 주요 설비의 전력 소비량을 모니터링하고 피크 전력을 제어하여 에너지 비용을 절감합니다." },
          { title: "디지털 트윈 연동", desc: "3D 가상 공장 모델과 실시간 데이터를 동기화하여 원격에서도 현장 상황을 완벽하게 파악할 수 있습니다." }
        ];
      case 'Smart Farm':
        return [
          { title: "복합 환경 자동 제어", desc: "온도, 습도, CO2, 광량 등 온실 내 환경 변수를 작물의 생육 단계에 맞춰 자동으로 제어합니다." },
          { title: "양액 공급 최적화", desc: "일사량과 배액 데이터를 기반으로 작물이 필요로 하는 정확한 양의 물과 비료를 공급합니다." },
          { title: "병해충 조기 예찰", desc: "스마트 트랩과 예찰 카메라로 수집한 이미지를 분석하여 병해충 발생 초기에 알림을 제공합니다." },
          { title: "생육 데이터 리포트", desc: "작물의 성장 속도, 수확량 예측 등 경영 의사결정에 필요한 핵심 데이터를 주간/월간 리포트로 제공합니다." }
        ];
      case 'Smart Building':
        return [
          { title: "지능형 HVAC 제어", desc: "실내 재실 인원과 외부 날씨를 고려하여 냉난방 시스템을 최적 가동함으로써 쾌적함과 에너지 절약을 동시에 달성합니다." },
          { title: "시설물 안전 진단", desc: "노후화된 건물의 균열, 기울기 등을 IoT 센서로 상시 감시하고 위험 수치 도달 시 관리자에게 즉시 통보합니다." },
          { title: "스마트 주차 관제", desc: "AI 카메라가 차량 번호를 인식하여 입출차를 관리하고 빈 주차 공간으로 유도하여 주차 편의성을 높입니다." },
          { title: "통합 보안 시스템", desc: "CCTV, 출입 통제, 화재 감지 시스템을 하나의 플랫폼으로 통합하여 비상 상황 시 신속한 대응을 지원합니다." }
        ];
      default:
        return [
          { title: "고성능 프로세싱", desc: "대용량 데이터를 지연 없이 처리할 수 있는 최적화된 아키텍처를 적용하였습니다." },
          { title: "확장 가능한 구조", desc: "모듈형 설계로 비즈니스 성장에 맞춰 유연하게 기능을 확장할 수 있습니다." },
          { title: "강력한 보안", desc: "데이터 암호화 및 접근 제어 기술을 통해 기업의 소중한 정보를 안전하게 보호합니다." },
          { title: "24/7 기술 지원", desc: "전문 엔지니어가 상시 대기하여 시스템 장애 시 신속한 복구를 지원합니다." }
        ];
    }
  }

  const specs = getSpecs(product.category);
  const detailFeatures = getDetailFeatures(product.category);

  return (
    <div className="product-detail-container">
      {/* Hero Section */}
      <div className="detail-hero" style={{ backgroundImage: `url(${product.image})` }}>
        <div className="detail-hero-overlay"></div>
        <div className="detail-hero-content">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-short-desc">{product.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="detail-content">
        <h2 className="detail-section-title">주요 특징 및 성능</h2>
        
        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* 1. 첫 번째 카드 (메인 설명) */}
          <div className="bento-card card-wide">
             <div className="card-label">Product Overview</div>
             <div className="card-desc" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
               {product.detail || "이 제품은 최신 기술이 집약된 BOAS-SE의 핵심 솔루션입니다."}
             </div>
          </div>

          {/* 2. 동적 스펙 카드들 */}
          {specs.map((spec, index) => (
            <div key={index} className={`bento-card ${spec.className}`}>
              <div className="card-icon">{spec.icon}</div>
              <div className="card-label">{spec.label}</div>
              <div className="card-highlight">
                {spec.highlight}
              </div>
              <div className="card-desc">{spec.text}</div>
            </div>
          ))}
        </div>

        {/* New: 상세 기능 리스트 섹션 */}
        <div className="detail-features-section">
          <h3 className="feature-list-title">상세 기능 명세</h3>
          <div className="feature-grid">
            {detailFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-btn-group">
          <button onClick={() => navigate(-1)} className="btn-back">
            뒤로 가기
          </button>
          <button className="btn-inquiry">
            도입 문의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
