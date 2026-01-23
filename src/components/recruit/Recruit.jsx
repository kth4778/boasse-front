import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserPlus, FaFileAlt, FaComments, FaCheckCircle, FaBook, FaIdCard, FaChartLine, FaHandsHelping } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import recruitApi from '../../api/recruitApi';
import './Recruit.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * [인재 채용 페이지]
 * 회사의 채용 절차(Process), 복리후생(Benefits), 그리고 현재 진행 중인 채용 공고(Job Openings)를 소개하는 페이지입니다.
 * 채용 공고 데이터는 API를 통해 불러오며, 각 섹션별로 스크롤 애니메이션이 적용되어 있습니다.
 */
const Recruit = () => {
  const containerRef = useRef(null);
  const [recruits, setRecruits] = useState([]);
  const [loading, setLoading] = useState(true);

  // 채용 공고 데이터 로드
  useEffect(() => {
    const fetchRecruits = async () => {
      try {
        const response = await recruitApi.getRecruits();
        const data = response.data?.data || response.data || [];
        setRecruits(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('채용 정보를 불러오지 못했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecruits();
  }, []);

  // 섹션별 등장 애니메이션 설정
  useGSAP(() => {
    // 1. 초기 상태 설정 (깜빡임 방지)
    gsap.set('.animate-up', { opacity: 1, y: 0 });

    // 2. 각 섹션 요소들이 스크롤 될 때 아래에서 위로 부드럽게 나타나도록 설정
    const sections = gsap.utils.toArray('.recruit-section');
    sections.forEach((section) => {
      const elements = section.querySelectorAll('.animate-up');
      if (elements.length > 0) {
        gsap.fromTo(elements, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 92%', 
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [loading, recruits] });

  // [데이터] 채용 절차 아이콘 및 설명
  const processes = [
    { icon: <FaFileAlt />, title: '입사지원', desc: '온라인 및 이메일 지원' },
    { icon: <FaUserPlus />, title: '서류전형', desc: '자격요건 및 역량 검토' },
    { icon: <FaComments />, title: '면접심사', desc: '실무 및 인성 면접' },
    { icon: <FaCheckCircle />, title: '최종합격', desc: '최종 처우 협의 및 입사' },
  ];

  // [데이터] 복리후생 아이콘 및 설명
  const welfares = [
    { icon: <FaChartLine />, title: '성과 보상', desc: '우수사원 표창 및 포상제도 운영' },
    { icon: <FaIdCard />, title: '장기근속 포상', desc: '장기근속자 유급휴가 및 포상' },
    { icon: <FaBook />, title: '자기계발 지원', desc: '직무 교육 및 도서 구입비 지원' },
    { icon: <FaHandsHelping />, title: '안정된 생활', desc: '퇴직연금 및 4대보험 가입' },
  ];

  // 유연한 데이터 접근을 위한 헬퍼 함수 (API 응답 필드명이 다를 경우 대응)
  const getFieldData = (job, keys) => {
    for (const key of keys) {
      if (job[key]) return job[key];
    }
    return null;
  };

  // 줄바꿈 문자나 쉼표로 구분된 텍스트를 리스트 아이템으로 변환하여 렌더링
  const renderListItems = (data) => {
    if (!data) return null;
    let items = [];
    if (Array.isArray(data)) {
      items = data.map(item => (typeof item === 'object' && item !== null) ? (item.content || item.description || JSON.stringify(item)) : item);
    } else if (typeof data === 'string') {
      items = data.includes('\n') ? data.split('\n') : data.split(',');
    }
    const filtered = items.map(i => i?.toString().trim()).filter(i => i);
    if (filtered.length === 0) return null;
    return filtered.map((item, i) => <li key={i}>{item}</li>);
  };

  // 지원하기 버튼 클릭 핸들러
  const handleApplyClick = (e, job) => {
    const link = getFieldData(job, ['applyLink', 'apply_link', 'applyUrl', 'link']);
    if (!link) {
      e.preventDefault();
      alert('지원 링크가 설정되지 않았습니다.');
      return;
    }
    const url = (link.startsWith('http://') || link.startsWith('https://')) ? link : `https://${link}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="recruit-page" ref={containerRef}>
      {/* 1. 히어로 섹션 */}
      <section className="recruit-hero">
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-main-title">RECRUIT</h1>
            <p className="hero-desc">
              보아스에스이와 함께 미래 농업의 디지털 전환을 이끌어갈 인재를 기다립니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. 채용 절차 섹션 */}
      <section className="recruit-section process-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h4 className="section-sub-title animate-up">PROCESS</h4>
            <h2 className="section-title animate-up">채용 절차</h2>
            <div className="title-line animate-up"></div>
          </div>
          <Row className="process-grid">
            {processes.map((p, idx) => (
              <Col key={idx} md={3} className="process-item-col mb-4">
                <div className="process-card animate-up">
                  <div className="process-icon">{p.icon}</div>
                  <h4 className="process-title">{p.title}</h4>
                  <p className="process-desc">{p.desc}</p>
                  {idx < processes.length - 1 && <div className="process-arrow d-none d-md-block">→</div>}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 3. 복리후생 섹션 */}
      <section className="recruit-section welfare-section py-5 bg-light">
        <Container>
          <div className="section-header text-center mb-5">
            <h4 className="section-sub-title animate-up">BENEFITS</h4>
            <h2 className="section-title animate-up">복리후생 및 기업문화</h2>
            <div className="title-line animate-up"></div>
          </div>
          <Row className="g-4">
            {welfares.map((w, idx) => (
              <Col key={idx} md={6} lg={3}>
                <div className="welfare-card animate-up">
                  <div className="welfare-icon">{w.icon}</div>
                  <h4 className="welfare-title">{w.title}</h4>
                  <p className="welfare-desc">{w.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. 진행 중인 채용 공고 섹션 */}
      <section className="recruit-section jobs-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h4 className="section-sub-title animate-up">JOB OPENINGS</h4>
            <h2 className="section-title animate-up">진행 중인 채용 공고</h2>
            <p className="text-muted animate-up mt-3">보아스에스이와 함께 성장할 인재를 기다립니다.</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              {!loading && recruits.length > 0 ? (
                recruits.map((job) => (
                  <div key={job.id} className="animate-up mb-4">
                    <Card className="job-card border-0 shadow-sm">
                      <Card.Body className="p-4 p-md-5">
                        <div className="d-md-flex justify-content-between align-items-start mb-4">
                          <div>
                            <span className="badge bg-success mb-2">{getFieldData(job, ['status', 'job_status']) || '채용중'}</span>
                            <h3 className="job-title">{job.title}</h3>
                            <p className="job-location text-muted">{job.location} | {job.type}</p>
                          </div>
                          <button onClick={(e) => handleApplyClick(e, job)} className="btn btn-apply">지원하기</button>
                        </div>
                        <hr />
                        <Row className="mt-4">
                          <Col md={6} className="mb-4 mb-md-0">
                            <h5 className="info-label">주요 업무</h5>
                            <ul className="info-list">
                              {renderListItems(getFieldData(job, ['recruit_duties', 'duties', 'recruitDuties'])) || <li>공고 내용을 확인해 주세요.</li>}
                            </ul>
                          </Col>
                          <Col md={6}>
                            <h5 className="info-label">자격 요건</h5>
                            <ul className="info-list">
                              {renderListItems(getFieldData(job, ['recruit_requirements', 'requirements', 'recruitRequirements'])) || <li>공고 내용을 확인해 주세요.</li>}
                            </ul>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : !loading && (
                <div className="text-center py-5 text-muted animate-up">현재 진행 중인 채용 공고가 없습니다.</div>
              )}
              {loading && <div className="text-center py-5">공고를 불러오는 중...</div>}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Recruit;
