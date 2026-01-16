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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('title');
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
      setNotices([]);
      setPagination({ totalPages: 0, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  // 임시 필터링 로직 (프론트엔드 내에서 처리)
  const filteredNotices = notices.filter((notice) => {
    if (!searchKeyword) return true;
    const keyword = searchKeyword.toLowerCase();
    if (searchType === 'title') return notice.title.toLowerCase().includes(keyword);
    if (searchType === 'author') return notice.author.toLowerCase().includes(keyword);
    return notice.title.toLowerCase().includes(keyword) || notice.author.toLowerCase().includes(keyword);
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="notice-page">
      <section className="notice-hero">
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-main-title">NOTICE</h1>
            <p className="hero-desc">BOAS-SE의 새로운 소식을 전해드립니다.</p>
          </div>
        </Container>
      </section>

      <Container className="notice-content py-5">
        <div className="notice-list-container">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
            <p className="mb-0 text-muted">총 <strong>{pagination?.totalCount || notices.length || 0}</strong>건의 게시물이 있습니다.</p>
            
            {/* 검색창 영역 */}
            <div className="d-flex gap-2 notice-search-bar">
              <select 
                className="form-select" 
                style={{ width: '100px' }}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="title">제목</option>
                <option value="author">작성자</option>
                <option value="all">전체</option>
              </select>
              <input 
                type="text" 
                className="form-control" 
                placeholder="검색어를 입력하세요." 
                style={{ width: '250px' }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
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
              {filteredNotices.map((notice) => (
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
              {filteredNotices.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-5 text-center text-muted">
                    {searchKeyword ? `'${searchKeyword}'에 대한 검색 결과가 없습니다.` : '등록된 공지사항이 없습니다.'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {pagination?.totalPages > 1 && (
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