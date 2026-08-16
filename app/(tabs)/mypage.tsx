import { useRouter, type Href } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Avatar } from '@/src/components/Avatar';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const USER_NAME = '김지수';

type MenuRow = {
  label: string;
  route?: Href;
  badge?: string;
  danger?: boolean;
};

const ACCOUNT_MENU: MenuRow[] = [
  { label: '내 정보 수정', route: '/mypage/edit' },
  { label: '이메일 인증', badge: '학생 인증됨' },
  { label: '비밀번호 재설정', route: '/mypage/reset-password' },
];

const COMMUNITY_MENU: MenuRow[] = [
  { label: '내가 작성한 글', route: '/mypage/posts' },
  { label: '내가 작성한 댓글', route: '/mypage/comments' },
];

type TabKey = 'notice' | 'community' | 'club' | 'info' | 'mypage';

const TAB_ROUTES: Record<TabKey, Href> = {
  notice: '/(tabs)',
  community: '/(tabs)/community',
  club: '/(tabs)/club',
  info: '/(tabs)/info',
  mypage: '/(tabs)/mypage',
};

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Header onPressNotification={() => router.push('/notifications')} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 영역 */}
        <View className="flex-row items-center gap-12 px-20 py-16">
          <Avatar size="lg" />
          <Text weight="semibold" className="text-[16px] leading-[1.5] text-[#3d3d3d]">
            {USER_NAME}
          </Text>
        </View>

        <View className="h-px bg-border" />

        {/* 계정 관리 섹션 */}
        <View className="px-16 pt-16">
          <Text weight="semibold" className="pb-8 text-[16px] leading-[1.5] text-[#3d3d3d]">
            계정 관리
          </Text>
          {ACCOUNT_MENU.map((item) => (
            <Pressable
              key={item.label}
              className="flex-row items-center justify-between py-8"
              disabled={!item.route}
              onPress={item.route ? () => router.push(item.route!) : undefined}
            >
              <Text className="text-[16px] leading-[1.6] text-[#3d3d3d]">{item.label}</Text>
              {item.badge ? (
                <View className="rounded-full bg-primary-light/10 px-8 py-2">
                  <Text weight="medium" className="text-[12px] leading-[16px] text-primary">
                    {item.badge}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>

        <View className="my-8 h-px bg-border" />

        {/* 커뮤니티 섹션 */}
        <View className="px-16">
          <Text weight="semibold" className="pb-8 text-[16px] leading-[1.5] text-[#3d3d3d]">
            커뮤니티
          </Text>
          {COMMUNITY_MENU.map((item) => (
            <Pressable
              key={item.label}
              className="py-8"
              onPress={() => router.push(item.route!)}
            >
              <Text className="text-[16px] leading-[1.6] text-[#3d3d3d]">{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="my-8 h-px bg-border" />

        {/* 로그아웃 */}
        <Pressable className="px-16 py-8" onPress={() => router.replace('/(auth)')}>
          <Text className="text-[16px] leading-[1.6] text-danger">로그아웃</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="mypage" onChange={(key: TabKey) => router.push(TAB_ROUTES[key])} />
    </View>
  );
}
