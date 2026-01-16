import React, { useState, useRef, useEffect } from 'react';
import { products } from '../../api/productData';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Product.css';

gsap.registerPlugin(ScrollTrigger);

const Product = () => {
  const [filter, setFilter] = useState('All');
  const containerRef = useRef();

  // 페이지 진입 시 스크롤 최상단 이동 및 브라우저 기본 복원 방지
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const categories = ['All', 'Smart Mobility', 'Smart Factory', 'Smart Farm', 'Smart Building'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useGSAP(() => {
    // --- Hero Animation ---
    // 초기 상태 설정
    gsap.set('.animate-up', { opacity: 0, y: 20 });
    
    const heroElements = gsap.utils.toArray('.product-hero .animate-up');
    if (heroElements.length > 0) {
      gsap.to(heroElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }

    // --- Product Grid Animation ---
    const cards = gsap.utils.toArray('.product-card');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          onComplete: () => {
             gsap.set(cards, { clearProps: "all" });
          }
        }
      );
    }

  }, { scope: containerRef, dependencies: [filter] });

  return (
    <div ref={containerRef} className="product-page-full-wrapper">
      {/* 1. Hero Section (Recruit Style) */}
      <section className="product-hero">
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-main-title animate-up">
              농가와 산업 현장의<br /><span>스마트 솔루션</span>을 경험하세요.
            </h1>
            <p className="hero-desc animate-up">
              보아스소프트의 제품은 효율을 극대화하고 지속 가능한 미래를 만듭니다.
            </p>
          </div>
        </Container>
      </section>

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