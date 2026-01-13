import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './BoardInquiry.css';

const BoardInquiry = () => {
  // TODO: [DATA] 실제 공지사항 데이터 연동 필요
  const notices = [
    { id: 1, title: '공지사항 게시글 제목이 들어갑니다.', date: '2025.01.01', link: '/notice/1' },
  ];

  return (
    <div className="board-inquiry-wrapper">
      
      {/* 1. 상단: 공지사항 */}
      <section className="notice-section">
        <Container>
          <h3 className="section-title-sm">Notice</h3>
          <div className="simple-notice-list">
            {notices.map((item) => (
              <div key={item.id} className="simple-notice-item">
                <a href={item.link} className="simple-notice-title">· {item.title}</a>
                <span className="simple-notice-date">{item.date}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. 하단: 제품문의 (Dark Section) */}
      <section className="contact-dark-section">
        <div className="contact-bg-pattern"></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="gy-5">
            {/* 좌측: 문의 폼 */}
            <Col lg={6}>
              <h3 className="dark-section-title">Inquiry</h3>
              <form>
                <div className="custom-input-group">
                  <label className="input-label">Name *</label>
                  <input type="text" className="custom-input" placeholder="이름을 입력해 주세요." />
                </div>
                <div className="custom-input-group">
                  <label className="input-label">Email</label>
                  <input type="email" className="custom-input" placeholder="E-mail을 입력해 주세요." />
                </div>
                <div className="custom-input-group" style={{ alignItems: 'flex-start' }}>
                  <label className="input-label" style={{ marginTop: '5px' }}>Message *</label>
                  <textarea 
                    className="custom-input" 
                    rows="3" 
                    placeholder="문의 내용을 입력해 주세요."
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                
                <div className="agree-check">
                  <input type="checkbox" id="agree" className="me-2" />
                  <label htmlFor="agree">개인정보 수집이용에 대한동의 *</label>
                </div>

                <button type="submit" className="submit-btn">신청하기</button>
              </form>
            </Col>

            {/* 우측: 유선상담 정보 */}
            <Col lg={6} className="ps-lg-5">
              <div className="info-group mb-5">
                <span className="info-label">Customer Center</span>
                <div className="info-phone">070-7709-2631</div>
              </div>

              <div className="info-group">
                <span className="info-label">Address</span>
                <p className="info-text mb-1">사무실 : 충청북도 청주시 흥덕구 오송읍 오송생명로 194 7층 702호</p>
                <p className="info-text">공장 : 충북 청주시 흥덕구 월명로 55번길 31</p>
              </div>

              <div className="info-group">
                <span className="info-label">Fax</span>
                <p className="info-text">043-266-2632</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BoardInquiry;
