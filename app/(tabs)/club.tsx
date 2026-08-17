import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const heroIcon = require('@/assets/icons/icon-club-hero.svg');
const searchIcon = require('@/assets/icons/icon-search.svg');
const sortChevronIcon = require('@/assets/icons/icon-sort-chevron.svg');
const calendarIcon = require('@/assets/icons/icon-calendar.svg');
const chatBubbleIcon = require('@/assets/icons/icon-chat-bubble.svg');
const compassIcon = require('@/assets/icons/icon-compass.svg');

const ALL_CLUBS = [
  {
    id: 'c1',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'available' as const,
    current: 22,
    total: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
  {
    id: 'c2',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'joined' as const,
    current: 22,
    total: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
  {
    id: 'c3',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'closed' as const,
    current: 25,
    total: 25,
    deadline: '모집 종료',
  },
  {
    id: 'c4',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'joined' as const,
    current: 22,
    total: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
] as const;

const MY_CLUBS = ALL_CLUBS.filter((club) => club.status === 'joined');

const STATUS_BADGE = {
  available: { label: '참여 가능', className: 'bg-primary', textClassName: 'text-text-inverse' },
  joined: { label: '참여 중', className: 'bg-primary/10', textClassName: 'text-primary' },
  closed: { label: '마감', className: 'bg-[#d5dbd7]', textClassName: 'text-text' },
} as const;

const styles = {
  container: 'flex-1 bg-background',
  tabRow: 'flex-row bg-background',
  allScroll: 'flex-1',
  allScrollContent: 'gap-18 px-16 pb-32 pt-16',
  heroBanner: 'h-96 overflow-hidden rounded-xl bg-primary-light/20',
  heroBlob: 'absolute right-[-28px] top-[-32px] h-[128px] w-[128px] rounded-full bg-primary/15',
  heroTextWrap: 'gap-[3px] p-16',
  heroTitle: 'text-[17px] leading-[25px] text-primary-dark',
  heroDesc: 'text-[10px] leading-[16px] text-[rgba(0,80,63,0.7)]',
  sectionTitle: 'text-[#3d3d3d]',
  searchBox: 'h-40 flex-row items-center justify-between rounded-sm border border-border bg-background px-12 py-8',
  searchInput: 'flex-1 font-sans text-label text-text',
  sortRow: 'flex-row items-center gap-4 self-start',
  sortLabel: 'text-[13px] leading-[24px] text-text',
  clubList: 'gap-16',
  clubCard: 'w-full gap-16 rounded-xl border border-border-strong/30 bg-background p-18 shadow-sm',
  clubHeaderRow: 'flex-row items-start justify-between gap-8',
  clubTitleWrap: 'flex-1 gap-4',
  clubTitle: 'text-[17px] leading-[20px] text-text-strong',
  clubDesc: 'text-[13px] leading-[20px] text-text',
  statusBadge: 'items-center justify-center rounded-sm px-12 py-4',
  statusBadgeText: 'text-[14px] leading-[24px]',
  progressSection: 'gap-8',
  progressRow: 'flex-row items-center justify-between',
  progressLabel: 'text-[14px] leading-[24px] text-text',
  progressValue: 'text-[14px] leading-[24px] text-text-strong',
  progressTrack: 'h-6 overflow-hidden rounded-full bg-[#e3eae5]',
  deadlineRow: 'flex-row items-center gap-7 pt-4',
  deadlineText: 'text-[13px] leading-[24px] text-text',
  mineScroll: 'flex-1',
  mineScrollContent: 'gap-13 px-16 pb-32 pt-24',
  mineHeaderRow: 'flex-row items-center gap-8',
  mineHeaderTitle: 'text-[20px] leading-[24px] text-text-strong',
  mineCountBadge: 'rounded-full bg-primary-light/20 px-8 py-[2px]',
  mineCountText: 'text-[15px] leading-[16px] text-primary',
  mineList: 'gap-13',
  mineClubActionsRow: 'flex-row items-center justify-between gap-8 border-t border-border-strong/20 pt-16',
  chatButton: 'h-32 flex-row items-center gap-12 rounded-md bg-primary px-16',
  chatButtonLabel: 'text-[13px] leading-[16px] text-text-inverse',
  leaveButton: 'h-32 items-center justify-center rounded-md border border-[#6f6f6f] px-14',
  leaveButtonLabel: 'text-[13px] leading-[16px] text-[#6f6f6f]',
  exploreMoreCard: 'items-center gap-8 rounded-xl border-2 border-dashed border-primary/30 bg-primary-light/10 px-26 pb-26 pt-34',
  exploreMoreTitle: 'text-[17px] leading-[22px] text-text-strong',
  exploreMoreDesc: 'text-[14px] leading-[20px] text-text',
  exploreMoreCta: 'rounded-full border border-primary bg-[#f5fbf6] px-33 py-11',
  exploreMoreCtaText: 'text-[13px] leading-[16px] text-primary',
} as const;

const tabButton = tv({
  base: 'h-40 flex-1 items-center justify-center border-b',
  variants: {
    active: {
      true: 'border-primary-dark',
      false: 'border-[#c6c6cd]',
    },
  },
});

const tabLabel = tv({
  base: '',
  variants: {
    active: {
      true: 'text-primary-dark',
      false: 'text-[#8e8e93]',
    },
  },
});

const progressFill = tv({
  base: 'h-full rounded-full',
  variants: {
    closed: {
      true: 'bg-border',
      false: 'bg-primary',
    },
  },
});

export default function ClubHomeScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'all' | 'mine'>('all');

  return (
    <View className={styles.container}>
      <Header onPressNotification={() => router.push('/notifications')} />

      {/* 전체 클럽 / 내 클럽 탭 */}
      <View className={styles.tabRow}>
        <Pressable className={tabButton({ active: tab === 'all' })} onPress={() => setTab('all')}>
          <Text weight="semibold" className={tabLabel({ active: tab === 'all' })}>
            전체 클럽
          </Text>
        </Pressable>
        <Pressable className={tabButton({ active: tab === 'mine' })} onPress={() => setTab('mine')}>
          <Text weight="semibold" className={tabLabel({ active: tab === 'mine' })}>
            내 클럽
          </Text>
        </Pressable>
      </View>

      {tab === 'all' ? (
        <ScrollView className={styles.allScroll} contentContainerClassName={styles.allScrollContent} showsVerticalScrollIndicator={false}>
          {/* 클럽 만들기 유도 히어로 배너 */}
          <Pressable className={styles.heroBanner} onPress={() => router.push('/club/create')}>
            <View className={styles.heroBlob} />
            <View className={styles.heroTextWrap}>
              <Text weight="medium" className={styles.heroTitle}>
                나만의 클럽을{'\n'}만들어보세요
              </Text>
              <Text className={styles.heroDesc}>취향이 맞는 메이트들과 만날 수 있어요.</Text>
            </View>
            <Image source={heroIcon} style={{ width: 64, height: 38, position: 'absolute', right: 26, bottom: 10 }} />
          </Pressable>

          <Text size="display" weight="semibold" className={styles.sectionTitle}>
            클럽 둘러보기
          </Text>

          <View className={styles.searchBox}>
            <TextInput placeholder="클럽명으로 검색하세요." placeholderTextColor="#8b8b8b" className={styles.searchInput} />
            <Image source={searchIcon} style={{ width: 20, height: 20 }} />
          </View>

          <Pressable className={styles.sortRow}>
            <Text weight="semibold" className={styles.sortLabel}>
              최신순
            </Text>
            <Image source={sortChevronIcon} style={{ width: 9, height: 4 }} />
          </Pressable>

          <View className={styles.clubList}>
            {ALL_CLUBS.map((club) => {
              const badge = STATUS_BADGE[club.status];
              const isClosed = club.status === 'closed';
              return (
                <Pressable
                  key={club.id}
                  className={styles.clubCard}
                  style={isClosed ? { opacity: 0.5 } : undefined}
                  onPress={() => router.push({ pathname: '/club/[id]', params: { id: club.id } })}
                >
                  <View className={styles.clubHeaderRow}>
                    <View className={styles.clubTitleWrap}>
                      <Text weight="semibold" className={styles.clubTitle}>
                        {club.title}
                      </Text>
                      <Text className={styles.clubDesc}>{club.desc}</Text>
                    </View>
                    <View className={`${styles.statusBadge} ${badge.className}`}>
                      <Text weight="medium" className={`${styles.statusBadgeText} ${badge.textClassName}`}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>
                  <View className={styles.progressSection}>
                    <View className={styles.progressRow}>
                      <Text className={styles.progressLabel}>참여 인원</Text>
                      <Text weight="semibold" className={styles.progressValue}>
                        {club.current}/{club.total}
                      </Text>
                    </View>
                    <View className={styles.progressTrack}>
                      <View
                        className={progressFill({ closed: isClosed })}
                        style={{ width: `${Math.round((club.current / club.total) * 100)}%` }}
                      />
                    </View>
                    <View className={styles.deadlineRow}>
                      <Image source={calendarIcon} style={{ width: 11, height: 12 }} />
                      <Text className={styles.deadlineText}>{club.deadline}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <ScrollView className={styles.mineScroll} contentContainerClassName={styles.mineScrollContent} showsVerticalScrollIndicator={false}>
          <View className={styles.mineHeaderRow}>
            <Text weight="semibold" className={styles.mineHeaderTitle}>
              가입한 클럽
            </Text>
            <View className={styles.mineCountBadge}>
              <Text weight="semibold" className={styles.mineCountText}>
                {MY_CLUBS.length}
              </Text>
            </View>
          </View>

          <View className={styles.mineList}>
            {MY_CLUBS.map((club) => (
              <Pressable
                key={club.id}
                className={styles.clubCard}
                onPress={() => router.push({ pathname: '/club/[id]', params: { id: club.id } })}
              >
                <View className={styles.clubTitleWrap}>
                  <Text weight="semibold" className={styles.clubTitle}>
                    {club.title}
                  </Text>
                  <Text className={styles.clubDesc}>{club.desc}</Text>
                </View>
                <View className={styles.progressSection}>
                  <View className={styles.progressRow}>
                    <Text className={styles.progressLabel}>참여 인원</Text>
                    <Text weight="semibold" className={styles.progressValue}>
                      {club.current}/{club.total}
                    </Text>
                  </View>
                  <View className={styles.progressTrack}>
                    <View
                      className={progressFill({ closed: false })}
                      style={{ width: `${Math.round((club.current / club.total) * 100)}%` }}
                    />
                  </View>
                  <View className={styles.deadlineRow}>
                    <Image source={calendarIcon} style={{ width: 11, height: 12 }} />
                    <Text className={styles.deadlineText}>{club.deadline}</Text>
                  </View>
                </View>
                <View className={styles.mineClubActionsRow}>
                  <Pressable className={styles.chatButton} onPress={() => router.push('/club/chat')}>
                    <Image source={chatBubbleIcon} style={{ width: 15, height: 15 }} />
                    <Text weight="semibold" className={styles.chatButtonLabel}>
                      채팅
                    </Text>
                  </Pressable>
                  <Pressable className={styles.leaveButton}>
                    <Text weight="semibold" className={styles.leaveButtonLabel}>
                      나가기
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable className={styles.exploreMoreCard} onPress={() => setTab('all')}>
            <Image source={compassIcon} style={{ width: 33, height: 33 }} />
            <Text weight="medium" className={styles.exploreMoreTitle}>
              더 많은 클럽을 찾고 싶나요?
            </Text>
            <Text weight="medium" className={styles.exploreMoreDesc}>
              다른 클럽들을 확인해보세요.
            </Text>
            <View className={styles.exploreMoreCta}>
              <Text weight="medium" className={styles.exploreMoreCtaText}>
                클럽 둘러보기
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      )}

      <BottomNav />
    </View>
  );
}
