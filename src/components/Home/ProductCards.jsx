import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './ProductCards.css';

const ProductCards = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  // TODO: [DATA] 제품 목록 데이터 수정
  const products = [
    {
      id: 1,
      category: '제품 카테고리 1',
      desc: '제품에 대한 간단한 설명',
      image: 'https://images.unsplash.com/photo-1595854848297-b8f2d573c004?auto=format&fit=crop&w=600&q=80', // TODO: 실제 제품 이미지로 교체
      link: '/product-category-1'
    },
    {
      id: 2,
      category: '제품 카테고리 2',
      desc: '제품 특징 요약',
      image: 'https://images.unsplash.com/photo-1541625902347-9759d57a41da?auto=format&fit=crop&w=600&q=80',
      link: '/product-category-2'
    },
    {
      id: 3,
      category: '제품 카테고리 3',
      desc: '대표 모델명 또는 설명',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
      link: '/product-category-3'
    },
    {
      id: 4,
      category: '제품 카테고리 4',
      desc: '맞춤 제작 가능 여부 등',
      image: 'https://images.unsplash.com/photo-1581093458891-b9883f8b92b9?auto=format&fit=crop&w=600&q=80',
      link: '/product-category-4'
    }
  ];

  return (
    <section className="product-section" ref={elementRef}>
      <Container>
        <Row className="g-4">
          {products.map((item, index) => (
            <Col key={item.id} lg={3} md={6} sm={12}>
              <a 
                href={item.link} 
                className={`product-card apple-card apple-reveal ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div 
                  className="product-bg" 
                  style={{ backgroundImage: `url(${item.image})` }} 
                />
                <div className="product-overlay">
                  <h3 className="product-category">{item.category}</h3>
                  <p className="product-desc">{item.desc}</p>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProductCards;