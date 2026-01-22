import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import productApi from '../../api/productApi';
import { getImageUrl } from '../../utils/imageUtils';
import { FaArrowRight } from 'react-icons/fa';
import './ProductCards.css';

gsap.registerPlugin(ScrollTrigger);

const ProductCards = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null); // 흰색 박스
  const leftCardRef = useRef(null); // 검은색 카드
  const rightGridRef = useRef(null); // 오른쪽 그리드

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProducts();
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // GSAP 애니메이션 통합 관리
  useGSAP(() => {
    if (loading || products.length === 0) return;

    // 레이아웃 안정화 대기
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const mm = gsap.matchMedia();

    // PC 버전 (992px 이상) 애니메이션
    mm.add("(min-width: 992px)", () => {
      
      // 0. 초기 상태 강제 설정
      gsap.set(wrapperRef.current, { 
        width: '75%', 
        paddingTop: '80px',
        paddingBottom: '80px',
        borderRadius: '100px'
      });

      // 1. 흰색 박스 확장 및 축소 (Timeline) - 복구됨
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      tl.to(wrapperRef.current, {
        width: '88%',            
        paddingTop: '100px',
        paddingBottom: '100px',
        borderRadius: '60px',
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(wrapperRef.current, {
        width: '75%',            
        paddingTop: '80px',
        paddingBottom: '80px',
        borderRadius: '100px',
        duration: 1,
        ease: 'power2.inOut'
      });

      // 2. 검은색 카드 고정 (Manual Sticky via Translation)
      const getDist = () => {
        const rightH = rightGridRef.current?.offsetHeight || 0;
        const leftH = leftCardRef.current?.offsetHeight || 0;
        return rightH - leftH;
      };

      if (getDist() > 0) {
        gsap.to(leftCardRef.current, {
          y: getDist, 
          ease: "none", 
          scrollTrigger: {
            trigger: rightGridRef.current,
            start: "top top+=150", 
            end: () => `+=${getDist()}`, 
            scrub: 0, 
            invalidateOnRefresh: true, 
          }
        });
      }

      // 3. 오른쪽 카드 순차 등장 애니메이션은 떨림 방지를 위해 제거 상태 유지
      gsap.set('.masonry-item', { opacity: 1, y: 0 });
    });

    return () => {
      clearTimeout(timer);
      mm.revert(); // 미디어 쿼리 정리
    };

  }, { scope: sectionRef, dependencies: [loading, products] });

  const gridProducts = products.filter(p => p.isMainFeatured || p.mainFeatured);

  if (loading) return null;

  return (
    <section className="product-section" ref={sectionRef}>
      <div className="product-expand-wrapper" ref={wrapperRef}>
        <div className="pc-container">
          <div className="pc-grid">
            {/* Left: Sticky Card Area */}
            <div className="pc-left"> 
              {/* Pinning 대상 */}
              <div className="title-card" ref={leftCardRef}>
                <h2 className="title-card-head">OUR<br />PRODUCTS</h2>
                <p className="title-card-desc">
                  우리는 최첨단 기술과 혁신적인 아이디어를 결합하여
                  산업 현장과 일상 생활을 변화시키는 다양한 스마트 솔루션을 제공합니다.
                </p>
                <div className="mt-auto pt-4">
                  <Link to="/product" className="title-card-btn">
                    View All Products <FaArrowRight className="ms-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Product Grid Area */}
            <div className="pc-right" ref={rightGridRef}>
              <div className="masonry-grid">
                {gridProducts.length > 0 ? (
                  gridProducts.map((product, index) => {
                    const heightClass = ['tall', 'medium', 'short'][index % 3];
                    return (
                      <Link to={`/product/${product.id}`} key={product.id} className={`masonry-item ${heightClass}`}>
                        <div className="masonry-bg" style={{ backgroundImage: `url(${getImageUrl(product.image)})` }}></div>
                        <div className="masonry-overlay">
                          <span className="masonry-date">{product.category}</span>
                          <h3 className="masonry-title">{product.title}</h3>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-center py-5 w-100">
                    <p style={{ color: '#999' }}>메인에 노출된 제품이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
