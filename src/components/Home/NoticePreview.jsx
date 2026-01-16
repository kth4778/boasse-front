import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noticeApi from '../../api/noticeApi'; // 공지사항 API (실제 연동)
import './NoticePreview.css';

const NoticePreview = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchLatestNotices = async () => {
      try {
        // 최근 3개만 조회 (API가 지원한다면 limit=3, 아니면 10개 받아와서 slice)
        const response = await noticeApi.getNotices(1, 3);
        if (response.data.success) {
          setNotices(response.data.data.notices.slice(0, 3));
        }
      } catch (error) {
        console.error('공지사항 로딩 실패:', error);
      }
    };
    fetchLatestNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="notice-preview-section">
      {/* 장식 요소: 반 잘린 둥근 박스 */}
      <div className="deco-box-half"></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h4 className="notice-sub-title">NEWS & NOTICE</h4>
            <h2 className="notice-main-title">보아스에스이 소식</h2>
          </div>
          <Link to="/notice" className="notice-more-btn">
            더보기 +
          </Link>
        </div>

        <Row className="gy-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Col lg={4} key={notice.id}>
                <Link to={`/notice/${notice.id}`} className="notice-card">
                  <div className="notice-card-body">
                    <span className="notice-badge">공지</span>
                    <h3 className="notice-card-title">{notice.title}</h3>
                    <p className="notice-card-date">{formatDate(notice.createdAt)}</p>
                    <div className="notice-arrow">→</div>
                  </div>
                </Link>
              </Col>
            ))
          ) : (
            <div className="text-center py-5 text-muted">등록된 공지사항이 없습니다.</div>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default NoticePreview;
