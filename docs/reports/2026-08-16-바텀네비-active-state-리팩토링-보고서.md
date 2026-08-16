# 바텀 네비게이션 active state 리팩토링 보고서

## 목표

`BottomNav`가 `active`/`onChange` prop을 부모로부터 받던 구조를 없애고, 컴포넌트 내부에서 현재 라우트로부터 active 탭을 직접 파생하도록 변경 (로드맵의 B안).

## 변경 내용

### `src/components/layout/BottomNav.tsx`
- `TabKey`, `TAB_ROUTES`(탭 → 이동 경로)를 이 파일로 이동해 단일 소스로 관리
- 그룹 괄호 `(tabs)`는 실제 URL에 나타나지 않는다는 점 때문에, `usePathname()`과 비교할 `TAB_PATHS`(탭 → 실제 경로 문자열)를 별도로 추가
- `usePathname()`으로 현재 경로를 읽어 `active` 탭을 계산 (`tabs.find(...)`)
- `useRouter()`를 컴포넌트 내부에서 직접 사용, 탭 클릭 시 `router.push(TAB_ROUTES[tab.key])` 처리
- `BottomNavProps`(`active`, `onChange`) 제거 → `<BottomNav />`로 prop 없이 호출

### 5개 탭 화면
`app/(tabs)/index.tsx`, `community.tsx`, `club.tsx`, `info.tsx`, `mypage.tsx` 각각에서:
- 중복돼 있던 `TabKey` 타입, `TAB_ROUTES` 상수 삭제
- `<BottomNav active="..." onChange={...} />` → `<BottomNav />`

### `app/dev/_ComponentGalleryScreen.tsx`
- 컴포넌트 갤러리에서 `BottomNav` 데모용으로 쓰던 `activeTab`/`setActiveTab` `useState`가 불필요해져 삭제
- 더 이상 쓰이지 않는 `useState` import 제거

## 확인 사항

- `npx tsc --noEmit`: 에러 없음
- `npx eslint`(변경된 6개 파일): 경고/에러 없음
- 서브 라우트(`app/notice`, `app/community`, `app/club`, `app/info`, `app/mypage`)는 `(tabs)` 그룹 밖의 최상위 라우트라 `BottomNav`가 렌더링되지 않으므로, `usePathname()` 매칭 대상은 탭 5개 경로(`/`, `/community`, `/club`, `/info`, `/mypage`)로 충분함을 확인

## 결과

- `active`/`onChange` prop과 5곳에 중복돼 있던 `TabKey`/`TAB_ROUTES`가 사라지고, 관련 로직이 `BottomNav.tsx` 한 곳으로 모임
- 상태와 실제 경로가 어긋나는 동기화 버그가 구조적으로 발생할 수 없음 (별도 상태 자체가 없음)
- Zustand 스토어 등 새로운 상태 관리 코드는 추가하지 않음
