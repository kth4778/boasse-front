import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
});

export const partnerApi = {
  // 파트너 목록 조회
  getPartners: async () => {
    return api.get('/partners');
  },

  // 파트너 상세 조회
  getPartnerDetail: async (id) => {
    return api.get(`/partners/${id}`);
  },

  // 파트너 등록 (Admin)
  createPartner: async (formData) => {
    return api.post('/partners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 파트너 수정 (Admin)
  updatePartner: async (id, formData) => {
    return api.put(`/partners/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 파트너 삭제 (Admin)
  deletePartner: async (id) => {
    return api.delete(`/partners/${id}`);
  }
};

export default partnerApi;
