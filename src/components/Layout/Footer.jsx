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
                (주) COMPANY &nbsp; 대표. NAME &nbsp; 사업자등록번호. 000-00-00000 &nbsp; 주소. ADDRESS HERE
              </p>
              <p className="mb-3">
                T. 000-000-0000 &nbsp; E-mail. email@example.com
              </p>
            </div>

            <div className="footer-copyright">
              Copyright © {new Date().getFullYear()} COMPANY NAME All Rights Reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
