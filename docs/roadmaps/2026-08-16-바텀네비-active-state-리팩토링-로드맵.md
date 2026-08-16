# 바텀 네비게이션 active state 리팩토링 로드맵

## 배경

`BottomNav`는 `active`/`onChange` prop을 부모(5개 탭 화면)로부터 받아 사용 중이다. 그런데 `TabKey` 타입, `TAB_ROUTES` 매핑, `active="notice"` 같은 하드코딩 값이 `app/(tabs)/index.tsx`, `community.tsx`, `club.tsx`, `info.tsx`, `mypage.tsx` 5개 파일에 전부 중복되어 있고, "현재 활성 탭"이라는 상태는 Expo Router가 이미 알고 있는 현재 경로와 항상 같은 값이다.

## 방향 (B안): 전역 상태 대신 라우터에서 파생

새 상태를 추가하지 않고, `BottomNav` 내부에서 `usePathname()`으로 현재 경로를 읽어 `active`를 계산한다. 상태와 실제 경로가 어긋나는 동기화 버그가 애초에 발생할 수 없고, 추가되는 스토어/액션 코드도 없다.

- `app/notice`, `app/community`, `app/club`, `app/info`, `app/mypage`(상세 화면)는 `(tabs)` 그룹 밖의 별도 최상위 라우트라 `BottomNav`가 렌더링되지 않는다. 즉 매칭 대상 경로는 탭 5개(`/`, `/community`, `/club`, `/info`, `/mypage`)뿐이다.

## 작업 단계

1. `src/components/layout/BottomNav.tsx`
   - `TabKey`, `TAB_ROUTES`(push 대상)를 이 파일로 이동 (단일 소스화)
   - `usePathname()`으로 현재 경로 → `active` 탭 계산
   - `useRouter()`를 내부에서 직접 사용해 `onPress` 시 `router.push(TAB_ROUTES[key])` 처리
   - `BottomNavProps`(`active`, `onChange`) 제거 → 컴포넌트는 prop 없이 동작
2. 5개 탭 화면(`index.tsx`, `community.tsx`, `club.tsx`, `info.tsx`, `mypage.tsx`)
   - 각 파일의 `TabKey` 타입, `TAB_ROUTES` 상수 삭제
   - `<BottomNav active="..." onChange={...} />` → `<BottomNav />` 로 단순화
3. 동작 확인: 5개 탭 각각 진입 시 해당 탭이 active로 표시되는지, 탭 클릭 시 정상 이동하는지 확인
4. 작업 후 `docs/reports/`에 보고서 작성, 커밋 메시지 추천

## 범위 밖

- 서브 화면(공지 상세, 클럽 상세 등)에 대한 BottomNav 노출 여부 변경 없음
- Zustand 스토어 신설 없음 (A안 보류)
