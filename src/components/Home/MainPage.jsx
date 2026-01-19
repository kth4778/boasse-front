import React from 'react';
import HeroSlider from './HeroSlider';
import InfoSection from './InfoSection';
import ProductCards from './ProductCards';
import NoticePreview from './NoticePreview';
import PartnersSection from './PartnersSection';
import BoardInquiry from './BoardInquiry';

const MainPage = () => {
  return (
    <>
      <HeroSlider />
      <InfoSection />
      <ProductCards />
      <NoticePreview />
      <PartnersSection />
      <BoardInquiry />
    </>
  );
};

export default MainPage;
