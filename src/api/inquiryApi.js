import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const inquiryApi = {
  // 문의 등록 (사용자)
  createInquiry: async (data) => {
    return api.post('/inquiries', data);
  },

  // 문의 목록 조회 (관리자)
  getInquiries: async (page = 1, limit = 10) => {
    return api.get('/inquiries', {
      params: { page, limit }
    });
  },

  // 문의 상세 조회 (관리자)
  getInquiryDetail: async (id) => {
    return api.get(`/inquiries/${id}`);
  },

  // 문의 삭제 (관리자)
  deleteInquiry: async (id) => {
    return api.delete(`/inquiries/${id}`);
  }
};

export default inquiryApi;
