import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import noticeApi from '../../../api/noticeApi';

const AdminNoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 삭제 확인 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async (page = 1) => {
    setLoading(true);
    try {
      const response = await noticeApi.getNotices(page, 10);
      if (response.data.success) {
        setNotices(response.data.data.notices);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error('공지사항을 불러오는 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (notice) => {
    setSelectedNotice(notice);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await noticeApi.deleteNotice(selectedNotice.id);
      if (response.data.success) {
        alert('삭제되었습니다.');
        fetchNotices();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">공지사항 관리</h4>
        <Button 
          variant="success" 
          className="d-flex align-items-center"
          onClick={() => navigate('/admin/notice/write')}
        >
          <FaPlus className="me-2" /> 새 공지 작성
        </Button>
      </div>

      <Table responsive hover className="admin-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>등록일</th>
            <th className="text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-5 text-muted">데이터를 불러오는 중입니다...</td>
            </tr>
          ) : notices.length > 0 ? (
            notices.map((notice) => (
              <tr key={notice.id}>
                <td>{notice.id}</td>
                <td className="fw-bold">{notice.title}</td>
                <td>{notice.author}</td>
                <td>{notice.viewCount}</td>
                <td>{formatDate(notice.createdAt)}</td>
                <td className="text-center">
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => window.open(`/notice/${notice.id}`, '_blank')}
                    title="미리보기"
                  >
                    <FaEye />
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => navigate(`/admin/notice/edit/${notice.id}`)}
                  >
                    <FaEdit /> 수정
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteClick(notice)}
                  >
                    <FaTrash /> 삭제
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-5 text-muted">등록된 공지사항이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* 삭제 확인 모달 */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>공지사항 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 '<strong>{selectedNotice?.title}</strong>' 게시글을 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>취소</Button>
          <Button variant="danger" onClick={confirmDelete}>삭제하기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminNoticeList;