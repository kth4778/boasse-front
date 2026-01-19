import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaLink } from 'react-icons/fa';
import partnerApi from '../../../api/partnerApi';

const AdminPartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await partnerApi.getPartners();
      const res = response.data;
      console.log('Admin Partners API Response:', res);

      if (res.success) {
        // 1. 실제 응답 구조인 res.data.items 확인
        if (res.data && Array.isArray(res.data.items)) {
          setPartners(res.data.items);
        } 
        // 2. 명세서 구조인 res.data가 배열인 경우 확인
        else if (Array.isArray(res.data)) {
          setPartners(res.data);
        } 
        // 3. 기타 예외 케이스 (partners 필드 등)
        else if (res.data && Array.isArray(res.data.partners)) {
          setPartners(res.data.partners);
        } else {
          console.warn('데이터 구조를 파악할 수 없음:', res.data);
          setPartners([]);
        }
      } else {
        setPartners([]);
      }
    } catch (error) {
      console.error('파트너 목록 로딩 실패:', error);
      setPartners([]);
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
      await partnerApi.deletePartner(selectedId);
      alert('삭제되었습니다.');
      fetchPartners();
    } catch (error) {
      console.error('삭제 실패:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">파트너 관리</h4>
        <Button 
          variant="success" 
          onClick={() => navigate('/admin/partner/write')}
        >
          <FaPlus className="me-2" /> 파트너 등록
        </Button>
      </div>

      <Table responsive hover className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>ID</th>
            <th style={{ width: '20%' }}>로고</th>
            <th>파트너 이름</th>
            <th style={{ width: '20%' }} className="text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4" className="text-center py-5">로딩 중...</td></tr>
          ) : partners.length > 0 ? (
            partners.map((partner) => (
              <tr key={partner.id}>
                <td>{partner.id}</td>
                <td>
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    style={{ height: '40px', objectFit: 'contain', background: '#f8f9fa', padding: '5px', borderRadius: '4px' }} 
                  />
                </td>
                <td className="fw-bold align-middle">
                  {partner.name}
                  {partner.link && (
                    <a href={partner.link} target="_blank" rel="noopener noreferrer" className="ms-2 text-muted" title={partner.link}>
                      <FaLink size={12} />
                    </a>
                  )}
                </td>
                <td className="text-center align-middle">
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/admin/partner/edit/${partner.id}`)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(partner.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" className="text-center py-5">등록된 파트너가 없습니다.</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>파트너 삭제</Modal.Title></Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>취소</Button>
          <Button variant="danger" onClick={confirmDelete}>삭제하기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPartnerList;
