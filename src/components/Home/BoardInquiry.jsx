import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import inquiryApi from '../../api/inquiryApi';
import './BoardInquiry.css';

gsap.registerPlugin(ScrollTrigger);

const BoardInquiry = () => {
  const wrapperRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isAgreed: false
  });

  useGSAP(() => {
    // 문의하기 섹션 애니메이션 (등장은 빠르게, 텍스트는 우아하게)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-dark-section',
        start: 'top 98%', // 화면 하단에 살짝만 닿아도 즉시 시작
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.contact-dark-section', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 0.6,
      ease: 'power2.out'
    })
    .from('.contact-content-animate', {
      y: 40,
      opacity: 0,
      duration: 0.8, // 속도를 0.3 -> 0.8로 늦춰 우아하게
      stagger: 0.15, // 간격을 0.05 -> 0.15로 늘려 순차적으로 올라오는 느낌 강조
      ease: 'power3.out'
    }, '-=0.3');

  }, { scope: wrapperRef });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started', formData); // Debug log
    
    if (!formData.name || !formData.message || !formData.isAgreed) {
      alert('이름, 내용, 개인정보 동의는 필수입니다.');
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await inquiryApi.createInquiry(formData);
      console.log('API Response:', response); // Debug log

      // 백엔드 응답 구조에 따라 성공 여부 판단 (status code 200/201 또는 data.success)
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        alert('문의가 성공적으로 접수되었습니다.\n담당자가 확인 후 연락드리겠습니다.');
        setFormData({
          name: '',
          email: '',
          message: '',
          isAgreed: false
        });
      } else {
        // 성공 코드가 아닌 경우
        console.warn('Unexpected response status:', response.status);
        alert('문의 접수에 실패했습니다. 관리자에게 문의해주세요.');
      }
    } catch (error) {
      console.error('문의 접수 실패 (Detailed):', error);
      // 서버 응답이 있는 에러인 경우 메시지 표시
      if (error.response) {
        alert(`문의 접수 오류: ${error.response.status} ${error.response.statusText}`);
      } else {
        alert('서버와 통신할 수 없습니다. 잠시 후 다시 시도해 주세요.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="board-inquiry-wrapper" ref={wrapperRef}>
      <section className="contact-dark-section">
        <div className="contact-bg-pattern"></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="gy-5 contact-content-animate">
            {/* 좌측: 문의 폼 */}
            <Col lg={6}>
              <h3 className="dark-section-title">문의</h3>
              <form onSubmit={handleSubmit}>
                <div className="custom-input-group">
                  <label className="input-label">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    className="custom-input" 
                    placeholder="이름을 입력해 주세요." 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="custom-input-group">
                  <label className="input-label">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    className="custom-input" 
                    placeholder="E-mail을 입력해 주세요." 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="custom-input-group" style={{ alignItems: 'flex-start' }}>
                  <label className="input-label" style={{ marginTop: '5px' }}>Message *</label>
                  <textarea 
                    name="message"
                    className="custom-input" 
                    rows="8" 
                    placeholder="문의 내용을 입력해 주세요."
                    style={{ resize: 'none' }}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="agree-check">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    name="isAgreed"
                    className="me-2" 
                    checked={formData.isAgreed}
                    onChange={handleChange}
                  />
                  <label htmlFor="agree">개인정보 수집이용에 대한동의 *</label>
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? '전송 중...' : '신청하기'}
                </button>
              </form>
            </Col>

            {/* 우측: 유선상담 정보 */}
            <Col lg={6} className="ps-lg-5 contact-content-animate">
              <div className="info-group mb-5">
                <span className="info-label">Customer Center</span>
                <div className="info-phone">070-7709-2631</div>
              </div>

              <div className="info-group">
                <span className="info-label">Address</span>
                <p className="info-text mb-1">사무실 : 충청북도 청주시 흥덕구 오송읍 오송생명로 194 7층 702호</p>
                <p className="info-text">공장 : 충북 청주시 흥덕구 월명로 55번길 31</p>
              </div>

              <div className="info-group">
                <span className="info-label">Fax</span>
                <p className="info-text">043-266-2632</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BoardInquiry;
