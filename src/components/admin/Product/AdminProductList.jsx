import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import productApi from '../../../api/productApi';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProducts();
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('제품 목록을 불러오는 중 오류 발생:', error);
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
      const response = await productApi.deleteProduct(selectedId);
      if (response.data.success) {
        alert('삭제되었습니다.');
        fetchProducts();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">제품 관리</h4>
        <Button 
          variant="success" 
          onClick={() => navigate('/admin/product/write')}
        >
          <FaPlus className="me-2" /> 새 제품 등록
        </Button>
      </div>

      <Table responsive hover className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이미지</th>
            <th>제품명</th>
            <th>카테고리</th>
            <th className="text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="5" className="text-center py-5">로딩 중...</td></tr>
          ) : products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
              </td>
              <td className="fw-bold">{product.title}</td>
              <td><Badge bg="secondary">{product.category}</Badge></td>
              <td className="text-center">
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/admin/product/edit/${product.id}`)}>
                  <FaEdit />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>제품 삭제</Modal.Title></Modal.Header>
        <Modal.Body>정말로 이 제품을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>취소</Button>
          <Button variant="danger" onClick={confirmDelete}>삭제하기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProductList;
