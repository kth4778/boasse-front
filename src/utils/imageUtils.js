// 이미지 경로 처리 유틸리티
// 배포 환경에서 이미지가 백엔드 서버에 저장되어 있을 경우,
// 상대 경로를 백엔드 전체 URL로 변환해줍니다.

const BACKEND_URL = import.meta.env.VITE_API_URL_ORIGIN || '';

export const getImageUrl = (path) => {
  if (!path) return '';
  
  // 이미 완전한 URL인 경우 (http, https, blob, data)
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  
  // 상대 경로인 경우 백엔드 도메인을 붙여서 반환
  // path가 /로 시작하지 않으면 붙여줌
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // 백엔드 URL이 설정되어 있지 않다면 경로 그대로 반환 (혹은 로컬 프록시 사용 시)
  if (!BACKEND_URL) return path;

  return `${BACKEND_URL}${cleanPath}`;
};
