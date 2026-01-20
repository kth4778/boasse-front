import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBullhorn, FaUserTie, FaBoxOpen } from 'react-icons/fa';
import noticeApi from '../../api/noticeApi';
import recruitApi from '../../api/recruitApi';
// productApi는 곧 생성할 예정입니다.
import productApi from '../../api/productApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    notice: 0,
    recruit: 0,
    product: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [noticeRes, recruitRes, productRes] = await Promise.all([
          noticeApi.getNotices(1, 1),
          recruitApi.getRecruits(),
          productApi.getProducts()
        ]);

        setCounts({
          notice: noticeRes.data.data.pagination?.totalCount || noticeRes.data.data.notices?.length || 0,
          recruit: recruitRes.data.data.length || 0,
          product: productRes.data.data.length || 0
        });
      } catch (error) {
        console.error('통계 데이터를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { title: '공지사항', count: counts.notice, icon: <FaBullhorn />, color: '#8CC63F', link: '/admin/notice' },
    { title: '채용공고', count: counts.recruit, icon: <FaUserTie />, color: '#2196f3', link: '/admin/recruit' },
    { title: '등록 제품', count: counts.product, icon: <FaBoxOpen />, color: '#ff9800', link: '/admin/product' },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3 text-muted">데이터를 집계 중입니다...</p>
      </div>
    );
  }

  return (
    <div>
      <Row className="g-4">
        {stats.map((stat, idx) => (
          <Col key={idx} md={4}>
            <Card 
              className="admin-card text-center" 
              onClick={() => navigate(stat.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mb-3" style={{ fontSize: '2.5rem', color: stat.color }}>
                {stat.icon}
              </div>
              <h4 className="text-muted mb-2">{stat.title}</h4>
              <h2 className="fw-bold">{stat.count}건</h2>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Card className="admin-card mt-4">
        <Card.Body>
          <h4 className="fw-bold mb-4">관리자 안내</h4>
          <p className="text-muted mb-0">
            실시간 데이터 연동이 완료되었습니다. 왼쪽 메뉴를 통해 각 항목의 데이터를 추가, 수정, 삭제할 수 있습니다.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;