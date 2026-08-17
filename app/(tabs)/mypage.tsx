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

const styles = {
  container: 'flex-1 bg-background',
  scroll: 'flex-1',
  scrollContent: 'pb-32',
  profileRow: 'flex-row items-center gap-12 px-20 py-16',
  profileName: 'text-[16px] leading-[1.5] text-[#3d3d3d]',
  divider: 'h-px bg-border',
  sectionDivider: 'my-8 h-px bg-border',
  accountSection: 'px-16 pt-16',
  communitySection: 'px-16',
  sectionTitle: 'pb-8 text-[16px] leading-[1.5] text-[#3d3d3d]',
  menuRow: 'flex-row items-center justify-between py-8',
  menuRowSimple: 'py-8',
  menuLabel: 'text-[16px] leading-[1.6] text-[#3d3d3d]',
  menuBadge: 'rounded-full bg-primary-light/10 px-8 py-2',
  menuBadgeText: 'text-[12px] leading-[16px] text-primary',
  logoutRow: 'px-16 py-8',
  logoutLabel: 'text-[16px] leading-[1.6] text-danger',
} as const;

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      <Header onPressNotification={() => router.push('/notifications')} />

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 프로필 영역 */}
        <View className={styles.profileRow}>
          <Avatar size="lg" />
          <Text weight="semibold" className={styles.profileName}>
            {USER_NAME}
          </Text>
        </View>

        <View className={styles.divider} />

        {/* 계정 관리 섹션 */}
        <View className={styles.accountSection}>
          <Text weight="semibold" className={styles.sectionTitle}>
            계정 관리
          </Text>
          {ACCOUNT_MENU.map((item) => (
            <Pressable
              key={item.label}
              className={styles.menuRow}
              disabled={!item.route}
              onPress={item.route ? () => router.push(item.route!) : undefined}
            >
              <Text className={styles.menuLabel}>{item.label}</Text>
              {item.badge ? (
                <View className={styles.menuBadge}>
                  <Text weight="medium" className={styles.menuBadgeText}>
                    {item.badge}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>

        <View className={styles.sectionDivider} />

        {/* 커뮤니티 섹션 */}
        <View className={styles.communitySection}>
          <Text weight="semibold" className={styles.sectionTitle}>
            커뮤니티
          </Text>
          {COMMUNITY_MENU.map((item) => (
            <Pressable key={item.label} className={styles.menuRowSimple} onPress={() => router.push(item.route!)}>
              <Text className={styles.menuLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className={styles.sectionDivider} />

        {/* 로그아웃 */}
        <Pressable className={styles.logoutRow} onPress={() => router.replace('/(auth)')}>
          <Text className={styles.logoutLabel}>로그아웃</Text>
        </Pressable>
      </ScrollView>

      <BottomNav />
    </View>
  );
}
