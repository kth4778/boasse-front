import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  FaBullhorn, FaUserTie, FaBoxOpen, FaHandshake, FaEnvelope, 
  FaPlus, FaArrowRight, FaClock, FaUser 
} from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import noticeApi from '../../api/noticeApi';
import recruitApi from '../../api/recruitApi';
import productApi from '../../api/productApi';
import partnerApi from '../../api/partnerApi';
import inquiryApi from '../../api/inquiryApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const [counts, setCounts] = useState({
    notice: 0,
    recruit: 0,
    product: 0,
    partner: 0,
    inquiry: 0
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [noticeRes, recruitRes, productRes, partnerRes, inquiryRes] = await Promise.all([
          noticeApi.getNotices(1, 1),
          recruitApi.getRecruits(),
          productApi.getProducts(),
          partnerApi.getPartners(),
          inquiryApi.getInquiries(1, 5)
        ]);

        setCounts({
          notice: noticeRes.data.data.pagination?.totalCount || noticeRes.data.data.notices?.length || 0,
          recruit: recruitRes.data.data.length || 0,
          product: productRes.data.data.length || 0,
          partner: partnerRes.data.data.length || 0,
          inquiry: inquiryRes.data.data.pagination?.totalCount || inquiryRes.data.data.inquiries?.length || 0
        });

        setRecentInquiries(inquiryRes.data.data.inquiries || []);
      } catch (error) {
        console.error('대시보드 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useGSAP(() => {
    if (!loading) {
      gsap.from('.dashboard-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, [loading]);

  const stats = [
    { title: '공지사항', count: counts.notice, icon: <FaBullhorn />, color: '#8CC63F', bg: 'rgba(140, 198, 63, 0.1)', link: '/admin/notice' },
    { title: '채용공고', count: counts.recruit, icon: <FaUserTie />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', link: '/admin/recruit' },
    { title: '제품 관리', count: counts.product, icon: <FaBoxOpen />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', link: '/admin/product' },
    { title: '1:1 문의', count: counts.inquiry, icon: <FaEnvelope />, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)', link: '/admin/inquiry' },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <h4 className="fw-bold mb-4">Dashboard Overview</h4>
      
      {/* 1. Stats Overview */}
      <Row className="g-4 mb-5">
        {stats.map((stat, idx) => (
          <Col key={idx} md={6} xl={3}>
            <div 
              className="admin-card dashboard-card h-100" 
              onClick={() => navigate(stat.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="stat-label text-uppercase mb-1">{stat.title}</h6>
                  <h2 className="stat-value">{stat.count}</h2>
                </div>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '48px', height: '48px', backgroundColor: stat.bg, color: stat.color, fontSize: '1.2rem' }}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="stat-card-icon-bg" style={{ color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        {/* 2. Quick Actions */}
        <Col lg={4}>
          <div className="admin-card dashboard-card h-100">
            <h5 className="fw-bold mb-4">Quick Actions</h5>
            <div className="d-grid gap-3">
              <Button variant="light" className="text-start p-3 border-0 bg-light hover-shadow" onClick={() => navigate('/admin/notice/write')}>
                <FaPlus className="me-2 text-success" /> 공지사항 작성
              </Button>
              <Button variant="light" className="text-start p-3 border-0 bg-light hover-shadow" onClick={() => navigate('/admin/product/write')}>
                <FaPlus className="me-2 text-warning" /> 새 제품 등록
              </Button>
              <Button variant="light" className="text-start p-3 border-0 bg-light hover-shadow" onClick={() => navigate('/admin/recruit/write')}>
                <FaPlus className="me-2 text-primary" /> 채용공고 등록
              </Button>
              <Button variant="light" className="text-start p-3 border-0 bg-light hover-shadow" onClick={() => navigate('/admin/partner/write')}>
                <FaPlus className="me-2 text-info" /> 파트너사 추가
              </Button>
            </div>
          </div>
        </Col>

        {/* 3. Recent Inquiries */}
        <Col lg={8}>
          <div className="admin-card dashboard-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">Recent Inquiries</h5>
              <Button variant="link" className="text-decoration-none text-success p-0" onClick={() => navigate('/admin/inquiry')}>
                전체보기 <FaArrowRight size={12} />
              </Button>
            </div>
            
            {recentInquiries.length > 0 ? (
              <div className="list-group list-group-flush">
                {recentInquiries.map((inquiry) => (
                  <div 
                    key={inquiry._id || inquiry.id} 
                    className="list-group-item px-0 py-3 d-flex align-items-center border-bottom bg-transparent"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/admin/inquiry/${inquiry._id || inquiry.id}`)}
                  >
                    <div className="me-3">
                      <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{width:'40px', height:'40px'}}>
                        <FaUser className="text-muted" />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 fw-semibold">{inquiry.name || '익명'}</h6>
                      <small className="text-muted">
                        {inquiry.email} 
                        {inquiry.subject ? ` • ${inquiry.subject}` : (inquiry.title ? ` • ${inquiry.title}` : '')}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="text-muted small d-flex align-items-center justify-content-end">
                        <FaClock className="me-1" size={10} />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                최근 문의 내역이 없습니다.
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
