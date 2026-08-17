import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const shieldIcon = require('@/assets/icons/notice-badge-shield.svg');
const clockIcon = require('@/assets/icons/icon-clock.svg');
const chevronRightSm = require('@/assets/icons/icon-chevron-right-sm.svg');

const RECENT_NOTICES = [
  {
    id: '1',
    dept: '국제교류처',
    deptColor: '#006b55',
    time: '1시간 전',
    title: '기말고사 시간표 및 강의실 배정 확정 공고',
    read: false,
  },
  {
    id: '4',
    dept: '장학처',
    deptColor: '#006b55',
    time: '30분 전',
    title: '축구팀 훈련 일정 발표',
    read: false,
  },
  {
    id: '2',
    dept: '학생처',
    deptColor: '#595c7e',
    time: '3시간 전',
    title: 'Global Culture Day: 유학생 서포터즈 모집',
    read: true,
  },
  {
    id: '3',
    dept: 'Dorm',
    deptColor: '#575c83',
    time: '어제',
    title: '여름방학 기숙사 신청 및 관실 이동 안내',
    read: true,
  },
] as const;

const styles = {
  container: 'flex-1 bg-background',
  scroll: 'flex-1',
  scrollContent: 'gap-16 px-[17px] pt-16 pb-32',
  heading: 'text-[24px] leading-[32px]',
  bannerCard: 'w-full gap-10 overflow-hidden rounded-xl bg-primary-light p-20 shadow-lg',
  bannerBadge: 'self-start rounded-full bg-background px-12 py-4',
  bannerTitle: 'text-[19px] leading-[26px] text-primary-dark',
  bannerDateRow: 'flex-row items-center gap-8 pt-8 opacity-80',
  progressDotsRow: 'flex-row gap-10',
  progressDotActive: 'h-[3px] flex-1 rounded-full bg-[#575c83]',
  progressDotInactive: 'h-[3px] flex-1 rounded-full bg-border',
  recentSection: 'gap-16',
  recentHeader: 'flex-row items-center justify-between',
  seeAllRow: 'flex-row items-center gap-4',
  recentList: 'gap-12',
  noticeCard: 'w-full gap-4 rounded-md border border-border-strong bg-background py-[17px] pl-[17px] pr-[14px] shadow-sm',
  noticeCardHeaderRow: 'flex-row items-center justify-between',
  noticeTitleRow: 'flex-row items-center gap-8 pt-4',
  unreadDot: 'h-8 w-8 rounded-full bg-primary-light',
  noticeTitleText: 'flex-1 text-[15px] leading-[20px]',
} as const;

export default function NoticeHomeScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      <Header onPressNotification={() => router.push('/notifications')} />

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text className={styles.heading} weight="semibold" color="strong">
          놓치면 안 되는{'\n'}학교 소식
        </Text>

        <View className={styles.bannerCard}>
          <View className={styles.bannerBadge}>
            <Text size="caption" weight="semibold" color="primary">
              중요
            </Text>
          </View>
          <Text weight="semibold" className={styles.bannerTitle}>
            2024학년도 외국인 유학생{'\n'}건강보험 가입 및 갱신 안내
          </Text>
          <View className={styles.bannerDateRow}>
            <Image source={clockIcon} style={{ width: 12, height: 12 }} />
            <Text size="caption" weight="medium" color="strong">
              2024.05.20 - 2024.06.15
            </Text>
          </View>
          <Image source={shieldIcon} style={{ width: 80, height: 106, position: 'absolute', right: -24, bottom: -24 }} />
        </View>

        <View className={styles.progressDotsRow}>
          <View className={styles.progressDotActive} />
          <View className={styles.progressDotInactive} />
          <View className={styles.progressDotInactive} />
          <View className={styles.progressDotInactive} />
        </View>

        <View className={styles.recentSection}>
          <View className={styles.recentHeader}>
            <Text size="title" weight="semibold" color="strong">
              최근 공지
            </Text>
            <Pressable className={styles.seeAllRow} onPress={() => router.push('/notice/all')}>
              <Text size="caption" weight="semibold" color="primary">
                전체보기
              </Text>
              <Image source={chevronRightSm} style={{ width: 5, height: 8 }} />
            </Pressable>
          </View>

          <View className={styles.recentList}>
            {RECENT_NOTICES.map((notice) => (
              <Pressable
                key={notice.id}
                className={styles.noticeCard}
                style={notice.read ? { opacity: 0.5 } : undefined}
                onPress={() => router.push({ pathname: '/notice/[id]', params: { id: notice.id } })}
              >
                <View className={styles.noticeCardHeaderRow}>
                  <Text size="caption" weight="bold" style={{ color: notice.deptColor }}>
                    {notice.dept}
                  </Text>
                  <Text size="caption" weight="medium" color="muted">
                    {notice.time}
                  </Text>
                </View>
                <View className={styles.noticeTitleRow}>
                  {!notice.read ? <View className={styles.unreadDot} /> : null}
                  <Text className={styles.noticeTitleText} weight="medium" color={notice.read ? 'muted' : 'strong'}>
                    {notice.title}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}
