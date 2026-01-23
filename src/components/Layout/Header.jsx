import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import logo from '../../assets/logo.png';
import './Header.css';

/*
 * [헤더 컴포넌트]
 * 사이트 상단 네비게이션 바를 구성합니다.
 * 스크롤 방향에 따라 헤더가 숨겨지거나 나타나는 인터랙션(Scroll-aware Header)과
 * 현재 페이지 위치에 따른 스타일 변화(투명/불투명)를 처리합니다.
 */
const Header = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);
  
  const containerRef = useRef();
  const lastScrollY = useRef(0);

  // 스크롤 이벤트 감지하여 헤더 상태 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTop(currentScrollY < 50); // 최상단 여부 확인

      // 스크롤 방향에 따라 헤더 표시/숨김 처리
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsExpanded(false); // 아래로 스크롤 시 숨김
      } else if (currentScrollY < lastScrollY.current) {
        setIsExpanded(true); // 위로 스크롤 시 표시
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP 애니메이션: 헤더 숨김/표시 부드러운 전환
  useGSAP(() => {
    gsap.to(containerRef.current, {
      yPercent: isExpanded ? 0 : -100,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
    });
  }, { scope: containerRef, dependencies: [isExpanded] });

  // 스타일 클래스 동적 할당 (메인 페이지가 아니거나 스크롤 시 배경색 변경)
  const headerClass = `header-wrapper ${(!isTop || location.pathname !== '/') ? 'scrolled' : ''}`;

  return (
    <header className={headerClass} ref={containerRef}>
      <Navbar expand={false} className="py-0">
        <Container fluid className="px-lg-5 px-3">
          {/* 로고 영역 */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center logo-container">
            <img 
              src={logo}
              alt="BOAS-SE Logo" 
              className="header-logo"
            />
          </Navbar.Brand>

          {/* 데스크톱 네비게이션 메뉴 */}
          <Nav className="ms-auto d-flex flex-row desktop-nav align-items-center">
            <Nav.Link as={Link} to="/about" className="nav-item-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/business" className="nav-item-custom">Business</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-item-custom">Product</Nav.Link>
            <Nav.Link as={Link} to="/recruit" className="nav-item-custom">Recruit</Nav.Link>
            <Nav.Link as={Link} to="/notice" className="nav-item-custom">Notice</Nav.Link>
            
            {/* 문의하기 버튼 (강조 스타일) */}
            <Link to="/contact" className="contact-btn">
              CONTACT US
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
