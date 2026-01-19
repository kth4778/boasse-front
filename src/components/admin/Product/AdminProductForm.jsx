import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';
import { 
  FaSave, FaTimes, FaImage, FaList, FaArrowLeft, FaPaperPlane, FaCheckCircle,
  FaChartLine, FaBrain, FaShieldAlt, FaLeaf, FaBolt, FaMobileAlt, FaCog, FaDatabase, FaServer, FaCloud
} from 'react-icons/fa';
import productApi from '../../../api/productApi';

// 스타일 시트 임포트
import '../../product/ProductDetail.css';
import './AdminProductEditor.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// --- 아이콘 매핑 & 선택기 ---
const ICON_MAP = {
  'FaChartLine': <FaChartLine />,
  'FaBrain': <FaBrain />,
  'FaShieldAlt': <FaShieldAlt />,
  'FaLeaf': <FaLeaf />,
  'FaBolt': <FaBolt />,
  'FaMobileAlt': <FaMobileAlt />,
  'FaCheckCircle': <FaCheckCircle />,
  'FaCog': <FaCog />,
  'FaDatabase': <FaDatabase />,
  'FaServer': <FaServer />,
  'FaCloud': <FaCloud />
};

const IconPicker = ({ currentIconName, onSelect, onClose }) => {
  return (
    <div className="icon-picker-modal">
      <div className="icon-picker-content">
        <h4>아이콘 선택</h4>
        <div className="icon-grid">
          {Object.keys(ICON_MAP).map(iconName => (
            <div 
              key={iconName} 
              className={`icon-item ${currentIconName === iconName ? 'active' : ''}`}
              onClick={() => onSelect(iconName)}
            >
              {ICON_MAP[iconName]}
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

// 초기값 상수 분리
const INITIAL_SPECS = [
  { icon: 'FaChartLine', label: 'Label', highlight: 'Highlight', text: '설명을 입력하세요' },
  { icon: 'FaBrain', label: 'Label', highlight: 'Highlight', text: '설명을 입력하세요' },
  { icon: 'FaShieldAlt', label: 'Label', highlight: 'Highlight', text: '설명을 입력하세요' },
  { icon: 'FaMobileAlt', label: 'Label', highlight: 'Highlight', text: '설명을 입력하세요' }
];

const INITIAL_FEATURES = [
  { title: '기능 제목 1', desc: '상세한 기능 설명을 입력해주세요.' },
  { title: '기능 제목 2', desc: '상세한 기능 설명을 입력해주세요.' },
  { title: '기능 제목 3', desc: '상세한 기능 설명을 입력해주세요.' },
  { title: '기능 제목 4', desc: '상세한 기능 설명을 입력해주세요.' }
];

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const fileInputRef = React.useRef(null);

  // --- State ---
  const [formData, setFormData] = useState({
    title: '',
    category: 'Smart Farm',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800',
    description: '',
    detail: '',
    isMainFeatured: false,
    specs: INITIAL_SPECS,
    features: INITIAL_FEATURES
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // 아이콘 선택기 상태
  const [iconPickerState, setIconPickerState] = useState({ show: false, targetIndex: null });

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id, isEdit]);

  const fetchDetail = async () => {
    try {
      const response = await productApi.getProductDetail(id);
      if (response.data.success) {
        const data = response.data.data;
        // 데이터 병합 시 specs/features가 없으면 초기값 사용
        setFormData(prev => ({
          ...prev,
          ...data,
          specs: data.specs && Array.isArray(data.specs) && data.specs.length > 0 ? data.specs : INITIAL_SPECS,
          features: data.features && Array.isArray(data.features) && data.features.length > 0 ? data.features : INITIAL_FEATURES
        }));
      }
    } catch (error) {
      console.error('불러오기 실패:', error);
      navigate('/admin/product');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Specs 변경 핸들러
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...(formData.specs || INITIAL_SPECS)];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  // Features 변경 핸들러
  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...(formData.features || INITIAL_FEATURES)];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // 아이콘 선택 핸들러
  const openIconPicker = (index) => {
    setIconPickerState({ show: true, targetIndex: index });
  };

  const handleIconSelect = (iconName) => {
    if (iconPickerState.targetIndex !== null) {
      handleSpecChange(iconPickerState.targetIndex, 'icon', iconName);
    }
    setIconPickerState({ show: false, targetIndex: null });
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      alert('제품명은 필수입니다.');
      return;
    }
    setLoading(true);
    try {
      let dataToSend = formData;
      const isMultipart = !!imageFile;

      if (isMultipart) {
        const form = new FormData();
        form.append('category', formData.category);
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('detail', formData.detail);
        form.append('isMainFeatured', formData.isMainFeatured);
        form.append('specs', JSON.stringify(formData.specs));
        form.append('features', JSON.stringify(formData.features));
        
        if (imageFile) form.append('image', imageFile);
      } else {
        dataToSend = { ...formData };
      }

      if (isEdit) {
        await productApi.updateProduct(id, dataToSend);
      } else {
        await productApi.createProduct(dataToSend);
      }
      alert('저장되었습니다.');
      navigate('/admin/product');
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const bgStyle = { backgroundImage: `url(${formData.image})` };

  return (
    <div className="admin-editor-wrapper pd-container">
      {/* --- 상단 고정 에디터 툴바 --- */}
      <div className="editor-top-toolbar">
        <div className="toolbar-left">
          <button className="toolbar-btn back" onClick={() => navigate('/admin/product')}>
            <FaArrowLeft /> 목록으로
          </button>
          <div className="toolbar-divider" />
          <div className="toolbar-item">
            <label>카테고리</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Smart Mobility">Smart Mobility</option>
              <option value="Smart Factory">Smart Factory</option>
              <option value="Smart Farm">Smart Farm</option>
              <option value="Smart Building">Smart Building</option>
            </select>
          </div>
          <div className="toolbar-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', paddingTop: '18px' }}>
            <input 
              type="checkbox" 
              id="isMainFeatured"
              name="isMainFeatured" 
              checked={formData.isMainFeatured} 
              onChange={handleChange}
              style={{ width: '18px', height: '18px', cursor: 'pointer', margin: 0 }}
            />
            <label htmlFor="isMainFeatured" style={{ margin: 0, cursor: 'pointer', fontSize: '0.85rem', color: '#fff' }}>메인 노출</label>
          </div>
          <div className="toolbar-item" style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label>이미지 소스 (URL 또는 파일)</label>
              <div className="d-flex gap-2">
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  placeholder="이미지 URL 입력..."
                  style={{ width: '100%' }}
                />
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
                <button 
                  className="toolbar-btn" 
                  style={{ background: '#444', color: '#fff', whiteSpace: 'nowrap' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaImage /> 파일 선택
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn save" onClick={handleSubmit} disabled={loading}>
            <FaSave /> {loading ? '저장 중...' : '게시하기'}
          </button>
        </div>
      </div>

      {/* --- 배경 레이어 --- */}
      <div className="pd-bg-container">
        <div className={`pd-bg-image ${activeIndex === 0 ? 'active' : ''}`} style={bgStyle}>
          <div className="pd-bg-overlay"></div>
        </div>
        <div className={`pd-bg-image darker ${activeIndex === 1 ? 'active' : ''}`} style={bgStyle}>
          <div className="pd-bg-overlay"></div>
        </div>
        <div className={`pd-bg-image darker ${activeIndex === 2 ? 'active' : ''}`} style={bgStyle}>
          <div className="pd-bg-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}></div>
        </div>
        <div className={`pd-bg-image ${activeIndex === 3 ? 'active' : ''}`} style={bgStyle}>
           <div className="pd-bg-overlay" style={{ backgroundColor: '#000' }}></div>
        </div>
      </div>

      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        speed={1000}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination, EffectFade]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="pd-swiper"
      >
        {/* Slide 1: Hero (Editable) */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content editable">
            <span className="pd-category">{formData.category}</span>
            <input 
              className="pd-title-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제품명을 입력하세요"
            />
            <textarea 
              className="pd-desc-input"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="리스트에 보여질 짧은 설명을 입력하세요"
              rows={2}
            />
          </div>
        </SwiperSlide>

        {/* Slide 2: Key Performance (Editable) */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <h2 className="pd-section-title">Key Performance</h2>
            <div className="pd-bento-grid">
              {(formData.specs || INITIAL_SPECS).map((spec, idx) => (
                <div key={idx} className={`pd-bento-card editable-card ${idx === 1 || idx === 2 ? '' : ''}`}>
                  <div className="card-icon" onClick={() => openIconPicker(idx)} title="아이콘 변경">
                    {ICON_MAP[spec.icon] || <FaCheckCircle />}
                  </div>
                  <input 
                    className="card-input label"
                    value={spec.label} 
                    onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                    placeholder="Label"
                  />
                  <input 
                    className="card-input highlight"
                    value={spec.highlight} 
                    onChange={(e) => handleSpecChange(idx, 'highlight', e.target.value)}
                    placeholder="Highlight"
                  />
                  <input 
                    className="card-input text"
                    value={spec.text} 
                    onChange={(e) => handleSpecChange(idx, 'text', e.target.value)}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Detailed Features (Editable) */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <h2 className="pd-section-title">Detail Features</h2>
            <div className="pd-feature-grid">
              {(formData.features || INITIAL_FEATURES).map((f, idx) => (
                <div key={idx} className="pd-feature-item editable-feature">
                  <FaCheckCircle className="pd-feature-icon" />
                  <div className="pd-feature-content" style={{ width: '100%' }}>
                    <input 
                      className="feature-input title"
                      value={f.title}
                      onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                      placeholder="기능 제목"
                    />
                    <textarea 
                      className="feature-input desc"
                      value={f.desc}
                      onChange={(e) => handleFeatureChange(idx, 'desc', e.target.value)}
                      placeholder="기능 설명"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: CTA Preview */}
        <SwiperSlide className="pd-slide">
          <div className="pd-content">
            <h2 className="pd-title" style={{ fontSize: '3.5rem' }}>Ready to Innovate?</h2>
            <p className="pd-desc" style={{ marginBottom: '3rem' }}>
              모든 설정이 완료되었습니다. 우측 상단의 [게시하기] 버튼을 눌러주세요.
            </p>
            <div className="pd-btn-group" style={{ opacity: 0.5, pointerEvents: 'none' }}>
              <button className="pd-btn-back">뒤로 가기</button>
              <button className="pd-btn-inquiry">도입 문의하기</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      
      {/* 아이콘 선택 모달 */}
      {iconPickerState.show && (
        <IconPicker 
          currentIconName={(formData.specs || INITIAL_SPECS)[iconPickerState.targetIndex].icon}
          onSelect={handleIconSelect}
          onClose={() => setIconPickerState({ show: false, targetIndex: null })}
        />
      )}
    </div>
  );
};

export default AdminProductForm;
