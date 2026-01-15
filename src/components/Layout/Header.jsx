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

  const headerClass = `header-wrapper ${(!isTop || location.pathname !== '/') ? 'scrolled' : ''}`;

  return (
    <header className={headerClass} ref={containerRef}>
      <Navbar expand={false} className="py-0">
        <Container fluid className="px-lg-5">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center logo-container">
            <img 
              src={logo}
              alt="BOAS-SE Logo" 
              className="header-logo"
            />
          </Navbar.Brand>

          <Nav className="ms-auto d-flex flex-row desktop-nav align-items-center">
            <Nav.Link as={Link} to="/about" className="nav-item-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/business" className="nav-item-custom">Business</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-item-custom">Product</Nav.Link>
            <Nav.Link as={Link} to="/recruit" className="nav-item-custom">Recruit</Nav.Link>
            <Nav.Link as={Link} to="/notice" className="nav-item-custom">Notice</Nav.Link>
            
            {/* CONTACT US 버튼 */}
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