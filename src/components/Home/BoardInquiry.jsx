import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BoardInquiry.css';

gsap.registerPlugin(ScrollTrigger);

const BoardInquiry = () => {
  const wrapperRef = useRef(null);

  useGSAP(() => {
    // 문의하기 섹션 애니메이션 (배경 효과 포함)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-dark-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.contact-dark-section', {
      clipPath: 'inset(100% 0% 0% 0%)', // 아래에서 위로 커튼 열리듯 등장
      duration: 0.8, // 1.2 -> 0.8로 단축
      ease: 'power4.inOut'
    })
    .from('.contact-bg-pattern', {
      scale: 1.2,
      rotation: 5,
      opacity: 0,
      duration: 1.0, // 1.5 -> 1.0으로 단축
      ease: 'power2.out'
    }, '<') // 섹션 등장과 동시에 배경 애니메이션 시작
    .from('.contact-content-animate', { // 내부 컨텐츠들
      y: 30,
      opacity: 0,
      duration: 0.5, // 0.8 -> 0.5로 단축
      stagger: 0.1 // 0.2 -> 0.1로 단축
    }, '-=0.3'); // 시작 타이밍 미세 조정

  }, { scope: wrapperRef });

  return (
    <div className="board-inquiry-wrapper" ref={wrapperRef}>
      
      {/* 문의하기 (Dark Section) - Notice 영역 제거됨 */}
      <section className="contact-dark-section">
        <div className="contact-bg-pattern"></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="gy-5 contact-content-animate">
            {/* 좌측: 문의 폼 */}
            <Col lg={6}>
              <h3 className="dark-section-title">문의</h3>
              <form>
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

export default BoardInquiry;
