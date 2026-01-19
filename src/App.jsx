import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout & Common
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// User Pages
import MainPage from './components/Home/MainPage';
import About from './components/about/About';
import Business from './components/business/Business';
import Recruit from './components/recruit/Recruit';
import Product from './components/product/Product';
import ProductDetail from './components/product/ProductDetail';
import Contact from './components/contact/Contact';

// Legal Pages
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import EmailPolicy from './components/legal/EmailPolicy';
import TermsOfService from './components/legal/TermsOfService';

// Notice Pages
import NoticeList from './components/Notice/NoticeList';
import NoticeDetail from './components/Notice/NoticeDetail';
import NoticeWrite from './components/Notice/NoticeWrite';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminNoticeList from './components/admin/Notice/AdminNoticeList';
import AdminNoticeForm from './components/admin/Notice/AdminNoticeForm';
import AdminRecruitList from './components/admin/Recruit/AdminRecruitList';
import AdminRecruitForm from './components/admin/Recruit/AdminRecruitForm';
import AdminProductList from './components/admin/Product/AdminProductList';
import AdminProductForm from './components/admin/Product/AdminProductForm';
import AdminInquiryList from './components/admin/Inquiry/AdminInquiryList';
import AdminInquiryDetail from './components/admin/Inquiry/AdminInquiryDetail';
import AdminPartnerList from './components/admin/Partner/AdminPartnerList';
import AdminPartnerForm from './components/admin/Partner/AdminPartnerForm';

function App() {
  const location = useLocation();
  
  // 관리자 페이지 여부 확인
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // 헤더 패딩이 필요 없는 페이지들 정의
  const isHomePage = location.pathname === '/';
  const isContactPage = location.pathname === '/contact';
  const isBusinessPage = location.pathname === '/business';
  const isBackgroundPage = location.pathname.startsWith('/notice') || 
                           location.pathname.startsWith('/recruit') || 
                           location.pathname.startsWith('/product');

  const mainStyle = {
    // 위 조건들에 해당하면 패딩 0, 아니면 헤더 높이만큼(120px) 패딩 부여
    paddingTop: (isHomePage || isBusinessPage || isContactPage || isBackgroundPage || isAdminPage) ? '0' : '120px',
    width: '100%',
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <ScrollToTop />
        {!isAdminPage && <Header />}
        
        <main style={mainStyle}>
          <Routes>
            {/* --- User Routes --- */}
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<Business />} />
            <Route path="/recruit" element={<Recruit />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Legal Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/email-policy" element={<EmailPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Notice Routes */}
            <Route path="/notice" element={<NoticeList />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/notice/write" element={<NoticeWrite />} />
            <Route path="/notice/edit/:id" element={<NoticeWrite />} />

            {/* --- Admin Routes --- */}
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
              <Route path="partner" element={<AdminPartnerList />} />
              <Route path="partner/write" element={<AdminPartnerForm />} />
              <Route path="partner/edit/:id" element={<AdminPartnerForm />} />
              <Route path="inquiry" element={<AdminInquiryList />} />
              <Route path="inquiry/:id" element={<AdminInquiryDetail />} />
            </Route>
          </Routes>
        </main>

        {!isAdminPage && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
