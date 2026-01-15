import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  const containerRef = useRef();
  const lastScrollY = useRef(0);

  // 스크롤 감지
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

  // GSAP 애니메이션 (헤더 전체 숨김/표시)
  useGSAP(() => {
    gsap.to(containerRef.current, {
      yPercent: isExpanded ? 0 : -100,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
    });
  }, { scope: containerRef, dependencies: [isExpanded] });

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const headerClass = `header-wrapper ${!isTop ? 'scrolled' : ''}`;

  return (
    <header className={headerClass} ref={containerRef}>
      <Navbar expand={false} className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center logo-container">
            <img 
              src={logo}
              alt="BOAS-SE Logo" 
              className="header-logo"
            />
          </Navbar.Brand>

          <Nav className="ms-auto d-none d-lg-flex flex-row desktop-nav me-4">
            <Nav.Link as={Link} to="/about" className="nav-item-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/business" className="nav-item-custom">Business</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-item-custom">Product</Nav.Link>
            <Nav.Link as={Link} to="/recruit" className="nav-item-custom">Recruit</Nav.Link>
            <Nav.Link as={Link} to="/notice" className="nav-item-custom">Notice</Nav.Link>
          </Nav>

          <div className="menu-trigger visible" onClick={handleShow}>
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