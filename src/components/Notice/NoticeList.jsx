import React, { useState, useEffect } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import './Notice.css';

/*
 * [공지사항 목록 페이지]
 * 게시판 형태로 공지사항 목록을 보여주는 컴포넌트입니다.
 * 페이징(Pagination), 검색(Search), 목록 조회 기능을 포함합니다.
 */
const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('title');
  const navigate = useNavigate();

  // 페이지 변경 시 데이터 다시 불러오기
  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  // 공지사항 목록 데이터 API 요청
  const fetchNotices = async (page) => {
    setLoading(true);
    try {
      const response = await noticeApi.getNotices(page, 10);
      if (response.data.success && Array.isArray(response.data.data?.notices)) {
        // [디버깅] 데이터 구조 확인: content 필드가 있는지 체크
        if (response.data.data.notices.length > 0) {
          console.log("첫 번째 공지사항 데이터:", response.data.data.notices[0]);
        }
        setNotices(response.data.data.notices);
        setPagination(response.data.data.pagination);
      } else {
        setNotices([]);
        setPagination({ totalPages: 0, currentPage: 1 });
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      setNotices([]);
      setPagination({ totalPages: 0, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  /*
   * [클라이언트 측 검색 필터링]
   * API에서 검색 기능을 지원하지 않을 경우를 대비해, 
   * 현재 로드된 페이지 내의 데이터를 기준으로 검색어를 필터링합니다.
   * (실제 운영 환경에서는 API 검색 파라미터를 사용하는 것이 좋습니다.)
   */
  const filteredNotices = notices.filter((notice) => {
    if (!searchKeyword) return true;
    const keyword = searchKeyword.toLowerCase();
    const title = (notice.title || '').toLowerCase();
    // content에서 HTML 태그 제거 후 검색
    const content = stripHtml(notice.content || '').toLowerCase();
    const author = (notice.author || '관리자').toLowerCase();

    if (searchType === 'title') return title.includes(keyword);
    if (searchType === 'content') return content.includes(keyword);
    if (searchType === 'author') return author.includes(keyword);
    
    // 전체 검색 (제목 + 내용 + 작성자)
    return title.includes(keyword) || content.includes(keyword) || author.includes(keyword);
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="notice-page">
        <section className="notice-hero">
           <Container><h1 className="text-white">Loading...</h1></Container>
        </section>
      </div>
    );
  }

  return (
    <div className="notice-page">
      {/* 상단 히어로 섹션 */}
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
          {/* 상단 툴바: 게시물 수 및 검색창 */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
            <p className="mb-0 text-muted">총 <strong>{pagination?.totalCount || notices.length || 0}</strong>건의 게시물이 있습니다.</p>
            
            <div className="d-flex gap-2 notice-search-bar">
              <select 
                className="form-select" 
                style={{ width: '100px' }}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="title">제목</option>
                <option value="content">내용</option>
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

          {/* 게시물 목록 테이블 */}
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
              {filteredNotices.map((notice, index) => {
                // 게시글 번호 계산 (역순)
                // (전체 개수 - ((현재페이지-1)*10) - 현재인덱스)
                const totalCount = pagination?.totalCount || notices.length;
                const virtualNum = totalCount - ((currentPage - 1) * 10) - index;
                
                return (
                  <tr key={notice.id} onClick={() => navigate(`/notice/${notice.id}`)} style={{ cursor: 'pointer' }}>
                    <td>{virtualNum}</td>
                    <td className="text-start">
                      <span className="notice-title-text">{notice.title}</span>
                      {notice.hasAttachments && <span className="ms-2 attachment-icon">📎</span>}
                    </td>
                    <td>{notice.author || '관리자'}</td>
                    <td>{formatDate(notice.createdAt)}</td>
                    <td>{notice.viewCount}</td>
                  </tr>
                );
              })}
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

        {/* 페이지네이션 (Pagination) */}
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
