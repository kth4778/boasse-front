import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const wrapperRef = useRef(null);
  const [submitting, setSubmitting] = React.useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // 즉각적인 피드백을 위해 0.8초 후 알림 표시 (실제 API 연동 시 이 부분을 수정)
    setTimeout(() => {
      alert('문의가 접수되었습니다. 빠르게 확인 후 답변드리겠습니다.');
      setSubmitting(false);
      e.target.reset();
    }, 800);
  };

  return (
    <div className="contact-wrapper" ref={wrapperRef}>
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
                  <input type="text" className="custom-input" placeholder="이름을 입력해 주세요." />
                </div>
                <div className="custom-input-group">
                  <label className="input-label">Email</label>
                  <input type="email" className="custom-input" placeholder="E-mail을 입력해 주세요." />
                </div>
                <div className="custom-input-group" style={{ alignItems: 'flex-start' }}>
                  <label className="input-label" style={{ marginTop: '5px' }}>Message *</label>
                  <textarea 
                    className="custom-input" 
                    rows="3" 
                    placeholder="문의 내용을 입력해 주세요."
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                
                <div className="agree-check">
                  <input type="checkbox" id="agree" className="me-2" />
                  <label htmlFor="agree">개인정보 수집이용에 대한동의 *</label>
                </div>

                <button type="submit" className="submit-btn">신청하기</button>
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

export default Contact;
