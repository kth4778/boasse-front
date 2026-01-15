import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import logoImage from '../../assets/Logo_image.png';
import logoTextWhite from '../../assets/Logo_text_white.png';
import logoTextBlack from '../../assets/Logo_text_black.png';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isDark, setIsDark] = useState(false); // false: 화이트 테마(글자/로고가 흰색), true: 블랙 테마
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  const containerRef = useRef();
  const logoTextRef = useRef();
  const lastScrollY = useRef(0);

  // 스크롤 감지 및 테마 변경 로직
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTop(currentScrollY < 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsExpanded(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsExpanded(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP: 섹션별 헤더 테마 전환 (ScrollTrigger)
  useGSAP(() => {
    ScrollTrigger.getAll().forEach(t => {
      if (t.vars.id?.includes('header-theme')) t.kill();
    });

    if (location.pathname !== '/') {
      setIsDark(true); // 서브페이지는 배경이 흰색이므로 블랙 테마 유지
      return;
    } else {
      setIsDark(false); // 홈페이지 기본값은 화이트 테마
    }

    // 오직 Product 확장 영역(흰색 배경)에서만 블랙 테마로 전환
    ScrollTrigger.create({
      id: 'header-theme-trigger',
      trigger: '.product-expand-wrapper',
      start: 'top 80px',
      end: 'bottom 80px',
      onEnter: () => setIsDark(true),
      onEnterBack: () => setIsDark(true),
      onLeave: () => setIsDark(false),
      onLeaveBack: () => setIsDark(false),
    });

  }, { scope: containerRef, dependencies: [location.pathname] });

  // GSAP 애니메이션 (확장/축소)
  useGSAP(() => {
    const tl = gsap.timeline();
    if (isExpanded) {
      gsap.set('.nav-item-custom', { display: 'block', opacity: 0, y: -20 });
      // 2. 로고 텍스트 애니메이션: 왼쪽 -> 오른쪽으로 등장
      tl.fromTo(logoTextRef.current,
        { x: -20, opacity: 0 }, // 수정: x: 20 -> x: -20 (왼쪽에서 시작)
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        }
      );
      tl.to('.nav-item-custom', {
        y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'power3.out'
      }, "<0.1");
    } else {
      tl.to('.nav-item-custom', {
        y: -20, opacity: 0, stagger: { amount: 0.1, from: "end" }, duration: 0.3, ease: 'power2.in',
        onComplete: () => gsap.set('.nav-item-custom', { display: 'none' })
      });
      // 2. 로고 텍스트: 다시 왼쪽으로 사라짐
      tl.to(logoTextRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, "<0.1");
    }
  }, { scope: containerRef, dependencies: [isExpanded] });

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const headerClass = `header-wrapper ${!isTop ? 'scrolled' : ''} ${isDark ? 'header-dark' : ''}`;

  return (
    <header className={headerClass} ref={containerRef}>
      <Navbar expand={false} className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center logo-container">
            <img 
              src={logoImage} 
              alt="Logo Symbol" 
              className="header-logo-symbol" 
            />
            <div className="logo-text-wrapper overflow-hidden">
               <img 
                ref={logoTextRef}
                src={isDark ? logoTextBlack : logoTextWhite} 
                alt="Logo Text" 
                className="header-logo-text ms-2" 
                style={{ opacity: 1, transform: 'translate(0,0)' }}
              />
            </div>
          </Navbar.Brand>

          <Nav className="ms-auto d-none d-lg-flex flex-row desktop-nav me-4">
            <Nav.Link as={Link} to="/about" className="nav-item-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/business" className="nav-item-custom">Business</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-item-custom">Product</Nav.Link>
            <Nav.Link as={Link} to="/recruit" className="nav-item-custom">Recruit</Nav.Link>
            <Nav.Link as={Link} to="/notice" className="nav-item-custom">Notice</Nav.Link>
          </Nav>

          <div className="menu-trigger visible" onClick={handleShow}>
            <FaBars size={24} color={isDark ? "#000" : "#fff"} />
          </div>

          <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end" className="header-offcanvas">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
                <Nav.Link as={Link} to="/business" onClick={handleClose}>Business</Nav.Link>
                <Nav.Link as={Link} to="/product" onClick={handleClose}>Product</Nav.Link>
                <Nav.Link as={Link} to="/recruit" onClick={handleClose}>Recruit</Nav.Link>
                <Nav.Link as={Link} to="/notice" onClick={handleClose}>Notice</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;