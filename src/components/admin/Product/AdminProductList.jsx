import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
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

  const handleToggleMainFeatured = async (product) => {
    try {
      // 백엔드에서 specs와 features를 JSON 문자열로 처리하므로, 객체인 경우 변환하여 전송
      const specsData = typeof product.specs === 'object' ? JSON.stringify(product.specs) : product.specs;
      const featuresData = typeof product.features === 'object' ? JSON.stringify(product.features) : product.features;

      // API 호출하여 상태 업데이트
      const response = await productApi.updateProduct(product.id, {
        ...product,
        specs: specsData,
        features: featuresData,
        isMainFeatured: !product.isMainFeatured
      });

      if (response.data.success) {
        // 성공 시 목록 재조회하여 데이터 동기화
        await fetchProducts();
      } else {
        alert('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
      alert('변경 중 오류가 발생했습니다.');
      fetchProducts(); // 에러 시 목록 새로고침하여 UI 복구
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

      <Table responsive hover className="admin-table align-middle">
        <thead>
          <tr>
            <th className="text-center" style={{ width: '80px' }}>메인</th>
            <th>ID</th>
            <th>이미지</th>
            <th>제품명</th>
            <th>카테고리</th>
            <th className="text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6" className="text-center py-5">로딩 중...</td></tr>
          ) : products.map((product) => (
            <tr key={product.id}>
              <td className="text-center">
                <Button 
                  variant="link" 
                  className="p-0 text-warning"
                  onClick={() => handleToggleMainFeatured(product)}
                  title={product.isMainFeatured ? "메인 노출 해제" : "메인 노출 설정"}
                >
                  {product.isMainFeatured ? <FaStar size={20} /> : <FaRegStar size={20} style={{ color: '#ccc' }} />}
                </Button>
              </td>
              <td>{product.id}</td>
              <td>
                <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
              </td>
              <td className="fw-bold">{product.title}</td>
              <td><Badge bg="success" style={{ backgroundColor: '#8CC63F', fontWeight: '500' }}>{product.category}</Badge></td>
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
