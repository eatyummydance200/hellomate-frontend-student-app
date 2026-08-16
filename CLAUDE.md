# CLAUDE.md

이 프로젝트는 유학생용 React Native(Expo) 앱입니다. Claude Code는 세션 시작 시 이 파일을 읽고 아래 규칙을 따릅니다.

## 기술 스택

- Expo (TypeScript 템플릿, ~54.0.35)
- 상태관리: Zustand (^5.0.15)
- 서버 상태/캐싱: TanStack Query (^5.101.4)
- 네비게이션: Expo Router (~6.0.24, 파일 기반 라우팅)
- 스타일링: NativeWind (^4.2.6, StyleSheet 대신 className 사용)
- HTTP 클라이언트: Axios (^1.19.0)
- 인증 토큰 저장: expo-secure-store (~15.0.8)

## 폴더 구조

```
app/               # Expo Router 라우팅 (파일 기반, 화면 진입점)
src/
├── components/    # 재사용 공통 컴포넌트 (Button, Input, Card 등)
├── store/         # Zustand 스토어
├── api/           # Axios 인스턴스, 도메인별 API 함수
├── hooks/         # 커스텀 훅 (useXxxQuery, useXxxMutation)
└── types/         # 공통 타입 정의
```

## 화면 구성

앱은 아래 화면들로 구성됨: 공지사항 / 커뮤니티 / 클럽 / 정보 / 알림 / 인증 / 회원가입 / 마이페이지

## 코딩 컨벤션

- 컴포넌트는 함수형 + TypeScript, named export 사용
- 스타일은 StyleSheet가 아닌 NativeWind className으로 작성
- API 훅 네이밍: `useXxxQuery`(조회), `useXxxMutation`(변경)
- 화면 컴포넌트 파일명: `화면이름Screen.tsx`
- 공통 컴포넌트는 Figma 컴포넌트 목록과 1:1 매칭되도록 이름 맞추기

## 작업 방식 (중요)

- 화면 하나씩 완결된 단위로 작업. 요청 하나에 여러 화면을 한 번에 만들지 말 것.
- Figma 시안이 있는 화면을 구현하기 전, 필요한 컬러/폰트/스페이싱 토큰이 tailwind.config.js에 등록되어 있는지 먼저 확인. 없으면 임의로 만들지 말고 사용자에게 물어볼 것.
- Phase 4(정적 화면 퍼블리싱)까지는 API 연동 없이 더미 데이터로 작업. 실제 연동은 Phase 5부터.
- 막히는 화면은 건너뛰고 다른 화면부터 진행 — 순서 고정보다 진도 유지가 우선.

## 로드맵 (진행 순서)

0. RN 워밍업 → 1. 프로젝트 셋업 → 2. 디자인 시스템(Figma→코드) → 3. 네비게이션 뼈대 → 4. 정적 화면 퍼블리싱(더미 데이터) → 5. API 연동 & 상태관리 → 6. 핵심 기능 → 7. 부가 기능 → 8. 테스트 & 배포

**현재 단계:** Phase 4

> 단계가 바뀌면 이 줄을 업데이트할 것.

## 문서/보고서 요청 시

- 보고서 작성을 요청하면 `docs/reports/` 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일 생성.
- 로드맵 작성을 요청하면 `docs/roadmaps/` 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일 생성.
- 제목은 내용을 짧게 요약한 한글로.

## 커밋 메시지

- 작업을 마치면 `docs/resources/commit-convention.md`의 컨벤션을 참고해서 커밋 메시지를 추천할 것.
- 변경 사항이 여러 개면 제목 아래에 하이픈(`-`)으로 세부 설명을 덧붙일 것.
