# BOAS-SE Corporate Website

BOAS-SE(보스에스이)의 공식 웹사이트 프론트엔드 프로젝트입니다.
React 19와 Vite를 기반으로 구축되었으며, 기업의 브랜드 아이덴티티인 녹색(Green) 테마를 적용하여 신뢰감 있고 모던한 UI를 제공합니다.

## 🛠 기술 스택 (Tech Stack)

- **Core**: React 19, Vite
- **Styling**: Bootstrap 5, React-Bootstrap, Custom CSS
- **Icons**: React Icons (Font Awesome 등)
- **Slider**: Swiper.js

## ✨ 주요 기능 (Features)

1.  **반응형 헤더 (Responsive Header)**
    - 메인 히어로 섹션에서는 투명 배경을 유지하여 개방감을 줍니다.
    - 스크롤이 콘텐츠 영역으로 넘어가면 흰색 배경으로 전환되어 가독성을 확보합니다.

2.  **메인 히어로 슬라이더 (Hero Slider)**
    - Swiper를 활용한 풀스크린 이미지 슬라이더.
    - 텍스트와 버튼에 순차적인 페이드 인(Fade-in) 애니메이션 적용.
    - 브랜드 컬러(#8CC63F)를 활용한 키워드 강조.

3.  **서비스 및 제품 소개 (Info & Products)**
    - 아이콘과 함께 주요 서비스를 직관적으로 보여주는 Info Section.
    - 마우스 호버 시 브랜드 컬러 그라데이션 오버레이가 적용되는 제품 카드 섹션.

4.  **설치 사례 (Cases Carousel)**
    - 실제 현장 사진을 슬라이드 형태로 제공하여 기업의 포트폴리오를 강조.
    - 반응형 레이아웃 지원 (모바일 1열, 태블릿 2열, PC 3열).

5.  **고객 센터 및 문의 (Board & Inquiry)**
    - 최신 공지사항 리스트 노출.
    - 하단 다크 테마 섹션에 문의 폼(Contact Form)과 회사 정보(주소, 연락처) 배치.

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 Node.js가 설치되어 있어야 합니다.

### 1. 저장소 클론 (Clone)
```bash
git clone <repository-url>
cd boasse-front
```

### 2. 패키지 설치 (Install Dependencies)
```bash
npm install
```

### 3. 개발 서버 실행 (Run Dev Server)
```bash
npm run dev
```
실행 후 터미널에 표시되는 로컬 주소(예: `http://localhost:5173`)로 접속하여 확인합니다.

## 📂 프로젝트 구조 (Project Structure)

```
src/
├── assets/          # 이미지 및 정적 자원
├── components/      # UI 컴포넌트
│   ├── Home/        # 메인 페이지 전용 섹션 컴포넌트
│   └── Layout/      # 헤더, 푸터 등 공통 레이아웃
├── App.jsx          # 메인 앱 컴포넌트 (라우팅 및 레이아웃 조립)
├── index.css        # 전역 스타일 및 CSS 변수 (브랜드 컬러 정의)
└── main.jsx         # 진입점 (Entry Point)
```

## 🎨 브랜드 컬러 (Brand Colors)

- **Primary Green**: `#8CC63F` (메인 로고 컬러)
- **Secondary Green**: `#6AA42E` (보조 컬러)
- **Dark Text**: `#333333`

---
Copyright © 2026 BOAS-SE All Rights Reserved.