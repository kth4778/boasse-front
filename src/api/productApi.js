import api from './axiosConfig';

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
    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 제품 수정
  updateProduct: async (id, formData) => {
    return api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 제품 삭제
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  }
};

export default productApi;