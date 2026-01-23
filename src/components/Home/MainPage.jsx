import React from 'react';
import HeroSlider from './HeroSlider';
import InfoSection from './InfoSection';
import ProductCards from './ProductCards';
import NoticePreview from './NoticePreview';
import PartnersSection from './PartnersSection';
import BoardInquiry from './BoardInquiry';

/*
 * [메인 페이지 컴포넌트]
 * Home 컴포넌트와 유사하지만 구성이 약간 다릅니다. (NoticePreview, PartnersSection 포함)
 * HeroSlider(슬라이더), InfoSection(사업영역), ProductCards(제품), NoticePreview(공지사항), PartnersSection(협력사), BoardInquiry(문의) 순으로 배치됩니다.
 */
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