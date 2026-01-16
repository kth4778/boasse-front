import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// User Layout & Pages
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MainPage from './components/Home/MainPage';
import NoticeList from './components/Notice/NoticeList';
import NoticeDetail from './components/Notice/NoticeDetail';
import NoticeWrite from './components/Notice/NoticeWrite';
import About from './components/about/About';
import Recruit from './components/recruit/Recruit';
import Product from './components/product/Product';
import ProductDetail from './components/product/ProductDetail';
import ErrorBoundary from './components/ErrorBoundary';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminNoticeList from './components/admin/Notice/AdminNoticeList';
import AdminNoticeForm from './components/admin/Notice/AdminNoticeForm';
import AdminRecruitList from './components/admin/Recruit/AdminRecruitList';
import AdminRecruitForm from './components/admin/Recruit/AdminRecruitForm';
import AdminProductList from './components/admin/Product/AdminProductList';
import AdminProductForm from './components/admin/Product/AdminProductForm';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';
  
  // 특정 페이지들 패딩 제외 처리
  const isBackgroundPage = location.pathname.startsWith('/notice') || 
                           location.pathname.startsWith('/recruit') || 
                           location.pathname.startsWith('/product');

  const mainStyle = {
    paddingTop: (isHomePage || isBackgroundPage || isAdminPage) ? '0' : '120px',
    width: '100%',
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {!isAdminPage && <Header />}
        
        <main style={mainStyle}>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<MainPage />} />
            <Route path="/notice" element={<NoticeList />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/notice/write" element={<NoticeWrite />} />
            <Route path="/notice/edit/:id" element={<NoticeWrite />} />
            <Route path="/about" element={<About />} />
            <Route path="/recruit" element={<Recruit />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="notice" element={<AdminNoticeList />} />
              <Route path="notice/write" element={<AdminNoticeForm />} />
              <Route path="notice/edit/:id" element={<AdminNoticeForm />} />
              <Route path="recruit" element={<AdminRecruitList />} />
              <Route path="recruit/write" element={<AdminRecruitForm />} />
              <Route path="recruit/edit/:id" element={<AdminRecruitForm />} />
              <Route path="product" element={<AdminProductList />} />
              <Route path="product/write" element={<AdminProductForm />} />
              <Route path="product/edit/:id" element={<AdminProductForm />} />
            </Route>
          </Routes>
        </main>

        {!isAdminPage && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

export default App;