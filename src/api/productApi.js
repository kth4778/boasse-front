import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    // 기본은 JSON, 파일 업로드 시에는 multipart/form-data가 자동 설정됨 (브라우저 동작)
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

  // 제품 등록 (Admin)
  createProduct: async (formData) => {
    // 명세에 따라 specs, features가 객체 상태라면 JSON.stringify 처리가 필요할 수 있음
    // (보통 FormData 생성 시점에서 처리해서 넘겨주거나 여기서 처리)
    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 제품 수정 (Admin)
  updateProduct: async (id, formData) => {
    return api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 제품 삭제 (Admin)
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  }
};

export default productApi;