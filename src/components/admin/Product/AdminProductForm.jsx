import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';
import productApi from '../../../api/productApi';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Smart Farm',
    image: '',
    description: '',
    detail: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id, isEdit]);

  const fetchDetail = async () => {
    try {
      const response = await productApi.getProductDetail(id);
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('불러오기 실패:', error);
      navigate('/admin/product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await productApi.updateProduct(id, formData);
      } else {
        await productApi.createProduct(formData);
      }
      alert('저장되었습니다.');
      navigate('/admin/product');
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card">
      <h4 className="fw-bold mb-4">{isEdit ? '제품 수정' : '새 제품 등록'}</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">제품명 *</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">카테고리</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="Smart Mobility">Smart Mobility</option>
                <option value="Smart Factory">Smart Factory</option>
                <option value="Smart Farm">Smart Farm</option>
                <option value="Smart Building">Smart Building</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">이미지 URL</Form.Label>
          <Form.Control type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">짧은 설명</Form.Label>
          <Form.Control type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">상세 설명</Form.Label>
          <Form.Control as="textarea" rows={5} name="detail" value={formData.detail} onChange={handleInputChange} />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => navigate('/admin/product')}><FaTimes /> 취소</Button>
          <Button type="submit" variant="success" disabled={loading}><FaSave /> 저장하기</Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminProductForm;
