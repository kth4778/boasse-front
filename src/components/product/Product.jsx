import React, { useState } from 'react';
import { products } from '../../api/productData';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Smart Mobility', 'Smart Factory', 'Smart Farm', 'Smart Building'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="product-container">
      <div className="product-intro-section">
        <header className="product-header">
          <h1 className="product-title">PRODUCTS</h1>
          <p className="product-description">
            보아스소프트의 제품은 농가와 산업 현장의 효율을 극대화하고<br />
            지속 가능한 미래를 만들기 위한 스마트 솔루션을 지향합니다.
          </p>
        </header>

        <div className="product-tabs">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`product-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-card-image" />
              <div className="product-card-content">
                <div className="product-card-tags">
                  <span className="product-tag">{product.category}</span>
                </div>
                <h3 className="product-card-title">{product.title}</h3>
                <p className="product-card-desc">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
