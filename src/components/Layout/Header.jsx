import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import logoWhiteImg from '../../assets/logo_white.png'; // 투명 헤더용 (흰색 글씨)
import logoColorImg from '../../assets/logo_color.png'; 
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setScrolled(true);
        return;
      }

      // HeroSlider 영역(100vh)을 완전히 벗어날 때까지 투명 유지
      const threshold = window.innerHeight;
      
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // 초기 상태 동기화 및 이벤트 등록
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <header className={`header-wrapper ${scrolled || !isHome ? 'scrolled' : ''}`}>
      <Navbar expand="lg" className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img 
              src={scrolled || !isHome ? logoColorImg : logoWhiteImg} 
              alt="Company Logo" 
              className="header-logo" 
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/business">Business</Nav.Link>
              <Nav.Link as={Link} to="/product">Product</Nav.Link>
              <Nav.Link as={Link} to="/recruit">Recruit</Nav.Link>
              <Nav.Link as={Link} to="/notice">Notice</Nav.Link>
            </Nav>

            <div className="util-menu mt-3 mt-lg-0">
              <FaSearch size={18} className="search-icon" />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
