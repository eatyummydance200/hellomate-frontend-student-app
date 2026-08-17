import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const clockIcon = require('@/assets/icons/icon-clock.svg');
const downloadIcon = require('@/assets/icons/icon-download.svg');
const helpIcon = require('@/assets/icons/icon-help-circle.svg');

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-16 px-[18px] pt-16',
  metaCard: 'w-full gap-8 rounded-sm bg-background p-16 shadow-sm',
  metaHeaderRow: 'flex-row items-center justify-between gap-8',
  metaTitle: 'flex-1 text-[15px] leading-[20px]',
  deptBadge: 'h-24 items-center justify-center rounded-full px-8',
  deptBadgeText: 'text-[10px] leading-[24px] text-[#1c1e1e]',
  metaDateRow: 'flex-row items-center gap-8',
  bodyCard: 'w-full rounded-sm bg-background p-16 shadow-sm',
  bodyText: 'text-[15px] leading-[26px]',
  attachmentCard: 'w-full flex-row items-center justify-between rounded-lg border border-border-strong/30 bg-background p-16 shadow-sm',
  attachmentSize: 'text-[10px] leading-[15px]',
  downloadButton: 'h-32 w-32 items-center justify-center rounded-full',
  footer: 'px-[18px] pb-20 pt-8',
  contactButton: 'h-[52px] w-full flex-row items-center justify-center gap-8 rounded-lg bg-primary',
} as const;

export default function NoticeDetailScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          공지사항 상세
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className={styles.metaCard}>
          <View className={styles.metaHeaderRow}>
            <Text weight="medium" color="strong" className={styles.metaTitle}>
              2024 글로벌 문화 교류 축제
            </Text>
            <View className={styles.deptBadge} style={{ backgroundColor: 'rgba(164,179,255,0.2)' }}>
              <Text className={styles.deptBadgeText}>국제교류처</Text>
            </View>
          </View>
          <View className={styles.metaDateRow}>
            <Image source={clockIcon} style={{ width: 12, height: 13 }} />
            <Text size="caption" weight="medium" color="muted">
              2024.10.15
            </Text>
          </View>
        </View>

        <View className={styles.bodyCard}>
          <Text weight="medium" color="strong" className={styles.bodyText}>
            안녕하세요. 국제교류처입니다.
          </Text>
          <Text weight="medium" color="strong" className={styles.bodyText}>
            {'•'} 신청 기간: 2026년 4월 1일 ~ 4월 30일
          </Text>
          <Text weight="medium" color="strong" className={styles.bodyText}>
            {'•'} 대상: 외국인 유학생 전원 (D-2, D-4 비자)
          </Text>
          <Text weight="medium" color="strong" className={styles.bodyText}>
            {'•'} 제출: 국제교류처 2층 방문 또는 이메일
          </Text>
        </View>

        <View className={styles.attachmentCard}>
          <View>
            <Text weight="medium" color="strong" size="label">
              보험가입_안내문.pdf
            </Text>
            <Text className={styles.attachmentSize} color="default">
              1.2 MB
            </Text>
          </View>
          <Pressable className={styles.downloadButton}>
            <Image source={downloadIcon} style={{ width: 16, height: 16 }} />
          </Pressable>
        </View>
      </ScrollView>

      <View className={styles.footer}>
        <Pressable className={styles.contactButton} onPress={() => router.push('/notice/contact')}>
          <Image source={helpIcon} style={{ width: 20, height: 20 }} />
          <Text weight="semibold" color="inverse" size="body">
            담당자에게 질문하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
