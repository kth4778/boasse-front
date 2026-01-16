import React, { useState } from 'react';
import { products } from '../../api/productData';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = () => {

  const [activeCategory, setActiveCategory] = useState('전체');
  const containerRef = useRef();
  const headerBgRef = useRef();

  const filteredProducts = activeCategory === '전체' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const categories = ['All', 'Smart Mobility', 'Smart Factory', 'Smart Farm', 'Smart Building'];

  useGSAP(() => {
    // --- Product Grid Animation ---
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

    // --- Header Background Animation ---
    // Forest Layers Parallax
    gsap.to('.forest-layer-1', {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: headerBgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    gsap.to('.forest-layer-2', {
      y: -15,
      ease: "none",
      scrollTrigger: {
        trigger: headerBgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    // Leaf Particles Animation
    gsap.to('.leaf-particle', {
      y: 'random(-50, 50)',
      x: 'random(-30, 30)',
      rotation: 'random(-180, 180)',
      duration: 'random(3, 5)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });

  }, { scope: containerRef, dependencies: [filteredProducts] });

  return (
    <div ref={containerRef}>
      {/* 1. Full Width Header Section with Background */}
      <div className="product-header-bg-wrapper" ref={headerBgRef}>
        <div className="forest-bg">
          <div className="forest-layer forest-layer-1"></div>
          <div className="forest-layer forest-layer-2"></div>
          <div className="forest-light-rays"></div>
          {/* Leaf Particles */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`leaf-particle leaf-${i + 1}`}></div>
          ))}
        </div>

        {/* Header Content (Centered) */}
        <div className="product-container" style={{ paddingBottom: 0 }}>
          <div className="product-intro-section">
            <div className="product-header">
              <h1 className="product-title">Product</h1>
              <p className="product-description">
                효율적인 시스템 구축과 사용자 요구에 알맞는 커스터마이징 제품. 최고의 서비스와 품질.<br />
                다양한 산업 분야의 고객 요구를 반영한 제품들을 만나보세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Section (Tabs & Grid) */}
      <div className="product-container">
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
    </div>
  );
};

export default Product;
