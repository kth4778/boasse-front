import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes, FaImage } from 'react-icons/fa';
import partnerApi from '../../../api/partnerApi';

const AdminPartnerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const fileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [link, setLink] = useState(''); // 링크 상태 추가
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id, isEdit]);

  const fetchDetail = async () => {
    try {
      const response = await partnerApi.getPartnerDetail(id);
      const res = response.data;
      console.log('Partner Detail Data:', res);

      // 백엔드 응답 구조(res.data)가 객체인지 확인
      if (res.success && res.data) {
        const { name, logo, link } = res.data;
        setName(name || '');
        setLink(link || ''); 
        
        // 기존 로고가 있을 경우 절대 경로로 변환하여 미리보기 설정
        if (logo) {
          setLogoPreview(partnerApi.getImageUrl(logo));
        }
      }
    } catch (error) {
      console.error('불러오기 실패:', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다.');
      navigate('/admin/partner');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('파트너 이름을 입력해주세요.');
      return;
    }
    if (!isEdit && !logoFile) {
      alert('로고 이미지를 등록해주세요.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('link', link); // 링크 전송
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      if (isEdit) {
        await partnerApi.updatePartner(id, formData);
      } else {
        await partnerApi.createPartner(formData);
      }
      alert('저장되었습니다.');
      navigate('/admin/partner');
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h4 className="fw-bold mb-4">{isEdit ? '파트너 수정' : '파트너 등록'}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">파트너 이름</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="예: 삼성전자, 한국수자원공사"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">관련 링크 (URL)</Form.Label>
          <Form.Control 
            type="url" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            placeholder="예: https://www.samsung.com"
          />
          <Form.Text className="text-muted">
            * 클릭 시 이동할 웹사이트 주소를 입력하세요. (선택사항)
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">로고 이미지</Form.Label>
          <div className="d-flex flex-column align-items-center p-4 border rounded bg-light">
            {logoPreview ? (
              <div className="mb-3 position-relative">
                <img 
                  src={logoPreview} 
                  alt="Preview" 
                  style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} 
                />
              </div>
            ) : (
              <div className="text-muted mb-3">이미지를 선택해주세요</div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <Button 
              variant="outline-secondary" 
              onClick={() => fileInputRef.current.click()}
            >
              <FaImage className="me-2" /> 
              {logoPreview ? '이미지 변경' : '이미지 업로드'}
            </Button>
          </div>
          <Form.Text className="text-muted">
            * 투명 배경의 PNG 이미지를 권장합니다.
          </Form.Text>
        </Form.Group>

        <div className="d-flex justify-content-end gap-2 mt-5">
          <Button variant="outline-secondary" onClick={() => navigate('/admin/partner')}>
            <FaTimes className="me-1" /> 취소
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            <FaSave className="me-1" /> 저장하기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminPartnerForm;
