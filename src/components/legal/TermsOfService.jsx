import React from 'react';
import { Container } from 'react-bootstrap';
import './Policy.css';

const TermsOfService = () => {
  return (
    <div className="policy-page">
      <Container>
        <div className="policy-container">
          <h1 className="policy-title">이용약관</h1>
          
          <div className="policy-section">
            <h3>제 1 조 (목적)</h3>
            <p className="policy-content">
              본 약관은 보아스에스이(이하 "회사")가 제공하는 웹사이트 및 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div className="policy-section">
            <h3>제 2 조 (용어의 정의)</h3>
            <p className="policy-content">
              1. "이용자"란 회사의 웹사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
              2. "서비스"란 회사가 홈페이지를 통해 제공하는 정보 제공, 문의하기 등의 일체의 행위를 의미합니다.
            </p>
          </div>

          <div className="policy-section">
            <h3>제 3 조 (약관의 효력 및 변경)</h3>
            <p className="policy-content">
              1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
              2. 회사는 필요하다고 인정되는 경우 관계법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
            </p>
          </div>

          <div className="policy-section">
            <h3>제 4 조 (서비스 이용)</h3>
            <p className="policy-content">
              이용자는 회사가 정한 규정에 따라 서비스를 이용할 수 있으며, 서비스 이용 중 타인의 저작권을 침해하거나 명예를 훼손하는 행위를 해서는 안 됩니다.
            </p>
          </div>

          <div className="policy-date">시행일자: 2026년 1월 1일</div>
        </div>
      </Container>
    </div>
  );
};

export default TermsOfService;
