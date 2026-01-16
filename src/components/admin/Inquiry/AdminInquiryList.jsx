import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import inquiryApi from '../../../api/inquiryApi';

const AdminInquiryList = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchInquiries(currentPage);
  }, [currentPage]);

  const fetchInquiries = async (page) => {
    setLoading(true);
    try {
      const response = await inquiryApi.getInquiries(page, 10);
      if (response.data.success) {
        setInquiries(response.data.data.inquiries);
        setTotalPages(response.data.data.pagination.totalPages);
        setTotalCount(response.data.data.pagination.totalCount);
      }
    } catch (error) {
      console.error('문의 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // 상세 페이지 이동 방지
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await inquiryApi.deleteInquiry(id);
      alert('삭제되었습니다.');
      fetchInquiries(currentPage);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
  };

  return (
    <div className="admin-content-wrapper">
      <h2 className="mb-4">1:1 문의 관리</h2>
      
      <div className="bg-white p-4 rounded shadow-sm">
        <Table hover responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>작성자</th>
              <th>이메일</th>
              <th>내용 (요약)</th>
              <th>등록일시</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-5">로딩 중...</td></tr>
            ) : inquiries.length > 0 ? (
              inquiries.map((item, index) => {
                // 게시글 번호 계산 (전체 개수 - (현재페이지-1)*페이지당개수 - 현재인덱스)
                const rowNumber = totalCount - ((currentPage - 1) * 10) - index;
                
                return (
                  <tr 
                    key={item.id} 
                    onClick={() => navigate(`/admin/inquiry/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{rowNumber}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td style={{ maxWidth: '300px' }} className="text-truncate" title={item.message}>
                      {item.message}
                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={(e) => handleDelete(e, item.id)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="6" className="text-center py-5">등록된 문의가 없습니다.</td></tr>
            )}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              />
              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item 
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              />
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiryList;
