import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import productApi from '../../../api/productApi';
import { getImageUrl } from '../../../utils/imageUtils';

/*
 * [관리자 제품 관리 컴포넌트]
 * 등록된 제품 목록을 조회하고, 메인 페이지 노출 여부(Main Featured)를 토글하거나
 * 수정/삭제할 수 있는 기능을 제공합니다.
 */
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
      alert('제품 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 메인 노출 여부 토글 핸들러
  const handleToggleMainFeatured = async (product) => {
    try {
      // API 응답 필드명 호환성 처리 (isMainFeatured / mainFeatured)
      const currentStatus = product.isMainFeatured !== undefined ? product.isMainFeatured : product.mainFeatured;
      
      const form = new FormData();
      form.append('category', product.category);
      form.append('title', product.title);
      form.append('description', product.description || '');
      form.append('detail', product.detail || '');
      form.append('isMainFeatured', !currentStatus); // 상태 반전

      // 객체 데이터는 문자열로 변환하여 전송
      const specsData = typeof product.specs === 'object' ? JSON.stringify(product.specs) : product.specs;
      const featuresData = typeof product.features === 'object' ? JSON.stringify(product.features) : product.features;
      
      form.append('specs', specsData);
      form.append('features', featuresData);

      const response = await productApi.updateProduct(product.id, form);

      if (response.data.success) {
        await fetchProducts();
      } else {
        alert('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
      const msg = error.response?.data?.message || '변경 중 오류가 발생했습니다.';
      alert(msg);
      fetchProducts(); 
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
          ) : (
            products.map((product) => {
              const isFeatured = product.isMainFeatured !== undefined ? product.isMainFeatured : product.mainFeatured;
              return (
                <tr key={product.id}>
                  <td className="text-center">
                    <Button 
                      variant="link" 
                      className="p-0 text-warning"
                      onClick={() => handleToggleMainFeatured(product)}
                      title={isFeatured ? "메인 노출 해제" : "메인 노출 설정"}
                    >
                      {isFeatured ? <FaStar size={20} /> : <FaRegStar size={20} style={{ color: '#ccc' }} />}
                    </Button>
                  </td>
                  <td>{product.id}</td>
                  <td>
                    {product.image ? (
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.title} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                      />
                    ) : (
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#eee', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>
                        No Image
                      </div>
                    )}
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
              );
            })
          )}
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
