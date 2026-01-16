import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const noticeApi = {
  // 공지사항 목록 조회
  getNotices: (page = 1, limit = 10) => 
    api.get('/notices', { params: { page, limit } }),

  // 공지사항 상세 조회
  getNoticeDetail: (id) => 
    api.get(`/notices/${id}`),

  // 공지사항 작성
  createNotice: (formData) => 
    api.post('/notices', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // 공지사항 수정
  updateNotice: (id, formData) => 
    api.put(`/notices/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // 공지사항 삭제
  deleteNotice: (id) => 
    api.delete(`/notices/${id}`),
};

export default noticeApi;
