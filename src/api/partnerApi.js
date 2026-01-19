import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const partnerApi = {
  // 실제 이미지 URL을 생성하는 헬퍼 함수
  getImageUrl: (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // VITE_API_BASE_URL이 상대경로(/api/v1)인 경우와 절대경로인 경우 대응
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl && baseUrl.startsWith('http')) {
      const origin = new URL(baseUrl).origin;
      return `${origin}${path}`;
    }
    return path;
  },

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
