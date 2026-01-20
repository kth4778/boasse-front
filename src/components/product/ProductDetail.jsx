import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';
import productApi from '../../api/productApi';
import { 
  FaBrain, FaChartLine, FaShieldAlt, FaLeaf, FaBolt, FaMobileAlt, FaCheckCircle, FaArrowLeft, FaPaperPlane,
  FaCog, FaDatabase, FaServer, FaCloud
} from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './ProductDetail.css';

// 아이콘 매핑 객체 (AdminProductForm과 동일)
const ICON_MAP = {
  'FaChartLine': <FaChartLine />,
  'FaBrain': <FaBrain />,
  'FaShieldAlt': <FaShieldAlt />,
  'FaLeaf': <FaLeaf />,
  'FaBolt': <FaBolt />,
  'FaMobileAlt': <FaMobileAlt />,
  'FaCheckCircle': <FaCheckCircle />,
  'FaCog': <FaCog />,
  'FaDatabase': <FaDatabase />,
  'FaServer': <FaServer />,
  'FaCloud': <FaCloud />
};

// [데이터] Bento Grid Specs (기본값)
const getSpecs = (category) => {
  switch (category) {
    case 'Smart Mobility':
      return [
        { icon: 'FaChartLine', label: 'Accuracy', highlight: '99.9%', text: '운행 기록 정확도', className: '' },
        { icon: 'FaBrain', label: 'AI Engine', highlight: 'Real-time', text: '위험 운전 실시간 감지', className: 'card-wide' },
        { icon: 'FaShieldAlt', label: 'Safety', highlight: 'Prevention', text: '사고 예방 솔루션', className: '' },
        { icon: 'FaMobileAlt', label: 'Network', highlight: '5G/LTE', text: '초고속 데이터 전송', className: '' },
      ];
    case 'Smart Factory':
      return [
        { icon: 'FaBolt', label: 'Efficiency', highlight: '30% UP', text: '생산 효율성 증대', className: 'card-wide' },
        { icon: 'FaBrain', label: 'Predictive', highlight: 'AI Analysis', text: '설비 고장 사전 예측', className: '' },
        { icon: 'FaShieldAlt', label: 'Security', highlight: 'ISO 27001', text: '국제 표준 보안', className: '' },
        { icon: 'FaChartLine', label: 'Monitoring', highlight: '24/7', text: '중단 없는 관제', className: '' },
      ];
    case 'Smart Farm':
      return [
        { icon: 'FaLeaf', label: 'Environment', highlight: 'Optimal', text: '작물별 맞춤 제어', className: '' },
        { icon: 'FaChartLine', label: 'Yield', highlight: '+20%', text: '평균 수확량 증가', className: '' },
        { icon: 'FaMobileAlt', label: 'Control', highlight: 'Remote', text: '언제 어디서나 제어', className: '' },
        { icon: 'FaBrain', label: 'Big Data', highlight: 'Analysis', text: '생육 정밀 분석', className: 'card-wide' },
      ];
    default:
      return [
        { icon: 'FaBrain', label: 'Tech', highlight: 'Advanced', text: '최신 기술 적용', className: 'card-wide' },
        { icon: 'FaChartLine', label: 'Perf', highlight: 'High', text: '고성능 처리 엔진', className: '' },
        { icon: 'FaShieldAlt', label: 'Stable', highlight: 'Reliable', text: '안정적인 운영', className: '' },
      ];
  }
};

// [데이터] 상세 기능 (기본값)
const getDetailFeatures = (category) => {
  switch (category) {
    case 'Smart Mobility':
      return [
        { title: "운행 데이터 정밀 분석", desc: "GPS/가속도 센서 융합, 초단위 정밀 기록" },
        { title: "실시간 관제 대시보드", desc: "웹/모바일 통합 관제 및 효율적 배차 지원" },
        { title: "위험 운전 행동 감지", desc: "AI 카메라 기반 졸음/주시 태만 즉시 경고" },
        { title: "경제 운전 가이드", desc: "연비 효율 최적화 경로 및 패턴 분석 제공" }
      ];
    case 'Smart Factory':
      return [
        { title: "설비 예지 보전 (PdM)", desc: "진동/소음 데이터 학습 AI로 고장 징후 포착" },
        { title: "품질 관리 자동화", desc: "비전 검사 연동, 미세 불량 실시간 검출" },
        { title: "에너지 관리 (FEMS)", desc: "주요 설비 전력 모니터링 및 피크 제어" },
        { title: "디지털 트윈 연동", desc: "3D 가상 공장 모델과 실시간 데이터 동기화" }
      ];
    case 'Smart Farm':
      return [
        { title: "복합 환경 자동 제어", desc: "온도/습도/CO2 등 생육 단계별 자동 제어" },
        { title: "양액 공급 최적화", desc: "일사량/배액 기반 정밀 관수 및 시비" },
        { title: "병해충 조기 예찰", desc: "이미지 분석을 통한 병해충 발생 초기 알림" },
        { title: "생육 데이터 리포트", desc: "성장 속도 및 수확량 예측 데이터 제공" }
      ];
    default:
      return [
        { title: "고성능 프로세싱", desc: "대용량 데이터 지연 없는 최적화 아키텍처" },
        { title: "확장 가능한 구조", desc: "비즈니스 성장에 맞춘 유연한 모듈 확장" },
        { title: "강력한 보안", desc: "데이터 암호화 및 접근 제어로 정보 보호" },
        { title: "24/7 기술 지원", desc: "전문 엔지니어 상시 대기 및 신속 복구" }
      ];
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductDetail(id);
        if (response.data.success) {
          const data = response.data.data;
          // specs와 features가 JSON 문자열로 올 경우 파싱 처리
          // (axios나 백엔드 설정에 따라 이미 객체일 수도 있음)
          if (typeof data.specs === 'string') {
            try { data.specs = JSON.parse(data.specs); } catch (e) {}
          }
          if (typeof data.features === 'string') {
            try { data.features = JSON.parse(data.features); } catch (e) {}
          }
          setProduct(data);
        }
      } catch (error) {
        console.error("제품 상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    // 스크롤 복원 방지 및 최상단 이동
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="pd-container d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#000' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-container d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#000', color: '#fff' }}>
        <h3>제품 정보를 찾을 수 없습니다.</h3>
      </div>
    );
  }

  // 동적 데이터(specs, features)가 있으면 사용하고, 없으면 카테고리별 기본 데이터 사용
  const specs = product.specs && product.specs.length > 0 
    ? product.specs 
    : getSpecs(product.category);
    
  const features = product.features && product.features.length > 0 
    ? product.features 
    : getDetailFeatures(product.category);

  // 배경 이미지 처리
  const bgStyle = { backgroundImage: `url(${product.image})` };

  return (
    <div className="pd-container">
      {/* Background Layer */}
      <div className="pd-bg-container">
        <div className={`pd-bg-image ${activeIndex === 0 ? 'active' : ''}`} style={bgStyle}>
          <div className="pd-bg-overlay"></div>
        </div>
        <div className={`pd-bg-image darker ${activeIndex === 1 ? 'active' : ''}`} style={bgStyle}>
          <div className="pd-bg-overlay"></div>
        </div>
        <div className={`pd-bg-image darker ${activeIndex === 2 ? 'active' : ''}`} style={bgStyle}>
          <div className="pd-bg-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}></div>
        </div>
        <div className={`pd-bg-image ${activeIndex === 3 ? 'active' : ''}`} style={bgStyle}>
           <div className="pd-bg-overlay" style={{ backgroundColor: '#000' }}></div>
        </div>
      </div>

      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={1000}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination, EffectFade]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="pd-swiper"
      >
        {/* Slide 1: Hero */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.title}</h1>
            <p className="pd-desc">{product.description}</p>
          </div>
        </SwiperSlide>

        {/* Slide 2: Specs (Bento Grid) */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <h2 className="pd-section-title">Key Performance</h2>
            <div className="pd-bento-grid">
              {specs.map((spec, idx) => (
                <div key={idx} className={`pd-bento-card ${spec.className || ''}`}>
                  <div className="card-icon">
                    {/* 문자열 아이콘 이름을 컴포넌트로 변환 */}
                    {typeof spec.icon === 'string' ? (ICON_MAP[spec.icon] || <FaCheckCircle />) : spec.icon}
                  </div>
                  <div className="card-label">{spec.label}</div>
                  <div className="card-highlight">{spec.highlight}</div>
                  <div className="card-text">{spec.text}</div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Detailed Features */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <h2 className="pd-section-title">Detail Features</h2>
            <div className="pd-feature-grid">
              {features.map((f, idx) => (
                <div key={idx} className="pd-feature-item">
                  <FaCheckCircle className="pd-feature-icon" />
                  <div className="pd-feature-content">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: CTA */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <h2 className="pd-title" style={{ fontSize: '3.5rem' }}>Ready to Innovate?</h2>
            <p className="pd-desc" style={{ marginBottom: '3rem' }}>
              보아스소프트의 첨단 기술로 당신의 비즈니스를 혁신하세요.
            </p>
            <div className="pd-btn-group">
              <button onClick={() => navigate(-1)} className="pd-btn-back">
                <FaArrowLeft style={{ marginRight: '10px' }} /> 뒤로 가기
              </button>
              <Link to="/contact" className="pd-btn-inquiry">
                도입 문의하기 <FaPaperPlane style={{ marginLeft: '10px' }} />
              </Link>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default ProductDetail;