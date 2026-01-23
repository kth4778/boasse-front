import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBullhorn, FaUserTie, FaBoxOpen, FaHome, FaEnvelope, FaHandshake } from 'react-icons/fa';
import authApi from '../../api/authApi';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/admin/login', { replace: true });
        return;
      }
      
      // 토큰이 있으면 일단 인증된 것으로 간주하고 렌더링 (유효성 검사는 API 호출 시 401로 처리됨)
      // 선택 사항: 페이지 진입 시마다 토큰 유효성 검사 API 호출
      try {
        // await authApi.verifyToken(); // 필요 시 주석 해제하여 엄격한 검증 활성화
        setIsAuthenticated(true);
      } catch (error) {
        // 토큰이 만료되었거나 유효하지 않음
        localStorage.removeItem('accessToken');
        navigate('/admin/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  const menuItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: '대시보드' },
    { path: '/admin/notice', icon: <FaBullhorn />, label: '공지사항 관리' },
    { path: '/admin/recruit', icon: <FaUserTie />, label: '채용공고 관리' },
    { path: '/admin/product', icon: <FaBoxOpen />, label: '제품 관리' },
    { path: '/admin/partner', icon: <FaHandshake />, label: '파트너 관리' },
    { path: '/admin/inquiry', icon: <FaEnvelope />, label: '1:1 문의 관리' },
  ];

  // 인증 체크 전에는 아무것도 렌더링하지 않음 (깜빡임 방지)
  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
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
          <Nav.Link as={Link} to="/" className="sidebar-item exit-link" onClick={handleLogout}>
            <span className="sidebar-icon"><FaHome /></span>
            <span className="sidebar-label">로그아웃 (홈으로)</span>
          </Nav.Link>
        </Nav>
      </aside>

      {/* Main Content Area */}
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