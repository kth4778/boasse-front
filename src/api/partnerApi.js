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
    
    // 백엔드 기본 URL 설정 (프로덕션 환경 대응)
    const backendUrl = 'https://boasse-backend.onrender.com';
    
    // path가 /api로 시작하면 백엔드 주소만 붙임
    if (path.startsWith('/')) {
      return `${backendUrl}${path}`;
    }
    return `${backendUrl}/${path}`;
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
