import api from './axiosConfig';

export const recruitApi = {
  // 채용 공고 목록 조회
  getRecruits: async () => {
    return api.get('/recruits');
  },

  // 채용 공고 상세 조회
  getRecruitDetail: async (id) => {
    return api.get(`/recruits/${id}`);
  },

  // 채용 공고 작성 (Admin)
  createRecruit: async (data) => {
    return api.post('/recruits', data);
  },

  // 채용 공고 수정 (Admin)
  updateRecruit: async (id, data) => {
    return api.put(`/recruits/${id}`, data);
  },

  // 채용 공고 삭제 (Admin)
  deleteRecruit: async (id) => {
    return api.delete(`/recruits/${id}`);
  }
};

export default recruitApi;
