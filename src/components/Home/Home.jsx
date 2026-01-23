import React from 'react';
import HeroSlider from './HeroSlider';
import InfoSection from './InfoSection';
import ProductCards from './ProductCards';
import CasesCarousel from './CasesCarousel';
import BoardInquiry from './BoardInquiry';

/*
 * [메인 홈 페이지 컴포넌트]
 * 웹사이트의 진입점(Landing Page) 역할을 하며, 주요 섹션들을 조합하여 화면을 구성합니다.
 * HeroSlider(상단 슬라이더), InfoSection(소개), ProductCards(제품), CasesCarousel(사례), BoardInquiry(문의) 순으로 배치됩니다.
 */
const Home = () => {
  return (
    <>
      <HeroSlider />
      <InfoSection />
      <ProductCards />
      <CasesCarousel />
      <BoardInquiry />
    </>
  );
};

export default Home;