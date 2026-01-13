import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoImg from '../../assets/logo_white.png'; // TODO: 경로 확인
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <Container>
        <Row className="align-items-center">
          <Col lg={3} className="text-center text-lg-start mb-4 mb-lg-0">
            {/* 푸터 로고 이미지 적용 */}
            <div className="footer-logo-box">
              <img src={logoImg} alt="Footer Logo" className="footer-logo-img" />
            </div>
          </Col>

          <Col lg={9} className="footer-info-col">
            <div className="footer-links mb-3">
              <a href="/#">개인정보 처리방침</a>
              <span className="divider">|</span>
              <a href="/#">이메일무단수집거부</a>
              <span className="divider">|</span>
              <a href="/#">이용약관</a>
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
