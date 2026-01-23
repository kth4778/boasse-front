# BOAS-SE Corporate Website

BOAS-SE(보스에스이)의 공식 웹사이트 프론트엔드 프로젝트입니다.
React 19와 Vite를 기반으로 구축되었으며, 기업의 브랜드 아이덴티티인 녹색(Green) 테마와 GSAP 애니메이션을 적용하여 신뢰감 있고 역동적인 UI를 제공합니다.

## 🛠 기술 스택 (Tech Stack)

- **Framework**: React 19, Vite
- **Routing**: React Router 7
- **Styling**: Bootstrap 5, React-Bootstrap, Sass (SCSS)
- **Animation**: GSAP (GreenSock), ScrollTrigger
- **UI Components**: Swiper (슬라이더), React Icons
- **API**: Axios

## ✨ 주요 기능 (Features)

### 1. 사용자 경험 (User Experience)
- **반응형 디자인**: 모바일, 태블릿, 데스크탑 등 모든 디바이스에 최적화된 레이아웃.
- **GSAP 애니메이션**: 스크롤에 반응하는 고급 인터랙션 및 요소 등장 애니메이션 적용.
- **동적 헤더**: 페이지 스크롤 및 경로에 따라 스타일이 변하는 반응형 헤더.

### 2. 주요 페이지 구성
- **Home**: 풀스크린 히어로 슬라이더, 제품/서비스 소개, 설치 사례 캐러셀 등.
- **About/Business**: 기업 소개 및 비즈니스 영역(스마트 팩토리, 스마트 팜 등) 안내.
- **Product**: 카테고리별 제품 필터링 및 상세 정보 제공.
- **Recruit/Notice**: 게시판 형태의 목록 및 상세 페이지, 파일 다운로드 지원.

### 3. 관리자 시스템 (Admin System)
- **접근 보안**: 별도의 로그인 페이지(`/admin/login`)를 통한 관리자 인증.
- **통합 관리**: 공지사항, 채용공고, 제품 정보, 1:1 문의를 관리하는 대시보드.
- **CRUD 기능**: 게시물의 작성, 수정, 삭제 기능 및 에디터 지원.
- **오류 처리**: 백엔드 서버 연결 상태에 따른 직관적인 에러 피드백 제공.

## 🚀 시작하기 (Getting Started)

### 1. 필수 사항 (Prerequisites)
- Node.js 18.0.0 이상
- npm 또는 yarn

### 2. 설치 및 실행
```bash
# 저장소 클론
git clone <repository-url>
cd boasse-front

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

### 3. 환경 변수 설정 (.env)
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 설정하세요.

> **⚠️ 보안 주의**: `VITE_ADMIN_PASSWORD`는 클라이언트 코드에 노출되므로, 실제 운영 환경에서는 강력한 백엔드 인증 방식을 사용하는 것을 권장합니다.

```env
# [필수] 백엔드 API 기본 경로
# 개발 환경(Dev): /api/v1 (vite.config.js의 proxy 설정 사용)
# 배포 환경(Prod): https://boasse-backend.onrender.com/api/v1 (실제 백엔드 주소 전체)
VITE_API_BASE_URL=/api/v1

# [선택] 카카오 지도 API 키
VITE_KAKAO_APP_KEY=your_kakao_app_key

# [필수] 관리자 페이지 접속 비밀번호 (간편 인증용)
VITE_ADMIN_PASSWORD=admin
```

## 🌐 배포 가이드 (Deployment)

이 프로젝트는 **Render**, **Vercel**, **Netlify**와 같은 정적 사이트 호스팅 서비스에 최적화되어 있습니다.

### Render 배포 설정 (권장)
1. **서비스 유형**: Static Site 선택
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. **Environment Variables**:
    - `VITE_API_BASE_URL`: `https://boasse-backend.onrender.com/api/v1` (반드시 백엔드 도메인 포함)
    - `VITE_KAKAO_APP_KEY`: 배포 도메인이 등록된 카카오 앱 키
    - `VITE_ADMIN_PASSWORD`: 관리자 비밀번호
5. **SPA 라우팅**: `public/_redirects` 파일이 존재하므로 별도 설정 없이 SPA 라우팅이 지원됩니다.

### 기타 서버 (Nginx 등)
SPA 특성상 모든 요청을 `index.html`로 리다이렉트하는 설정이 필요합니다.
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 📂 프로젝트 구조 (Project Structure)

```
src/
├── api/             # Axios API 설정 (Interceptors, Endpoints)
├── assets/          # 로고, 이미지, 폰트 등 정적 자원
├── components/      # UI 컴포넌트
│   ├── admin/       # 관리자 기능 (로그인, 대시보드, 리스트/폼)
│   ├── business/    # 사업 소개 페이지
│   ├── contact/     # 문의하기
│   ├── Home/        # 메인 페이지 섹션 (슬라이더, 소개)
│   ├── Layout/      # Header, Footer, 공통 레이아웃
│   ├── Notice/      # 공지사항 (목록, 상세, 작성)
│   ├── product/     # 제품 소개 (목록, 상세)
│   ├── recruit/     # 채용 공고
│   └── about/       # 회사 소개 및 오시는 길
├── hooks/           # 커스텀 React Hooks
├── context/         # 전역 상태 관리 (Context API)
├── utils/           # 유틸리티 함수
├── App.jsx          # 라우팅 및 전체 레이아웃 구성
└── main.jsx         # 진입점 (Entry Point)
```

## 🎨 브랜드 컬러 (Brand Colors)

- **Primary Green**: `#8CC63F` (BOAS-SE 메인 컬러)
- **Dark Green**: `#1E2F23` (강조 및 텍스트)
- **Text Color**: `#333333` (기본 텍스트)
- **Background**: `#FFFFFF` (기본 배경) / `#F5F5F5` (섹션 배경)

---
Copyright © 2026 BOAS-SE All Rights Reserved.
