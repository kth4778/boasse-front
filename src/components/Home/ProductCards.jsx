import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ProductCards.css';

const ProductCards = () => {
  const products = [
    {
      id: 1,
      category: '분진',
      desc: '에어펄스 집진기 SA-Series',
      image: 'https://via.placeholder.com/400x600/333333/ffffff?text=Dust',
      link: '/products/dust'
    },
    {
      id: 2,
      category: '미스트',
      desc: '오일미스트 집진기 SO-Series',
      image: 'https://via.placeholder.com/400x600/555555/ffffff?text=Mist',
      link: '/products/mist'
    },
    {
      id: 3,
      category: '냄새',
      desc: '소형 흡착탑 집진기 SAC-Series',
      image: 'https://via.placeholder.com/400x600/777777/ffffff?text=Smell',
      link: '/products/smell'
    },
    {
      id: 4,
      category: '제작형',
      desc: '제작형 백필터 집진기 SSA-Series',
      image: 'https://via.placeholder.com/400x600/999999/ffffff?text=Custom',
      link: '/products/custom'
    }
  ];

  return (
    <section className="product-section">
      <Container>
        <Row className="g-4">
          {products.map((item) => (
            <Col key={item.id} lg={3} md={6} sm={12}>
              <a href={item.link} className="product-card">
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
