import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, FaBullhorn, FaUserTie, FaBoxOpen, 
  FaEnvelope, FaHandshake, FaSignOutAlt, FaLeaf
} from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 인증 여부를 초기 렌더링 시점에 한 번만 결정 (Lazy Initialization)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!localStorage.getItem('accessToken');
    } catch (e) {
      return false;
    }
  });

  // 인증 실패 시 리다이렉트
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const menuGroups = [
    {
      category: 'Overview',
      items: [
        { path: '/admin', icon: <FaTachometerAlt />, label: '대시보드' }
      ]
    },
    {
      category: 'Management',
      items: [
        { path: '/admin/notice', icon: <FaBullhorn />, label: '공지사항' },
        { path: '/admin/recruit', icon: <FaUserTie />, label: '채용공고' },
        { path: '/admin/product', icon: <FaBoxOpen />, label: '제품 관리' },
        { path: '/admin/partner', icon: <FaHandshake />, label: '파트너' },
      ]
    },
    {
      category: 'Communication',
      items: [
        { path: '/admin/inquiry', icon: <FaEnvelope />, label: '1:1 문의' },
      ]
    }
  ];

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('accessToken'); // 토큰 삭제
      navigate('/admin/login');
    }
  };

  if (!isAuthenticated) return null;

  const currentTitle = menuGroups
    .flatMap(g => g.items)
    .find(item => item.path === location.pathname)?.label || 'Admin Portal';

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>
            <FaLeaf style={{ color: '#8CC63F' }} />
            <span>BOAS-SE</span> Admin
          </h3>
        </div>
        
        <div className="sidebar-nav">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="nav-group">
              <div className="sidebar-category">{group.category}</div>
              <Nav className="flex-column">
                {group.items.map((item) => (
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
              </Nav>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-top-header">
          <h2 className="page-title">{currentTitle}</h2>
          
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <div className="profile-info">
              <span className="profile-name">Super Admin</span>
              <span className="profile-role">Master Manager</span>
            </div>
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
