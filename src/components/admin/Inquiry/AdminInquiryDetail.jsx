import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Spinner } from 'react-bootstrap';
import inquiryApi from '../../../api/inquiryApi';

const AdminInquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await inquiryApi.getInquiryDetail(id);
        
        // HTTP 상태 코드가 200이면 성공으로 간주
        if (response.status === 200 && response.data) {
          // response.data.data(래핑된 경우) 또는 response.data(직접 반환) 사용
          const inquiryData = response.data.data || response.data;
          setInquiry(inquiryData);
        } else {
          console.warn('Unexpected response:', response);
          alert('문의 내역을 불러오는데 실패했습니다.');
          navigate('/admin/inquiry');
        }
      } catch (error) {
        console.error('상세 조회 오류:', error);
        alert('문의 내역을 불러오는 중 오류가 발생했습니다.');
        navigate('/admin/inquiry');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('정말 이 문의를 삭제하시겠습니까?')) return;
    try {
      await inquiryApi.deleteInquiry(id);
      alert('삭제되었습니다.');
      navigate('/admin/inquiry');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
  };

  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" /></div>;
  }

  if (!inquiry) return null;

  return (
    <div className="admin-content-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>1:1 문의 상세</h2>
        <Button variant="secondary" onClick={() => navigate('/admin/inquiry')}>목록으로</Button>
      </div>

      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">작성자: {inquiry.name}</h5>
              <div className="text-muted small">이메일: {inquiry.email}</div>
            </div>
            <div className="text-muted small">
              접수일시: {formatDate(inquiry.createdAt)}
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-4" style={{ minHeight: '300px' }}>
          <h6 className="text-muted mb-3 border-bottom pb-2">문의 내용</h6>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {inquiry.message}
          </div>
        </Card.Body>
        <Card.Footer className="bg-white d-flex justify-content-end py-3">
          <Button variant="danger" onClick={handleDelete}>
            문의 삭제
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AdminInquiryDetail;
