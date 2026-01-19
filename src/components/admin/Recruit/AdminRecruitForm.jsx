import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import recruitApi from '../../../api/recruitApi';

const AdminRecruitForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    status: '신입/경력',
    location: '충북 청주시 오송읍',
    type: '정규직',
    applyLink: '',
    duties: [''],
    requirements: [''],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id, isEdit]);

  const fetchDetail = async () => {
    try {
      const response = await recruitApi.getRecruitDetail(id);
      if (response.data.success) {
        const data = response.data.data;
        setFormData({
          ...data,
          applyLink: data.applyLink || data.apply_link || '',
          duties: Array.isArray(data.recruit_duties) 
            ? data.recruit_duties 
            : (data.duties ? data.duties : ['']),
          requirements: Array.isArray(data.recruit_requirements) 
            ? data.recruit_requirements 
            : (data.requirements ? data.requirements : [''])
        });
      }
    } catch (error) {
      console.error('상세 정보 불러오기 실패:', error);
      if (error.code === 'ERR_NETWORK') {
        alert('서버와 연결할 수 없습니다. 관리자에게 문의하세요.');
      } else {
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
      }
      navigate('/admin/recruit');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (type, index, value) => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData({ ...formData, [type]: newArray });
  };

  const addArrayItem = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], ''] });
  };

  const removeArrayItem = (type, index) => {
    if (formData[type].length <= 1) return;
    const newArray = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.applyLink) {
      alert('필수 항목을 입력해 주세요.');
      return;
    }

    // 빈 항목 필터링 및 DB 필드명 매칭
    const cleanedData = {
      ...formData,
      applyLink: formData.applyLink, // 원복: applyLink 사용
      recruit_duties: formData.duties.filter(item => item.trim() !== ''),
      recruit_requirements: formData.requirements.filter(item => item.trim() !== '')
    };

    // 불필요한 기존 필드 제거
    delete cleanedData.duties;
    delete cleanedData.requirements;

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await recruitApi.updateRecruit(id, cleanedData);
      } else {
        response = await recruitApi.createRecruit(cleanedData);
      }

      if (response.data.success) {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate('/admin/recruit');
      }
    } catch (error) {
      console.error('저장 실패:', error);
      if (error.code === 'ERR_NETWORK') {
        alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해주세요.');
      } else {
        alert('저장 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card">
      <h4 className="fw-bold mb-4">{isEdit ? '채용공고 수정' : '새 채용공고 등록'}</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">공고명 *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="예: 하드웨어 개발자 채용"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">공고 상태</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                placeholder="예: 신입/경력, 채용마감"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">근무지</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">고용 형태</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">지원 링크 (URL) *</Form.Label>
              <Form.Control
                type="url"
                name="applyLink"
                value={formData.applyLink}
                onChange={handleInputChange}
                placeholder="사람인, 잡코리아 등 링크"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Card className="bg-light border-0 p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold m-0">주요 업무 리스트</h6>
                <Button variant="outline-primary" size="sm" onClick={() => addArrayItem('duties')}>
                  <FaPlus /> 추가
                </Button>
              </div>
              {formData.duties.map((duty, idx) => (
                <div key={idx} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={duty}
                    onChange={(e) => handleArrayChange('duties', idx, e.target.value)}
                    placeholder="업무 내용을 입력하세요."
                  />
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="ms-2" 
                    onClick={() => removeArrayItem('duties', idx)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </Card>
          </Col>
          <Col md={6}>
            <Card className="bg-light border-0 p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold m-0">자격 요건 리스트</h6>
                <Button variant="outline-primary" size="sm" onClick={() => addArrayItem('requirements')}>
                  <FaPlus /> 추가
                </Button>
              </div>
              {formData.requirements.map((req, idx) => (
                <div key={idx} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', idx, e.target.value)}
                    placeholder="요건을 입력하세요."
                  />
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="ms-2" 
                    onClick={() => removeArrayItem('requirements', idx)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4 gap-2">
          <Button variant="outline-secondary" onClick={() => navigate('/admin/recruit')}>
            <FaTimes className="me-1" /> 취소
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            <FaSave className="me-1" /> {loading ? '저장 중...' : '공고 저장'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminRecruitForm;