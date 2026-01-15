import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { products } from '../../api/productData';
import './Product.css';

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const containerRef = useRef();

  const filteredProducts = activeCategory === '전체' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const categories = ['전체', 'Smart Factory', 'Smart Mobility', 'Smart Farm', 'Smart Building'];

  useGSAP(() => {
    gsap.set('.product-card', { y: 100, opacity: 0 });
    ScrollTrigger.batch('.product-card', {
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true
        });
      }
    });
    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [filteredProducts] });

  return (
    <div className="product-container" ref={containerRef}>
      <div className="product-intro-section">
        <div className="product-header">
          <h1 className="product-title">Product</h1>
          <p className="product-description">
            효율적인 시스템 구축과 사용자 요구에 알맞는 커스터마이징 제품. 최고의 서비스와 품질.<br />
            다양한 산업 분야의 고객 요구를 반영한 제품들을 만나보세요.
          </p>
        </div>

        <div className="product-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`product-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-card">
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
  );
};

export default Product;
