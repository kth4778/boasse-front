import React from 'react';
import { Container } from 'react-bootstrap';
import './Policy.css';

/*
 * [개인정보 처리방침 페이지]
 * 회사의 개인정보 수집 및 이용, 보유 기간 등에 대한 정책을 사용자에게 안내하는 페이지입니다.
 */
const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <Container>
        <div className="policy-container">
          <h1 className="policy-title">개인정보 처리방침</h1>
          
          <div className="policy-section">
            <p className="policy-content">
              보아스에스이(이하 '회사')는 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
              회사는 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
            </p>
          </div>

          <div className="policy-section">
            <h3>1. 수집하는 개인정보 항목</h3>
            <p className="policy-content">
              회사는 문의하기, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
              - 수집항목 : 이름, 이메일, 연락처, 회사명, 문의내용 등
              - 개인정보 수집방법 : 홈페이지(문의하기 폼)
            </p>
          </div>

          <div className="policy-section">
            <h3>2. 개인정보의 수집 및 이용목적</h3>
            <p className="policy-content">
              회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
              - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
              - 고객 문의 및 상담 처리, 불만 처리 등 민원처리, 고지사항 전달
            </p>
          </div>

          <div className="policy-section">
            <h3>3. 개인정보의 보유 및 이용기간</h3>
            <p className="policy-content">
              원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
            </p>
          </div>

          <div className="policy-date">시행일자: 2026년 1월 1일</div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;