import axios from 'axios';
import { products as initialProducts } from './productData';

const STORAGE_KEY = 'boasse_products';

// 로컬 스토리지에서 데이터 로드 (없으면 초기값 사용)
const loadData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  // 초기 데이터 저장
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  return [...initialProducts];
};

// 메모리 상의 데이터 (초기 로드)
let mockProducts = loadData();

// 데이터 저장 헬퍼
const saveData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  // 제품 목록 조회
  getProducts: async () => {
    // 조회 시마다 최신 스토리지 데이터 동기화 (탭 간 동기화 등을 위해 안전하게)
    mockProducts = loadData();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { success: true, data: mockProducts } });
      }, 100);
    });
  },

  // 제품 상세 조회
  getProductDetail: async (id) => {
    mockProducts = loadData();
    return new Promise(resolve => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === parseInt(id));
        resolve({ data: { success: true, data: product } });
      }, 100);
    });
  },

  // 제품 등록
  createProduct: async (data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newProduct = {
          ...data,
          id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
          createdAt: new Date().toISOString(),
          specs: typeof data.specs === 'string' ? JSON.parse(data.specs) : data.specs,
          features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features
        };
        mockProducts.push(newProduct);
        saveData(); // 저장
        resolve({ data: { success: true, data: newProduct } });
      }, 100);
    });
  },

  // 제품 수정
  updateProduct: async (id, data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        mockProducts = mockProducts.map(p => {
          if (p.id === parseInt(id)) {
            return { 
              ...p, 
              ...data,
              specs: typeof data.specs === 'string' ? JSON.parse(data.specs) : data.specs,
              features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features
            };
          }
          return p;
        });
        saveData(); // 저장
        resolve({ data: { success: true } });
      }, 100);
    });
  },

  // 제품 삭제
  deleteProduct: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        mockProducts = mockProducts.filter(p => p.id !== parseInt(id));
        saveData(); // 저장
        resolve({ data: { success: true } });
      }, 100);
    });
  }
};

export default productApi;
