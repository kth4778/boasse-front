import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/Logo_image.png';
import logoText from '../../assets/Logo_text_white.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <Container>
        <Row className="align-items-center">
          <Col lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
            {/* 푸터 로고 심볼 및 텍스트 적용 */}
            <div className="footer-logo-box d-flex align-items-center">
              <img src={logoImg} alt="Footer Logo Symbol" className="footer-logo-img" />
              <img src={logoText} alt="Footer Logo Text" className="footer-logo-text ms-2" />
            </div>
          </Col>

          <Col lg={8} className="footer-info-col">
            <div className="footer-links mb-3">
              <Link to="/privacy">개인정보 처리방침</Link>
              <span className="divider">|</span>
              <Link to="/email-policy">이메일무단수집거부</Link>
              <span className="divider">|</span>
              <Link to="/terms">이용약관</Link>
            </div>

            <div className="footer-details">
              <p className="mb-1">
                BOAS-SE &nbsp; 대표이사. 이병주 &nbsp;
              </p>
              <p className="mb-1">
                사무실. 충청북도 청주시 흥덕구 오송읍 오송생명로 194 7층 702호 BOAS-SE
              </p>
              <p className="mb-1">
                공장. 충북 청주시 흥덕구 월명로 55번길 31
              </p>
              <p className="mb-3">
                TEL. 070-7709-2631 &nbsp; FAX. 043-266-2632
              </p>
            </div>

            <div className="footer-copyright">
              Copyright © {new Date().getFullYear()} BOAS-SE All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
