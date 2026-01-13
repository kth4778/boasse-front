import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logoWhiteImg from '../../assets/logo_white.png';
import logoColorImg from '../../assets/logo_color.png';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // On the home page, change header style after scrolling past the hero section
      if (isHomePage) {
        const threshold = window.innerHeight;
        setScrolled(window.scrollY > threshold);
      }
    };

    // Only add scroll listener on the home page
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    } else {
      // On sub-pages, the header is always in the "scrolled" state
      setScrolled(true);
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);

  // Determine which logo to use
  const logoSrc = !isHomePage || scrolled ? logoColorImg : logoWhiteImg;

  return (
    <header className={`header-wrapper ${!isHomePage || scrolled ? 'scrolled' : ''}`}>
      <Navbar expand="lg" className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img 
              src={logoSrc} 
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
