import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import inquiryApi from '../../api/inquiryApi';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * [문의하기 페이지]
 * 고객이 회사에 문의를 남길 수 있는 폼과 회사의 연락처 정보(주소, 전화번호, 팩스)를 제공하는 페이지입니다.
 * 배경 애니메이션과 폼 등장 효과를 사용하여 시각적 완성도를 높였습니다.
 */
const Contact = () => {
  const wrapperRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isAgreed: false
  });

  // 페이지 스크롤 애니메이션 설정
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-dark-section',
        start: 'top 98%', // 화면 하단에 닿으면 시작
        toggleActions: 'play none none reverse'
      }
    });

    // 배경이 아래에서 위로 올라오는 효과
    tl.from('.contact-dark-section', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 0.6,
      ease: 'power2.out'
    })
    // 폼과 텍스트가 순차적으로 등장하는 효과
    .from('.contact-content-animate', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
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

  // 문의 폼 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.message || !formData.isAgreed) {
      alert('이름, 내용, 개인정보 동의는 필수입니다.');
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await inquiryApi.createInquiry(formData);

      if (response.status === 200 || response.status === 201 || response.data?.success) {
        alert('문의가 성공적으로 접수되었습니다.\n담당자가 확인 후 연락드리겠습니다.');
        setFormData({
          name: '',
          email: '',
          message: '',
          isAgreed: false
        });
      } else {
        console.warn('Unexpected response status:', response.status);
        alert('문의 접수에 실패했습니다. 관리자에게 문의해주세요.');
      }
    } catch (error) {
      console.error('문의 접수 실패:', error);
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
    <div className="contact-wrapper" ref={wrapperRef}>
      <section className="contact-dark-section">
        <div className="contact-bg-pattern"></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="gy-5 contact-content-animate">
            {/* 왼쪽 영역: 문의 작성 폼 */}
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

            {/* 오른쪽 영역: 고객센터 및 위치 정보 */}
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

export default Contact;