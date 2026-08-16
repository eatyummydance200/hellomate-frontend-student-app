import { Image } from 'expo-image';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

// mirrors tailwind.config.js theme.colors — Image tintColor needs a raw value, not a className
const ACTIVE_COLOR = '#006b55'; // primary.DEFAULT
const INACTIVE_COLOR = '#6d7a74'; // text.muted

// 탭별 아이콘 에셋 매핑
const icons = {
  notice: require('../../../assets/icons/nav-notice.svg'),
  community: require('../../../assets/icons/nav-community.svg'),
  club: require('../../../assets/icons/nav-club.svg'),
  info: require('../../../assets/icons/nav-info.svg'),
  mypage: require('../../../assets/icons/nav-mypage.svg'),
} as const;

// 탭 순서 및 라벨 정의 (아이콘 매핑 key와 동일하게 유지)
const tabs = [
  // key 는 프로그래밍용 식별자, label은 display용
  { key: 'notice', label: '공지사항' },
  { key: 'community', label: '커뮤니티' },
  { key: 'club', label: '클럽' },
  { key: 'info', label: '정보' },
  { key: 'mypage', label: '마이페이지' },
] as const;

type TabKey = (typeof tabs)[number]['key']; // 다른 문자열은 타입 체크에서 막힘

// 탭 클릭 시 이동할 라우트. (tabs) 그룹 화면들은 전부 여기서만 쓰이므로 단일 소스로 관리.
const TAB_ROUTES: Record<TabKey, Href> = {
  notice: '/(tabs)',
  community: '/(tabs)/community',
  club: '/(tabs)/club',
  info: '/(tabs)/info',
  mypage: '/(tabs)/mypage',
};

// 그룹 괄호 (tabs)는 실제 URL에 나타나지 않으므로, usePathname()과 비교하려면 별도 경로가 필요
const TAB_PATHS: Record<TabKey, string> = {
  notice: '/',
  community: '/community',
  club: '/club',
  info: '/info',
  mypage: '/mypage',
};

// 활성 탭 여부에 따른 라벨 텍스트 스타일 변형
const label = tv({
  base: 'w-[44px] text-center font-semibold text-[9px]',
  variants: {
    active: {
      true: 'text-primary', // 활성
      false: 'text-text-muted', // 비활성화일 때
    },
  },
});

// prop 없이 동작 — 활성 탭은 현재 라우트에서, 이동은 라우터에서 직접 파생
export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const active = tabs.find((tab) => TAB_PATHS[tab.key] === pathname)?.key;

  return (
    <View className="items-center px-20 pb-20 pt-8">
      <View className="w-[320px] flex-row items-center gap-12 rounded-full border border-background bg-background/20 px-16 py-12">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              onPress={() => router.push(TAB_ROUTES[tab.key])}
              className="flex-1 items-center gap-4"
            >
              {/* tintColor는 className으로 제어 불가 → 활성 상태에 따라 직접 색상 지정 */}
              <Image
                source={icons[tab.key]}
                style={{ width: 24, height: 24 }}
                tintColor={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
              <Text className={label({ active: isActive })}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
