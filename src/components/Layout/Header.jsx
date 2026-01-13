import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 시 헤더 스타일 변경을 위한 이펙트
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <Navbar expand="lg" className="py-3">
        <Container>
          {/* 로고 영역 */}
          <Navbar.Brand href="/">
             {/* 임시 로고 텍스트 (추후 이미지로 교체) */}
            <span className="fw-bold text-primary-custom" style={{ fontSize: '1.5rem' }}>
              BOASSE
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            {/* 메인 메뉴 (GNB) */}
            <Nav className="mx-auto">
              <NavDropdown title="회사소개" id="nav-company">
                <NavDropdown.Item href="/company/intro">인사말</NavDropdown.Item>
                <NavDropdown.Item href="/company/vision">사업영역</NavDropdown.Item>
                <NavDropdown.Item href="/company/location">오시는 길</NavDropdown.Item>
                <NavDropdown.Item href="/company/contact">Contact Us</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="제품소개" id="nav-products">
                <NavDropdown.Item href="/products/dust-collector">집진기</NavDropdown.Item>
                <NavDropdown.Item href="/products/mist">오일미스트</NavDropdown.Item>
                <NavDropdown.Item href="/products/smell">냄새제거</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/cases">설치사례</Nav.Link>

              <NavDropdown title="고객지원" id="nav-support">
                <NavDropdown.Item href="/support/notice">공지사항</NavDropdown.Item>
                <NavDropdown.Item href="/support/archive">기술자료실</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* 유틸리티 메뉴 (우측) */}
            <div className="util-menu mt-3 mt-lg-0">
              <a href="#search" className="util-link">
                <FaSearch size={18} />
              </a>
              <div className="d-flex gap-2">
                <a href="/login" className="util-link">로그인</a>
                <span style={{color: '#ddd'}}>|</span>
                <a href="/register" className="util-link">회원가입</a>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
