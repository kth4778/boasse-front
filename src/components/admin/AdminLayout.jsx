import React, { useState, useEffect } from 'react';
import { Nav, Container, Card, Form, Button } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBullhorn, FaUserTie, FaBoxOpen, FaHome, FaEnvelope, FaHandshake } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // 컴포넌트 마운트 시 세션 확인
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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

  if (!isAuthenticated) {
    return (
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <Card style={{ width: '100%', maxWidth: '400px', border: 'none', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <Card.Body className="p-5 text-center">
            <h3 className="fw-bold mb-2" style={{ color: '#1e2f23' }}>BOAS-SE</h3>
            <p className="text-muted mb-4 small">관리자 페이지 접근 권한 확인</p>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Control 
                  type="password" 
                  placeholder="비밀번호를 입력하세요" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: '12px 15px', borderRadius: '8px', backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}
                  autoFocus
                />
              </Form.Group>
              <Button 
                type="submit" 
                variant="success" 
                className="w-100 py-2 fw-bold" 
                style={{ borderRadius: '8px', backgroundColor: '#1e2f23', border: 'none' }}
              >
                접속하기
              </Button>
            </Form>
            <div className="mt-4 border-top pt-3">
              <Link to="/" className="text-decoration-none text-secondary small fw-medium">
                <FaHome className="me-1" /> 홈페이지로 돌아가기
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
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
          <Nav.Link as={Link} to="/" className="sidebar-item exit-link" onClick={() => sessionStorage.removeItem('admin_auth')}>
             {/* 로그아웃 처리 위해 onClick 추가 (홈으로 가면 로그아웃 되는 효과) */}
            <span className="sidebar-icon"><FaHome /></span>
            <span className="sidebar-label">사용자 페이지로 (로그아웃)</span>
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