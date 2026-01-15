import React, { useState, useEffect } from 'react';
import { Container, Table, Pagination, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import './Notice.css';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  const fetchNotices = async (page) => {
    setLoading(true);
    try {
      const response = await noticeApi.getNotices(page, 10);
      if (response.data.success) {
        setNotices(response.data.data.notices);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      // API call failed, no mock data fallback
      setNotices([]);
      setPagination({ totalPages: 0, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="notice-page">
      <section className="sub-header">
        <Container>
          <h2 className="sub-title-main">Notice</h2>
          <p className="sub-title-sub">BOAS-SE의 새로운 소식을 전해드립니다.</p>
        </Container>
      </section>

      <Container className="notice-content py-5">
        <div className="notice-list-container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <p className="mb-0 text-muted">총 <strong>{pagination.totalCount || notices.length}</strong>건의 게시물이 있습니다.</p>
            <Button 
              className="btn-primary-custom"
              onClick={() => navigate('/notice/write')}
            >
              새 글 작성하기
            </Button>
          </div>

          <Table hover responsive className="notice-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>No.</th>
                <th>Subject</th>
                <th style={{ width: '150px' }}>Author</th>
                <th style={{ width: '150px' }}>Date</th>
                <th style={{ width: '100px' }}>Views</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id} onClick={() => navigate(`/notice/${notice.id}`)} style={{ cursor: 'pointer' }}>
                  <td>{notice.id}</td>
                  <td className="text-start">
                    <span className="notice-title-text">{notice.title}</span>
                    {notice.hasAttachments && <span className="ms-2 attachment-icon">📎</span>}
                  </td>
                  <td>{notice.author}</td>
                  <td>{formatDate(notice.createdAt)}</td>
                  <td>{notice.viewCount}</td>
                </tr>
              ))}
              {notices.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="py-5 text-center text-muted">등록된 공지사항이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination className="custom-pagination">
              <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {[...Array(pagination.totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                disabled={currentPage === pagination.totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}
      </Container>
    </div>
  );
};

export default NoticeList;