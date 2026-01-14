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

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const mainStyle = {
    minHeight: '80vh',
    paddingTop: isHomePage ? '0' : '120px',
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
