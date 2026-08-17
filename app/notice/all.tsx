import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const searchIcon = require('@/assets/icons/icon-search.svg');
const clockIcon = require('@/assets/icons/icon-clock.svg');

const FILTERS = ['전체', '국제교류처', '학생처', '장학처'] as const;

const NOTICES = [
  {
    id: '5',
    title: '2024 글로벌 문화 교류 축제',
    dept: '국제교류처',
    deptBg: 'rgba(164,179,255,0.2)',
    description:
      '다양한 음식, 공연, 네트워크 기회를 통해 모든 외국인 유학생들이 함께 교류하는 자리에 초대합니다.을 진행...',
    date: '2024.10.15',
  },
  {
    id: '6',
    title: '2024 혁신 기술 전시회',
    dept: '학생처',
    deptBg: 'rgba(255,218,214,0.4)',
    description:
      '최신 기술 트렌드를 소개하고, 다양한 스타트업과의 협업 기회를 모색하는 전시회입니다. 참가자들의 많은 관심을 부탁드립니다.',
    date: '2024.11.20',
  },
  {
    id: '7',
    title: '2024 지속 가능한 도시 포럼',
    dept: '장학처',
    deptBg: 'rgba(255,211,17,0.2)',
    description:
      '지속 가능한 도시 발전을 위한 다양한 아이디어와 프로젝트를 논의하는 포럼에 여러분을 초대합니다. 많은 참여 바랍니다.',
    date: '2024.09.05',
  },
  {
    id: '8',
    title: '2024 지속 가능한 도시 포럼',
    dept: '장학처',
    deptBg: 'rgba(255,211,17,0.2)',
    description:
      '지속 가능한 도시 발전을 위한 다양한 아이디어와 프로젝트를 논의하는 포럼에 여러분을 초대합니다. 많은 참여 바랍니다.',
    date: '2024.09.05',
  },
] as const;

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-16 px-16 pt-16 pb-32',
  searchBox: 'h-40 flex-row items-center justify-between rounded-sm border border-border bg-background px-12 py-8',
  searchInput: 'flex-1 font-sans text-label text-text',
  filterRow: 'flex-row gap-8',
  noticeList: 'gap-16',
  noticeCard: 'w-full gap-10 rounded-sm bg-background p-16 shadow-sm',
  noticeCardHeaderRow: 'flex-row items-center justify-between gap-8',
  noticeTitle: 'flex-1 text-[15px] leading-[20px]',
  deptBadge: 'h-24 items-center justify-center rounded-full px-8',
  deptBadgeText: 'text-[10px] leading-[24px] text-[#1c1e1e]',
  noticeDesc: 'text-[14px] leading-[20px] text-[#1c1e1e]',
  dateRow: 'flex-row items-center gap-8',
} as const;

const filterPill = tv({
  base: 'rounded-full px-16 py-4',
  variants: {
    active: {
      true: 'bg-primary',
      false: 'border border-border bg-background',
    },
  },
});

const filterLabel = tv({
  base: '',
  variants: {
    active: {
      true: 'text-text-inverse',
      false: 'text-[#6f6f6f]',
    },
  },
});

export default function NoticeAllScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('전체');
  const visibleNotices = activeFilter === '전체' ? NOTICES : NOTICES.filter((notice) => notice.dept === activeFilter);

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          전체 공지사항
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className={styles.searchBox}>
          <TextInput placeholder="검색어를 입력하세요" placeholderTextColor="#8b8b8b" className={styles.searchInput} />
          <Image source={searchIcon} style={{ width: 20, height: 20 }} />
        </View>

        <View className={styles.filterRow}>
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <Pressable key={filter} onPress={() => setActiveFilter(filter)} className={filterPill({ active: isActive })}>
                <Text size="label" weight="medium" className={filterLabel({ active: isActive })}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className={styles.noticeList}>
          {visibleNotices.map((notice) => (
            <Pressable
              key={notice.id}
              className={styles.noticeCard}
              onPress={() => router.push({ pathname: '/notice/[id]', params: { id: notice.id } })}
            >
              <View className={styles.noticeCardHeaderRow}>
                <Text weight="medium" color="strong" className={styles.noticeTitle}>
                  {notice.title}
                </Text>
                <View className={styles.deptBadge} style={{ backgroundColor: notice.deptBg }}>
                  <Text className={styles.deptBadgeText}>{notice.dept}</Text>
                </View>
              </View>
              <Text numberOfLines={2} className={styles.noticeDesc}>
                {notice.description}
              </Text>
              <View className={styles.dateRow}>
                <Image source={clockIcon} style={{ width: 12, height: 13 }} />
                <Text size="caption" weight="medium" color="muted">
                  {notice.date}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
