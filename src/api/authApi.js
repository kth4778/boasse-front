import api from './axiosConfig';

export const authApi = {
  // 관리자 로그인 (비밀번호만 사용)
  login: async (password) => {
    return api.post('/auth/login', { password });
  },

  // 토큰 유효성 검증 (새로고침 시 사용)
  verifyToken: async () => {
    return api.get('/auth/verify');
  }
};

export default authApi;
