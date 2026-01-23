import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBullhorn, FaUserTie, FaBoxOpen, FaHome, FaEnvelope, FaHandshake } from 'react-icons/fa';
import authApi from '../../api/authApi';
import './AdminLayout.css';

/*
 * [관리자 레이아웃 컴포넌트]
 * 관리자 페이지의 공통 레이아웃을 정의합니다.
 * - 로그인 인증 처리 (SessionStorage 기반 간단한 인증)
 * - 사이드바 네비게이션
 * - 메인 콘텐츠 영역 (Outlet)
 */
const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 관리자 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (password === adminPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  const menuItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: '대시보드' },
    { path: '/admin/notice', icon: <FaBullhorn />, label: '공지사항 관리' },
    { path: '/admin/recruit', icon: <FaUserTie />, label: '채용공고 관리' },
    { path: '/admin/product', icon: <FaBoxOpen />, label: '제품 관리' },
    { path: '/admin/partner', icon: <FaHandshake />, label: '파트너 관리' },
    { path: '/admin/inquiry', icon: <FaEnvelope />, label: '1:1 문의 관리' },
  ];

  // 인증되지 않은 경우 로그인 화면 표시
  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="admin-wrapper">
      {/* 사이드바 영역 */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>BOAS-SE Admin</h3>
        </div>
        <Nav className="flex-column sidebar-nav">
          {menuItems.map((item) => (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Nav.Link>
          ))}
          <div className="sidebar-divider"></div>
          <Nav.Link as={Link} to="/" className="sidebar-item exit-link" onClick={() => sessionStorage.removeItem('admin_auth')}>
            <span className="sidebar-icon"><FaHome /></span>
            <span className="sidebar-label">로그아웃 (홈으로)</span>
          </Nav.Link>
        </Nav>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="admin-main">
        <header className="admin-top-header">
          <h2 className="page-title">
            {menuItems.find(item => item.path === location.pathname)?.label || '관리자 설정'}
          </h2>
          <div className="admin-user-info">
            <span>관리자님, 환영합니다.</span>
          </div>
        </header>
        <div className="admin-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
