import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import './NoticePreview.css';

/*
 * [공지사항 미리보기 섹션]
 * 메인 페이지에 최신 공지사항 3개를 요약하여 보여주는 섹션입니다.
 * API를 통해 데이터를 가져오며, 로딩 상태와 데이터 유무에 따른 UI 처리가 포함되어 있습니다.
 */
const NoticePreview = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 최신 공지사항 데이터 가져오기
  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await noticeApi.getNotices(1, 3); // 1페이지, 3개 요청
        if (response.data.success) {
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

  // 날짜 포맷 변환 함수 (YYYY.MM.DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="notice-preview-section">
      <div className="notice-preview-wrapper">
        <div className="notice-container">
          <div className="notice-header">
            <div>
              <p style={{ color: '#4caf50', fontWeight: '600', marginBottom: '10px', letterSpacing: '1px' }}>NEWS</p>
              <h2 style={{ color: '#333' }}>공지사항</h2>
            </div>
            <Link to="/notice" className="view-all" style={{ color: '#666' }}>
              전체보기 +
            </Link>
          </div>

          <div className="notice-grid">
            {loading ? (
              // 로딩 중일 때 표시할 스켈레톤 UI
              [1, 2, 3].map((n) => (
                <div key={n} className="notice-card" style={{ opacity: 0.5, backgroundColor: '#f9f9f9' }}>
                  <div className="notice-tag" style={{ width: '60px', height: '20px', backgroundColor: '#eee' }}></div>
                  <div style={{ width: '100%', height: '24px', backgroundColor: '#eee', marginBottom: '10px' }}></div>
                  <div style={{ width: '80%', height: '24px', backgroundColor: '#eee' }}></div>
                </div>
              ))
            ) : notices.length > 0 ? (
              // 공지사항 목록 표시
              notices.map((notice) => (
                <Link to={`/notice/${notice.id}`} key={notice.id} className="notice-card" style={{ backgroundColor: '#f9f9f9', boxShadow: 'none', border: '1px solid #eee' }}>
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
              // 데이터가 없을 경우
              <div className="w-100 text-center py-5" style={{ color: '#999', gridColumn: '1 / -1' }}>
                현재 등록된 공지사항이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticePreview;
