import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    // 기본은 JSON, 파일 업로드 시에는 multipart/form-data가 자동 설정됨
  },
});

export const productApi = {
  // 제품 목록 조회
  getProducts: async () => {
    return api.get('/products');
  },

  // 제품 상세 조회
  getProductDetail: async (id) => {
    return api.get(`/products/${id}`);
  },

  // 제품 등록
  createProduct: async (formData) => {
    return api.post('/products', formData);
  },

  // 제품 수정
  updateProduct: async (id, formData) => {
    return api.put(`/products/${id}`, formData);
  },

  // 제품 삭제
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  }
};

export default productApi;