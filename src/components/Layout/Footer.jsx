import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            {/* 회사 로고 및 간단 소개 */}
            <div className="footer-logo-area">
              <h2 className="text-white fw-bold mb-3">BOASSE</h2>
              <p>
                산업전반에 걸쳐 발생하는 각종 미스트, 흄, 분진 등을 
                제거하는 집진기 전문 업체입니다.
              </p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="footer-title">사이트 맵</h4>
            <ul className="footer-list">
              <li><a href="/company/intro" className="footer-link">회사소개</a></li>
              <li><a href="/products/dust" className="footer-link">제품소개</a></li>
              <li><a href="/cases" className="footer-link">설치사례</a></li>
              <li><a href="/support/notice" className="footer-link">고객지원</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="footer-title">고객센터</h4>
            <div className="footer-info">
              <p>
                <strong className="text-white">TEL:</strong> 031-123-4567<br />
                <strong className="text-white">FAX:</strong> 031-123-4568<br />
                <strong className="text-white">EMAIL:</strong> master@boasse.com
              </p>
              <p>
                평일: 09:00 ~ 18:00<br />
                (점심시간 12:00 ~ 13:00)<br />
                주말 및 공휴일 휴무
              </p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="footer-title">회사정보</h4>
            <div className="footer-info">
              <p>
                경기도 화성시 어디로 123번길 45<br />
                대표자: 홍길동<br />
                사업자등록번호: 123-45-67890
              </p>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} BOASSE. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
