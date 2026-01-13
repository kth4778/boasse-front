import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoWhiteImg from '../../assets/logo_white.png'; // 투명 헤더용 (흰색 글씨)
import logoColorImg from '../../assets/logo_color.png'; // TODO: 검은색 글씨 로고 파일명 확인 및 추가 필요
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // HeroSlider 영역(100vh)을 완전히 벗어날 때까지 투명 유지
      const threshold = window.innerHeight;
      
      if (window.scrollY > threshold) {
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
      <Navbar expand="lg" className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {/* 스크롤 상태에 따라 이미지 교체: 초록색은 유지하고 글씨색만 변경됨 */}
            <img 
              src={scrolled ? logoColorImg : logoWhiteImg} 
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
