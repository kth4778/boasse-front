import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MainPage from './components/Home/MainPage';
import NoticeList from './components/Notice/NoticeList';
import NoticeDetail from './components/Notice/NoticeDetail';
import NoticeWrite from './components/Notice/NoticeWrite';
import About from './components/about/About';
import Business from './components/business/Business';
import Product from './components/product/Product';
import ProductDetail from './components/product/ProductDetail';
import Contact from './components/contact/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isContactPage = location.pathname === '/contact';
  const isBusinessPage = location.pathname === '/business';

  const mainStyle = {
    // 홈 페이지, 컨택 페이지, 비즈니스 페이지일 때는 전체 높이 등 레이아웃 제약을 풉니다.
    // 그 외 서브 페이지일 때만 헤더 높이만큼 패딩을 줍니다.
    paddingTop: (isHomePage || isContactPage || isBusinessPage) ? '0' : '120px',
    width: '100%',
  };

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      
      {/* Main Content Area with Routing */}
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/notice/edit/:id" element={<NoticeWrite />} />
          <Route path="/about" element={<About />} />
          <Route path="/business" element={<Business />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
