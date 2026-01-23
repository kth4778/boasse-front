import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';

import './Business.css';

/*
 * [비즈니스 소개 페이지]
 * 회사의 주요 사업 분야(Vision, SI/SM, Mobile/Platform, AI/Big Data)를 
 * 세로 스크롤 형태의 풀페이지 슬라이더로 소개하는 컴포넌트입니다.
 * 배경 이미지가 슬라이드 전환에 맞춰 부드럽게 변경되며, 각 섹션의 핵심 메시지를 전달합니다.
 */
const Business = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // 배경 이미지 목록 (다크 테마에 어울리는 추상적이고 고화질의 이미지 사용)
  const backgroundImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Vision (Global Network)
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', // SI (Circuit/Chip)
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', // Mobile (Digital Tech)
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop', // AI (Abstract Brain)
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Contact (Architecture - No Face)
  ];

  return (
    <div className="business-container">
      {/* 
        [배경 이미지 레이어]
        Swiper 내부에 넣지 않고 별도로 분리하여 Cross-fade 효과를 자연스럽게 구현했습니다.
        활성화된 슬라이드 인덱스(activeIndex)에 해당하는 이미지만 투명도를 1로 설정합니다.
      */}
      <div className="background-container">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`bg-image ${index === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="bg-overlay"></div> {/* 텍스트 가독성을 위한 어두운 오버레이 */}
      </div>

      <Swiper
        direction={'vertical'}      // 세로 방향 스크롤
        slidesPerView={1}           // 한 번에 하나의 슬라이드만 표시
        spaceBetween={0}
        mousewheel={true}           // 마우스 휠로 제어 가능
        speed={1000}                // 전환 속도 (1초)
        pagination={{
          clickable: true,          // 페이지네이션 클릭 가능
        }}
        modules={[Mousewheel, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // 현재 슬라이드 변경 시 상태 업데이트
        className="business-swiper"
      >
        {/* 슬라이드 1: 회사 비전 소개 */}
        <SwiperSlide className="business-slide">
          <div className="slide-content">
            <div className="slide-eyebrow">BOAS-SE Vision</div>
            <h2 className="slide-title">미래를 설계하는 기술,<br />그 이상의 가치.</h2>
            <p className="slide-description">
              우리는 단순한 IT 서비스를 넘어, 당신의 비즈니스를 혁신하는 파트너입니다.<br />
              가장 진보된 기술로 새로운 가능성을 엽니다.
            </p>
          </div>
        </SwiperSlide>

        {/* 슬라이드 2: SI/SM 사업 영역 */}
        <SwiperSlide className="business-slide">
          <div className="slide-content">
            <div className="slide-eyebrow">System Integration & Management</div>
            <h2 className="slide-title">복잡함을 간결함으로.<br />완벽한 통합 솔루션.</h2>
            <p className="slide-description">
              고객의 환경에 최적화된 시스템 구축(SI)부터 안정적인 운영(SM)까지.<br />
              검증된 노하우로 비즈니스 효율성을 극대화합니다.
            </p>
          </div>
        </SwiperSlide>

        {/* 슬라이드 3: 모바일 및 플랫폼 사업 영역 */}
        <SwiperSlide className="business-slide">
          <div className="slide-content">
            <div className="slide-eyebrow">Mobile & Platform</div>
            <h2 className="slide-title">손끝에서 시작되는<br />놀라운 경험.</h2>
            <p className="slide-description">
              사용자 중심의 직관적인 UI/UX 디자인과 강력한 퍼포먼스. <br />
              iOS, Android, 그리고 웹을 아우르는 통합 플랫폼을 구축합니다.
            </p>
          </div>
        </SwiperSlide>

        {/* 슬라이드 4: AI 및 빅데이터 사업 영역 */}
        <SwiperSlide className="business-slide">
          <div className="slide-content">
            <div className="slide-eyebrow">AI & Big Data</div>
            <h2 className="slide-title">데이터, 그 너머의<br />통찰력을 발견하다.</h2>
            <p className="slide-description">
              인공지능과 빅데이터 분석을 통해 숨겨진 패턴을 찾고, <br />
              미래를 예측하여 비즈니스 의사결정을 혁신합니다.
            </p>
          </div>
        </SwiperSlide>

        {/* 슬라이드 5: 문의하기 (CTA) */}
        <SwiperSlide className="business-slide">
          <div className="slide-content">
            <div className="slide-eyebrow">Contact Us</div>
            <h2 className="slide-title">새로운 가능성,<br />BOAS-SE와 함께하세요.</h2>
            <p className="slide-description">
              성공적인 비즈니스를 위한 첫걸음.<br />
              당신의 고민을 해결해 드릴 최적의 솔루션을 제안합니다.
            </p>
            <div style={{ marginTop: '50px' }}>
              <Link to="/contact" className="contact-btn">
                문의하기
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Business;