import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import './CasesCarousel.css';

const CasesCarousel = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await noticeApi.getNotices(1, 3);
        if (response.data.success) {
          // 서버 응답 구조: response.data.data.notices
          setNotices(response.data.data.notices.slice(0, 3));
        }
      } catch (error) {
        console.error('공지사항을 불러오는 중 오류가 발생했습니다:', error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="cases-section">
      <div className="notice-container">
        <div className="notice-header">
          <div>
            <p style={{ color: '#8CC63F', fontWeight: '600', marginBottom: '10px', letterSpacing: '1px' }}>NEWS</p>
            <h2>공지사항</h2>
          </div>
          <Link to="/notice" className="view-all">
            전체보기 +
          </Link>
        </div>

        <div className="notice-grid">
          {loading ? (
            // 로딩 중 스켈레톤 UI 느낌의 표시
            [1, 2, 3].map((n) => (
              <div key={n} className="notice-card" style={{ opacity: 0.5 }}>
                <div className="notice-tag" style={{ width: '60px', height: '20px', backgroundColor: '#eee' }}></div>
                <div style={{ width: '100%', height: '24px', backgroundColor: '#eee', marginBottom: '10px' }}></div>
                <div style={{ width: '80%', height: '24px', backgroundColor: '#eee' }}></div>
              </div>
            ))
          ) : notices.length > 0 ? (
            notices.map((notice) => (
              <Link to={`/notice/${notice.id}`} key={notice.id} className="notice-card">
                <div>
                  <span className="notice-tag">{notice.category || 'NOTICE'}</span>
                  <h3 className="notice-title">{notice.title}</h3>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="notice-date">{formatDate(notice.createdAt)}</span>
                  <span className="notice-more">자세히 보기 →</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-100 text-center py-5" style={{ color: 'rgba(255,255,255,0.6)', gridColumn: '1 / -1' }}>
              현재 등록된 공지사항이 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CasesCarousel;