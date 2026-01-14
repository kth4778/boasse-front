import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import './BoardInquiry.css';

const BoardInquiry = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchLatestNotices = async () => {
      try {
        const response = await noticeApi.getNotices(1, 3);
        if (response.data.success) {
          setNotices(response.data.data.notices);
        }
      } catch (error) {
        console.error('Failed to fetch notices for home:', error);
        // API call failed, no mock data fallback
        setNotices([]);
      }
    };
    fetchLatestNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Already formatted or invalid
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="board-inquiry-wrapper">
      
      {/* 1. 상단: 공지사항 */}
      <section className="notice-section">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h3 className="section-title-sm mb-0">Notice</h3>
            <Link to="/notice" className="text-muted text-decoration-none">more +</Link>
          </div>
          <div className="simple-notice-list">
            {notices.map((item) => (
              <div key={item.id} className="simple-notice-item">
                <Link to={`/notice/${item.id}`} className="simple-notice-title">· {item.title}</Link>
                <span className="simple-notice-date">{formatDate(item.createdAt)}</span>
              </div>
            ))}
            {notices.length === 0 && (
              <p className="py-4 text-center text-muted">등록된 공지사항이 없습니다.</p>
            )}
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
