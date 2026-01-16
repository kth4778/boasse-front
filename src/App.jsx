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

<ErrorBoundary>
  <div className="App">
    <ScrollToTop />
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
          <Route path="/business" element={<Business />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
            
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
        {!isAdminPage && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
