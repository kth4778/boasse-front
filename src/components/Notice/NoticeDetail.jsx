import React, { useState, useEffect } from 'react';
import { Container, Button, Card, ListGroup, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import { FaDownload, FaList, FaEdit, FaTrash } from 'react-icons/fa';
import './Notice.css';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 삭제 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await noticeApi.getNoticeDetail(id);
        if (response.data.success) {
          setNotice(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch notice detail:', error);
        setNotice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await noticeApi.deleteNotice(id);
      if (response.data.success) {
        alert('삭제되었습니다.');
        navigate('/notice');
      }
    } catch (error) {
      console.error('Failed to delete notice:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) return <div className="text-center py-5">로딩 중...</div>;
  if (!notice) return <div className="text-center py-5">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="notice-page">
      <section className="sub-header">
        <Container>
          <h2 className="sub-title-main">Notice</h2>
          <p className="sub-title-sub">공지사항 상세 보기</p>
        </Container>
      </section>

      <Container className="notice-content py-5">
        <div className="notice-detail-container">
          {/* 상단 헤더 영역 */}
          <div className="detail-header">
            <h3 className="detail-title">{notice.title}</h3>
            <div className="detail-info-bar">
              <div className="detail-info-item"><strong>작성자</strong> {notice.author}</div>
              <div className="detail-info-item"><strong>작성일</strong> {formatDate(notice.createdAt)}</div>
              <div className="detail-info-item"><strong>조회수</strong> {notice.viewCount}</div>
            </div>
          </div>
          
          {/* 본문 내용 영역 */}
          <div className="detail-body">
            <div 
              className="content-area"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          </div>

          {/* 첨부파일 영역 */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="detail-attachments">
              <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e2f23' }}>
                📎 Attached Files ({notice.attachments.length})
              </h5>
              <div className="attachment-list">
                {notice.attachments.map((file) => (
                  <div key={file.id} className="attachment-card">
                    <span className="file-name" title={file.originalName}>
                      {file.originalName} <small className="text-muted ms-1">({formatSize(file.size)})</small>
                    </span>
                    <a href={file.url} download className="download-btn-sm">
                      DOWNLOAD →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 영역 */}
        <div className="d-flex justify-content-center align-items-center notice-footer-btns">
          <Button variant="outline-secondary" className="btn-list px-5" onClick={() => navigate('/notice')}>
            <FaList className="me-2" /> 목록으로
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NoticeDetail;