import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBullhorn, FaUserTie, FaBoxOpen, FaHome, FaEnvelope } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: '대시보드' },
    { path: '/admin/notice', icon: <FaBullhorn />, label: '공지사항 관리' },
    { path: '/admin/recruit', icon: <FaUserTie />, label: '채용공고 관리' },
    { path: '/admin/product', icon: <FaBoxOpen />, label: '제품 관리' },
    { path: '/admin/inquiry', icon: <FaEnvelope />, label: '1:1 문의 관리' },
  ];

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
          <Nav.Link as={Link} to="/" className="sidebar-item exit-link">
            <span className="sidebar-icon"><FaHome /></span>
            <span className="sidebar-label">사용자 페이지로</span>
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