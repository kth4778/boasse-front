import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import recruitApi from '../../../api/recruitApi';

/*
 * [관리자 채용 공고 관리 컴포넌트]
 * 현재 진행 중인 채용 공고 목록을 확인하고 관리(수정, 삭제)합니다.
 */
const AdminRecruitList = () => {
  const [recruits, setRecruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchRecruits();
  }, []);

  const fetchRecruits = async () => {
    setLoading(true);
    try {
      const response = await recruitApi.getRecruits();
      if (response.data.success) {
        setRecruits(response.data.data);
      }
    } catch (error) {
      console.error('채용 공고를 불러오는 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await recruitApi.deleteRecruit(selectedId);
      if (response.data.success) {
        alert('삭제되었습니다.');
        fetchRecruits();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      if (error.code === 'ERR_NETWORK') {
        alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해주세요.');
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
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
        <h4 className="fw-bold m-0">채용공고 관리</h4>
        <Button 
          variant="success" 
          className="d-flex align-items-center"
          onClick={() => navigate('/admin/recruit/write')}
        >
          <FaPlus className="me-2" /> 새 공고 등록
        </Button>
      </div>

      <Table responsive hover className="admin-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>공고명</th>
            <th>상태</th>
            <th>근무지</th>
            <th>등록일</th>
            <th className="text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-5 text-muted">데이터를 불러오는 중입니다...</td>
            </tr>
          ) : recruits.length > 0 ? (
            recruits.map((recruit) => (
              <tr key={recruit.id}>
                <td>{recruit.id}</td>
                <td className="fw-bold">{recruit.title}</td>
                <td>
                  <Badge bg="info" className="fw-normal">{recruit.status}</Badge>
                </td>
                <td>{recruit.location}</td>
                <td>{formatDate(recruit.createdAt)}</td>
                <td className="text-center">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => navigate(`/admin/recruit/edit/${recruit.id}`)}
                  >
                    <FaEdit /> 수정
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteClick(recruit.id)}
                  >
                    <FaTrash /> 삭제
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-5 text-muted">등록된 채용 공고가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* 삭제 확인 모달 */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>공고 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말로 이 채용 공고를 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>취소</Button>
          <Button variant="danger" onClick={confirmDelete}>삭제하기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminRecruitList;
