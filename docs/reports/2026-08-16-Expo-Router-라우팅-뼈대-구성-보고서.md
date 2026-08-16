# Expo Router 라우팅 뼈대 구성 보고서

## 배경

8개 화면(공지사항/커뮤니티/클럽/정보/마이페이지/알림/인증/회원가입)에 대해 UI/스타일·API·인증 로직·상태관리 없이 Expo Router 파일 기반 라우팅 뼈대만 구성했다. Phase 2(디자인 시스템) 단계이므로 화면 내용은 텍스트 한 줄짜리 placeholder로만 채웠다.

## 그룹 구조

- **`app/(tabs)/`** — 기본 탭바(커스텀 아이콘/스타일 없음), 인증이 필요한 5개 화면
  - `index.tsx` 공지사항 (첫 진입 탭)
  - `community.tsx` 커뮤니티
  - `club.tsx` 클럽
  - `info.tsx` 정보
  - `mypage.tsx` 마이페이지
- **`app/(auth)/`** — 탭바 없는 Stack, 인증이 필요 없는 2개 화면
  - `index.tsx` 인증
  - `signup.tsx` 회원가입
- **`app/notifications.tsx`** — 알림. 탭이 아닌 별도 push 화면으로 분리(그룹 밖 루트 레벨)
- **`app/index.tsx`** — `/(tabs)`로 `Redirect`, 기본 진입점
- **`app/_layout.tsx`** — 루트 `Stack`. `(tabs)`/`(auth)`는 자체 레이아웃을 쓰므로 헤더 숨김, `notifications`만 헤더 노출

기존에 비어 있던 `app/(main)/.gitkeep` 플레이스홀더는 `(tabs)`로 대체하고 삭제, `app/(auth)/.gitkeep`은 실제 화면 파일로 대체했다.

## 알림을 탭에서 뺀 이유

탭 5개(공지사항/커뮤니티/클럽/정보/마이페이지)가 이미 채워져 있고, 알림은 상시 머무는 목적지가 아니라 헤더 아이콘이나 push 딥링크로 진입하는 화면 성격이 강해 탭보다 별도 Stack 화면이 맞다고 판단했다. (사용자 확인 완료)

## 인증 화면 임시 전환 (실제 로그인 체크 없음)

로그인 상태 체크 로직 없이, 버튼/링크로만 그룹 간 이동 가능:
- 마이페이지 → "인증 화면으로 이동" (`/(auth)`)
- 정보 → "알림 화면으로 이동" (`/notifications`)
- 인증 → "회원가입으로 이동" / "메인으로 이동" (`/(auth)/signup`, `/(tabs)`)

## 검증

- `npx tsc --noEmit` 통과 — 단, Expo Router의 typed routes(`.expo/types/router.d.ts`)가 새 라우트 파일을 반영하지 못해 처음엔 타입 에러가 났고, `expo start`를 한 번 실행해 타입을 재생성한 뒤 통과 확인
- `npx expo lint` 통과
- 8개 화면 모두 라우팅 진입 가능, 탭 5개 전환 가능 (완료 기준 충족)

## 다음 단계

Phase 3(네비게이션 뼈대 확정)에서 탭 아이콘/헤더 스타일을 입히고, Phase 4에서 각 placeholder를 실제 화면 컴포넌트(`src/screens/화면이름Screen.tsx` 등)로 교체 권장. 실제 인증 가드(로그인 여부에 따른 자동 리다이렉트)는 Phase 5 API 연동 시점에 추가.
