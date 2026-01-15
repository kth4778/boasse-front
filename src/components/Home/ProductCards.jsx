import React from 'react';
import './ProductCards.css';

const ProductCards = () => {
  const products = [
    { id: 1, title: 'Smart Factory', desc: '제조 공정의 혁신적인 디지털 전환' },
    { id: 2, title: 'Smart Mobility', desc: '안전하고 효율적인 지능형 모빌리티' },
    { id: 3, title: 'Smart Farm', desc: '데이터 기반의 정밀 농업 솔루션' },
  ];

  return (
    <div className="home-product-cards">
      <h2 className="home-product-title">Our Products</h2>
      <div className="home-cards-grid">
        {products.map((item) => (
          <div key={item.id} className="home-card">
            <div className="home-card-img"></div>
            <div className="home-card-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
