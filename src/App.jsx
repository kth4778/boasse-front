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
import Product from './components/product/Product';
import ProductDetail from './components/product/ProductDetail';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  // 배경색이 있는 서브 페이지들(Notice 등)은 헤더 패딩을 별도로 처리하거나 0으로 설정합니다.
  const isBackgroundPage = location.pathname.startsWith('/notice');

  const mainStyle = {
    paddingTop: (isHomePage || isBackgroundPage) ? '0' : '120px',
    width: '100%',
  };

  return (
    <div className="App">
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
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
