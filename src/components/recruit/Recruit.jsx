import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserPlus, FaFileAlt, FaComments, FaCheckCircle, FaBook, FaIdCard, FaChartLine, FaHandsHelping } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import recruitApi from '../../api/recruitApi';
import './Recruit.css';

gsap.registerPlugin(ScrollTrigger);

const Recruit = () => {
  const containerRef = useRef(null);
  const [recruits, setRecruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruits = async () => {
      try {
        const response = await recruitApi.getRecruits();
        console.log('Recruit API Response Raw:', response); // 데이터 구조 확인용
        
        // 다양한 백엔드 응답 구조 대응
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

  // 유연한 데이터 추출 함수
  const getFieldData = (job, keys) => {
    for (const key of keys) {
      if (job[key]) return job[key];
    }
    return null;
  };

  // 리스트 렌더링 함수
  const renderListItems = (data) => {
    if (!data) return null;
    let items = [];
    
    if (Array.isArray(data)) {
      // 배열인데 요소가 객체인 경우 (예: {content: "..."}) 처리
      items = data.map(item => {
        if (typeof item === 'object' && item !== null) {
          return item.content || item.description || item.name || JSON.stringify(item);
        }
        return item;
      });
    } else if (typeof data === 'string') {
      items = data.includes('\n') ? data.split('\n') : data.split(',');
    }
    
    const filteredItems = items
      .map(item => item?.toString().trim())
      .filter(item => item && item !== '');

    if (filteredItems.length === 0) return null;

    return filteredItems.map((item, i) => <li key={i}>{item}</li>);
  };

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

  useGSAP(() => {
    const sections = gsap.utils.toArray('.recruit-section, .recruit-hero');
    sections.forEach((section) => {
      const anims = section.querySelectorAll('.animate-up');
      if (anims.length > 0) {
        gsap.fromTo(anims, 
          { opacity: 0, y: 30 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    });
    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [loading, recruits] });

  const processes = [
    { icon: <FaFileAlt />, title: '입사지원', desc: '온라인 및 이메일 지원' },
    { icon: <FaUserPlus />, title: '서류전형', desc: '자격요건 및 역량 검토' },
    { icon: <FaComments />, title: '면접심사', desc: '실무 및 인성 면접' },
    { icon: <FaCheckCircle />, title: '최종합격', desc: '최종 처우 협의 및 입사' },
  ];

  const welfares = [
    { icon: <FaChartLine />, title: '성과 보상', desc: '우수사원 표창 및 포상제도 운영' },
    { icon: <FaIdCard />, title: '장기근속 포상', desc: '장기근속자 유급휴가 및 포상' },
    { icon: <FaBook />, title: '자기계발 지원', desc: '직무 교육 및 도서 구입비 지원' },
    { icon: <FaHandsHelping />, title: '안정된 생활', desc: '퇴직연금 및 4대보험 가입' },
  ];

  return (
    <div className="recruit-page" ref={containerRef}>
      <section className="recruit-hero">
        <Container>
          <div className="hero-content text-center">
            <h4 className="hero-sub-title animate-up">CAREERS</h4>
            <h1 className="hero-main-title animate-up">신의를 중시하며,<br />도전과 창의를 즐기는<br /><span>전문가</span>를 찾습니다.</h1>
            <p className="hero-desc animate-up">보아스소프트와 함께 미래 농업의 디지털 전환을 이끌어갈 인재를 기다립니다.</p>
          </div>
        </Container>
      </section>

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

      <section className="recruit-section jobs-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h4 className="section-sub-title animate-up">JOB OPENINGS</h4>
            <h2 className="section-title animate-up">진행 중인 채용 공고</h2>
            <p className="text-muted animate-up mt-3">보아스소프트와 함께 성장할 인재를 기다립니다.</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              {loading ? (
                <div className="text-center py-5">로딩 중...</div>
              ) : recruits.length > 0 ? (
                recruits.map((job) => (
                  <div key={job.id} className="animate-up mb-4">
                    <Card className="job-card border-0 shadow-sm">
                      <Card.Body className="p-4 p-md-5">
                        <div className="d-md-flex justify-content-between align-items-start mb-4">
                          <div>
                            <span className="badge bg-success mb-2">{job.status || '채용중'}</span>
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
                              {renderListItems(getFieldData(job, ['recruit_duties', 'recruitDuties', 'duties', 'mainTask'])) || <li>공고 내용을 확인해 주세요.</li>}
                            </ul>
                          </Col>
                          <Col md={6}>
                            <h5 className="info-label">자격 요건</h5>
                            <ul className="info-list">
                              {renderListItems(getFieldData(job, ['recruit_requirements', 'recruitRequirements', 'requirements', 'qualification'])) || <li>공고 내용을 확인해 주세요.</li>}
                            </ul>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="text-center py-5 text-muted animate-up">현재 진행 중인 채용 공고가 없습니다.</div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Recruit;