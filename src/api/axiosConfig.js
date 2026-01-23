import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: 요청 보낼 때 토큰이 있으면 헤더에 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 응답 받을 때 401 에러(인증 실패) 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 발생 시
    if (error.response && error.response.status === 401) {
      // 토큰 삭제 및 관리자 로그인 페이지로 이동 (현재 페이지가 로그인 페이지가 아닐 경우에만)
      if (!window.location.pathname.includes('/admin/login')) {
        localStorage.removeItem('accessToken');
        window.location.href = '/admin/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;
