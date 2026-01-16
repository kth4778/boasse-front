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
- **About/Business**: 기업 소개 및 비즈니스 영역 안내.
- **Product**: 카테고리별 제품 필터링 및 상세 정보 제공.
- **Recruit/Notice**: 게시판 형태의 목록 및 상세 페이지, 파일 다운로드 지원.

### 3. 관리자 시스템 (Admin System)
- **접근 보안**: 별도의 로그인 페이지 없이 `/admin` 접속 시 비밀번호 인증 절차 수행.
- **통합 관리**: 공지사항, 채용공고, 제품 정보, 1:1 문의를 관리하는 대시보드.
- **CRUD 기능**: 게시물의 작성, 수정, 삭제 기능 및 에디터 지원.
- **오류 처리**: 백엔드 서버 연결 상태에 따른 직관적인 에러 피드백 제공.

## 🚀 시작하기 (Getting Started)

### 1. 환경 변수 설정 (.env)
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 설정하세요.
```env
# 백엔드 API 주소 (배포 시 설정)
VITE_API_BASE_URL=https://your-backend-api.com/api/v1

# 카카오 지도 API 키 (선택 사항)
VITE_KAKAO_APP_KEY=your_kakao_app_key

# 관리자 페이지 접속 비밀번호
VITE_ADMIN_PASSWORD=admin
```

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

## 🌐 배포 가이드 (Deployment)

이 프로젝트는 **Render**와 같은 정적 사이트 호스팅 서비스에 최적화되어 있습니다.

### Render (Static Site) 배포 설정
1. **서비스 유형**: Static Site 선택 (Web Service 아님)
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. **Environment Variables**: `VITE_API_BASE_URL` 등을 설정합니다.
5. **라우팅 처리**: 프로젝트 내 `public/_redirects` 파일이 포함되어 있어 SPA 라우팅(새로고침 시 404 방지)이 자동으로 처리됩니다.

## 📂 프로젝트 구조 (Project Structure)

```
src/
├── api/             # Axios API 설정 및 모듈
├── assets/          # 이미지, 폰트 등 정적 자원
├── components/      # UI 컴포넌트
│   ├── admin/       # 관리자 페이지 관련 컴포넌트
│   ├── Home/        # 메인 페이지 섹션
│   ├── Layout/      # Header, Footer
│   ├── Notice/      # 공지사항 관련
│   ├── product/     # 제품 소개 관련
│   ├── recruit/     # 채용 공고 관련
│   └── ...
├── hooks/           # 커스텀 React Hooks
├── App.jsx          # 라우팅 및 전체 레이아웃 구성
└── main.jsx         # 진입점 (Entry Point)
```

## 🎨 브랜드 컬러 (Brand Colors)

- **Primary Green**: `#8CC63F` (메인 로고 컬러)
- **Secondary Green**: `#1E2F23` (짙은 녹색, 포인트 컬러)
- **Text Color**: `#333333` (기본 텍스트)

---
Copyright © 2026 BOAS-SE All Rights Reserved.