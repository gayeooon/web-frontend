# News-fit Web Frontend

이 프로젝트는 졸업 작품으로 진행되었던 뉴스 추천 서비스 '뉴스핏'의 프론트엔드 코드를 개인적인 학습 목적으로 리팩토링한 버전입니다.

## 리팩토링의 주요 목표

- **Vite에서 Next.js로 마이그레이션**: 기존 Vite 기반의 클라이언트 사이드 렌더링(CSR) 구조에서, 서버 사이드 렌더링(SSR)의 이점을 학습하고 적용하기 위해 Next.js로 전환했습니다.
- **코드 구조 개선**: 컴포넌트와 비즈니스 로직을 분리하고, React Query를 활용한 데이터 페칭 로직을 커스텀 훅으로 추상화하여 코드의 재사용성과 유지보수성을 높였습니다.
- **독립적인 프론트엔드 개발**: 기존 백엔드와의 연동 없이, Next.js의 API Routes 기능을 활용한 Mock API를 구축하여 프론트엔드만으로도 독립적으로 동작하도록 구현했습니다.

## 주요 기술 스택

- **Framework**: Next.js
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **HTTP Client**: Axios

## 폴더 구조

```
/src
├── /assets           # 아이콘(SVG) 컴포넌트
├── /components       # 기능별 컴포넌트
│   ├── /login
│   ├── /main
│   ├── /news
│   ├── /search
│   ├── /ui             # 공통 UI 컴포넌트 (shadcn, custom)
│   └── /user
├── /contexts         # 전역 Context Provider
├── /hooks            # 커스텀 훅
│   └── /queries        # React Query를 사용한 데이터 페칭 훅
├── /lib              # Axios 인스턴스, 상수, 유틸 함수
└── /pages            # Next.js 페이지 및 API 라우트
    ├── /api            # Mock API 엔드포인트
    └── ...             # 각 페이지 라우트
```

## 시작하기

### 1. 환경변수 설정

프로젝트를 실행하기 위해, 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 추가해야 합니다. 이 설정은 내장된 Mock API를 올바르게 호출합니다.

```
NEXT_PUBLIC_BASE_PATH=/api
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 개발 서버를 확인할 수 있습니다.

## 주요 스크립트

- `npm run dev`: 개발 모드로 애플리케이션을 실행합니다.
- `npm run build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `npm run start`: 빌드된 프로덕션 서버를 실행합니다.
- `npm run lint`: ESLint를 사용하여 코드 스타일을 검사합니다.
