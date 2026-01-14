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
  const [deletePassword, setDeletePassword] = useState('');
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
        // API call failed, no mock data fallback
        setNotice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!deletePassword) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }

    setDeleting(true);
    try {
      const response = await noticeApi.deleteNotice(id, deletePassword);
      if (response.data.success) {
        alert('삭제되었습니다.');
        navigate('/notice');
      }
    } catch (error) {
      console.error('Failed to delete notice:', error);
      alert('비밀번호가 틀렸거나 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeletePassword('');
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
        </Container>
      </section>

      <Container className="notice-content py-5">
        <Card className="notice-detail-card border-0 shadow-sm">
          <Card.Header className="bg-white border-bottom-2 py-4">
            <h3 className="detail-title mb-3">{notice.title}</h3>
            <div className="detail-info d-flex text-muted font-size-sm">
              <span className="me-4"><strong>작성자</strong> {notice.author}</span>
              <span className="me-4"><strong>작성일</strong> {formatDate(notice.createdAt)}</span>
              <span><strong>조회수</strong> {notice.viewCount}</span>
            </div>
          </Card.Header>
          
          <Card.Body className="py-5 detail-body">
            <div 
              className="content-area"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          </Card.Body>

          {notice.attachments && notice.attachments.length > 0 && (
            <Card.Footer className="bg-light border-top-0 py-4">
              <h5 className="mb-3" style={{ fontSize: '1rem', fontWeight: '700' }}>첨부파일</h5>
              <ListGroup variant="flush" className="bg-transparent">
                {notice.attachments.map((file) => (
                  <ListGroup.Item key={file.id} className="bg-transparent px-0 d-flex justify-content-between align-items-center">
                    <span className="text-muted">
                      {file.originalName} ({formatSize(file.size)})
                    </span>
                    <Button variant="outline-secondary" size="sm" href={file.url} download>
                      <FaDownload className="me-1" /> 다운로드
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Footer>
          )}
        </Card>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-dark" onClick={() => navigate('/notice')}>
            <FaList className="me-1" /> 목록으로
          </Button>
          <div className="admin-btns">
            <Button 
              variant="outline-primary" 
              className="me-2"
              onClick={() => navigate(`/notice/edit/${notice.id}`)}
            >
              <FaEdit className="me-1" /> 수정
            </Button>
            <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
              <FaTrash className="me-1" /> 삭제
            </Button>
          </div>
        </div>
      </Container>

      {/* 삭제 확인 모달 */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>게시글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 이 게시글을 삭제하시겠습니까?<br />삭제를 위해 관리자 비밀번호를 입력해 주세요.</p>
          <Form.Group>
            <Form.Control 
              type="password" 
              placeholder="비밀번호 입력" 
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>취소</Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? '삭제 중...' : '삭제하기'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NoticeDetail;