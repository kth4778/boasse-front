import api from './axiosConfig';

export const inquiryApi = {
  // 문의 등록 (사용자)
  createInquiry: async (data) => {
    return api.post('/inquiries', data);
  },

  // 문의 목록 조회 (Admin)
  getInquiries: async (page = 1, limit = 10) => {
    return api.get('/inquiries', {
      params: { page, limit }
    });
  },

  // 문의 상세 조회 (Admin)
  getInquiryDetail: async (id) => {
    return api.get(`/inquiries/${id}`);
  },

  // 문의 삭제 (Admin)
  deleteInquiry: async (id) => {
    return api.delete(`/inquiries/${id}`);
  }
};

export default inquiryApi;