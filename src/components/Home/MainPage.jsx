import React from 'react';
import HeroSlider from './HeroSlider';
import InfoSection from './InfoSection';
import ProductCards from './ProductCards';
import CasesCarousel from './CasesCarousel';
import PartnersSection from './PartnersSection';
import BoardInquiry from './BoardInquiry';

const MainPage = () => {
  return (
    <>
      <HeroSlider />
      <InfoSection />
      <ProductCards />
      <CasesCarousel />
      <PartnersSection />
      <BoardInquiry />
    </>
  );
};

export default MainPage;
