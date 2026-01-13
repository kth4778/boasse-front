import React from 'react';
import HeroSlider from './HeroSlider';
import InfoSection from './InfoSection';
import ProductCards from './ProductCards';
import CasesCarousel from './CasesCarousel';
import BoardInquiry from './BoardInquiry';

const MainPage = () => {
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

export default MainPage;
