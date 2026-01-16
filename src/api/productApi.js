import axios from 'axios';
import { products as initialProducts } from './productData';

// 실제 백엔드 연동 전까지 사용할 목업 데이터
let mockProducts = [...initialProducts];

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  // 제품 목록 조회
  getProducts: async () => {
    // 실제 API 연동 시: return api.get('/products');
    return { data: { success: true, data: mockProducts } };
  },

  // 제품 상세 조회
  getProductDetail: async (id) => {
    // 실제 API 연동 시: return api.get(`/products/${id}`);
    const product = mockProducts.find(p => p.id === parseInt(id));
    return { data: { success: true, data: product } };
  },

  // 제품 등록
  createProduct: async (data) => {
    // 실제 API 연동 시: return api.post('/products', data);
    const newProduct = {
      ...data,
      id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
      createdAt: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return { data: { success: true, data: newProduct } };
  },

  // 제품 수정
  updateProduct: async (id, data) => {
    // 실제 API 연동 시: return api.put(`/products/${id}`, data);
    mockProducts = mockProducts.map(p => p.id === parseInt(id) ? { ...p, ...data } : p);
    return { data: { success: true } };
  },

  // 제품 삭제
  deleteProduct: async (id) => {
    // 실제 API 연동 시: return api.delete(`/products/${id}`);
    mockProducts = mockProducts.filter(p => p.id !== parseInt(id));
    return { data: { success: true } };
  }
};

export default productApi;
