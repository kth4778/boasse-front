import React, { useState, useRef } from 'react';
import { products } from '../../api/productData';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Product.css';

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const [filter, setFilter] = useState('All');
  const containerRef = useRef();
  const headerBgRef = useRef();

  const categories = ['All', 'Smart Mobility', 'Smart Factory', 'Smart Farm', 'Smart Building'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useGSAP(() => {
    // --- Header Background Animation ---
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

    // --- Product Grid Animation ---
    const cards = gsap.utils.toArray('.product-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.product-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

  }, { scope: containerRef, dependencies: [filter] });

  return (
    <div ref={containerRef} className="product-page-full-wrapper">
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

        <div className="product-container" style={{ paddingBottom: 0 }}>
          <div className="product-intro-section">
            <header className="product-header">
              <h1 className="product-title">PRODUCTS</h1>
              <p className="product-description">
                보아스소프트의 제품은 농가와 산업 현장의 효율을 극대화하고<br />
                지속 가능한 미래를 만들기 위한 스마트 솔루션을 지향합니다.
              </p>
            </header>
          </div>
        </div>
      </div>

      {/* 2. Main Content Section */}
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