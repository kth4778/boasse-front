import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recruitApi = {
  // 채용 공고 목록 조회
  getRecruits: async () => {
    return api.get('/recruits');
  },

  // 채용 공고 상세 조회
  getRecruitDetail: async (id) => {
    return api.get(`/recruits/${id}`);
  },

  // 채용 공고 작성
  createRecruit: async (data) => {
    return api.post('/recruits', data);
  },

  // 채용 공고 수정
  updateRecruit: async (id, data) => {
    return api.put(`/recruits/${id}`, data);
  },

  // 채용 공고 삭제
  deleteRecruit: async (id) => {
    return api.delete(`/recruits/${id}`);
  }
};

export default recruitApi;