// 백엔드 API 개발이 중단되었으므로, 브라우저의 localStorage를 사용하여
// 실제 데이터를 영구적으로 저장하고 관리하는 'Client-side Database' 로직으로 변경합니다.

const STORAGE_KEY = 'boasse_inquiries';

// 로컬 스토리지에서 데이터 가져오기 헬퍼
const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 로컬 스토리지에 데이터 저장하기 헬퍼
const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const inquiryApi = {
  // 문의 등록 (사용자)
  createInquiry: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inquiries = getStorageData();
        const newInquiry = {
          ...data,
          id: Date.now(), // 고유 ID로 타임스탬프 사용
          createdAt: new Date().toISOString(),
          isRead: false
        };
        // 최신순 정렬을 위해 앞에 추가
        const updatedInquiries = [newInquiry, ...inquiries];
        setStorageData(updatedInquiries);
        
        console.log('문의 저장 완료(Local):', newInquiry);
        resolve({ data: { success: true, data: newInquiry } });
      }, 300); // 실제 네트워크 지연 같은 느낌을 위해 약간의 딜레이
    });
  },

  // 문의 목록 조회 (관리자)
  getInquiries: async (page = 1, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inquiries = getStorageData();
        
        // 페이지네이션 로직
        const start = (page - 1) * limit;
        const end = start + limit;
        const pagedInquiries = inquiries.slice(start, end);
        
        resolve({
          data: {
            success: true,
            data: {
              inquiries: pagedInquiries,
              pagination: {
                totalCount: inquiries.length,
                totalPages: Math.ceil(inquiries.length / limit) || 1,
                currentPage: page
              }
            }
          }
        });
      }, 300);
    });
  },

  // 문의 상세 조회 (관리자)
  getInquiryDetail: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inquiries = getStorageData();
        // ID는 저장 시 숫자(Date.now)였으나 URL 파라미터는 문자열일 수 있으므로 비교 시 주의
        const inquiry = inquiries.find(item => item.id == id);
        
        if (inquiry) {
          resolve({ data: { success: true, data: inquiry } });
        } else {
          // 데이터가 없을 경우 success: false 반환
          resolve({ data: { success: false, message: 'Inquiry not found' } });
        }
      }, 300);
    });
  },

  // 문의 삭제 (관리자)
  deleteInquiry: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inquiries = getStorageData();
        const updatedInquiries = inquiries.filter(item => item.id != id);
        setStorageData(updatedInquiries);
        
        resolve({ data: { success: true } });
      }, 300);
    });
  }
};

export default inquiryApi;
