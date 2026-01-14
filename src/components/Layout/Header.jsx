import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import logoImage from '../../assets/Logo_image.png';
import logoText from '../../assets/Logo_text.png';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true); // true: 확장(Up), false: 축소(Down)
  const [isTop, setIsTop] = useState(true); // 최상단 여부 (배경색 제어용)
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  const containerRef = useRef();
  const logoTextRef = useRef();
  const navItemsRef = useRef([]);
  const lastScrollY = useRef(0);

  // 스크롤 감지 로직
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 최상단 여부 감지
      setIsTop(currentScrollY < 50);

      // 스크롤 방향 감지 (방향이 바뀔 때만 상태 업데이트)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // 내리는 중 (Down) -> 축소
        setIsExpanded(false);
      } else if (currentScrollY < lastScrollY.current) {
        // 올리는 중 (Up) -> 확장
        setIsExpanded(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP 애니메이션
  useGSAP(() => {
    const tl = gsap.timeline();

    if (isExpanded) {
      // 확장 상태 (나타나기)
      // 1. 레이아웃 공간 확보 (메뉴 항목용)
      gsap.set('.nav-item-custom', { display: 'block', opacity: 0, y: -20 });
      
      // 2. 로고 텍스트 애니메이션: 오른쪽 -> 왼쪽으로 등장
      tl.fromTo(logoTextRef.current,
        { x: 20, y: 0, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        }
      );
      
      // 3. 메뉴 항목들: 위 -> 아래로 등장 (유지)
      tl.to('.nav-item-custom', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out'
      }, "<0.1");
      
    } else {
      // 축소 상태 (사라지기)
      // 1. 메뉴 항목들: 위로 사라짐 (유지)
      tl.to('.nav-item-custom', {
        y: -20,
        opacity: 0,
        stagger: { amount: 0.1, from: "end" },
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set('.nav-item-custom', { display: 'none' })
      });

      // 2. 로고 텍스트: 다시 오른쪽으로 사라짐
      tl.to(logoTextRef.current, {
        x: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, "<0.1");
    }

  }, { scope: containerRef, dependencies: [isExpanded] });

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  // 헤더 스타일 클래스: 최상단이면 투명, 아니면 흰색 배경
  // isExpanded와 무관하게 배경색은 스크롤 위치(isTop)에 따라 결정하거나,
  // 디자인 의도에 따라 항상 흰색일 수도 있음. 여기서는 기존 로직(scrolled)을 isTop으로 대체하여 적용.
  const headerClass = `header-wrapper ${!isTop ? 'scrolled' : ''}`;

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
            {/* 로고 텍스트: 애니메이션 타겟 */}
            <div className="logo-text-wrapper overflow-hidden">
               <img 
                ref={logoTextRef}
                src={logoText} 
                alt="Logo Text" 
                className="header-logo-text ms-2" 
                style={{ opacity: 1, transform: 'translate(0,0)' }} // 초기값 설정
              />
            </div>
          </Navbar.Brand>

          {/* 데스크탑 메뉴 */}
          <Nav className="mx-auto d-none d-lg-flex flex-row desktop-nav">
            <Nav.Link as={Link} to="/about" className="nav-item-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/business" className="nav-item-custom">Business</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-item-custom">Product</Nav.Link>
            <Nav.Link as={Link} to="/recruit" className="nav-item-custom">Recruit</Nav.Link>
            <Nav.Link as={Link} to="/notice" className="nav-item-custom">Notice</Nav.Link>
          </Nav>

          {/* 상세 메뉴 아이콘 (항상 보임) */}
          <div className="menu-trigger visible" onClick={handleShow}>
            {/* 배경이 항상 투명하므로 아이콘 색상을 흰색으로 고정하거나 가독성 높은 색상으로 설정 */}
            <FaBars size={24} color="#fff" />
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
