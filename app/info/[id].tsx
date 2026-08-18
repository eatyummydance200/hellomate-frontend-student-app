import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const calendarIcon = require('@/assets/icons/icon-calendar-xs.svg');
const infoCircleIcon = require('@/assets/icons/icon-info-circle-sm.svg');
const feeIcon = require('@/assets/icons/icon-fee.svg');
const durationIcon = require('@/assets/icons/icon-duration.svg');

// Figma 시안 기준 고정 콘텐츠. 실제 정보글 조회는 Phase 5에서 id로 연동.
const ARTICLE = {
  title: 'D-2 비자 연장 완벽 가이드',
  updatedAt: '2026.03.15 업데이트',
  notice: '비자 만료 4개월 전부터 연장을 준비하는것을 권장해요.',
  steps: [
    {
      title: '만료일 확인',
      desc: '외국인등록증 뒷면 또는 하이코리아에서 현재 체류 기간 만료일을 정확히 확인하세요.',
    },
    {
      title: '서류 제출',
      desc: '필요 서류를 모두 준비하여 관할 출입국 관리 사무소에 제출하세요.',
      tags: ['#재학증명서', '#체류지입증'],
    },
    {
      title: '상담 예약',
      desc: '출입국 관리 사무소에 상담 예약을 하여 필요한 정보를 미리 확인하세요.',
    },
    {
      title: '비자 연장 신청',
      desc: '정해진 기간 내에 비자 연장 신청서를 작성하여 제출하세요.',
    },
  ],
  fee: '60,000원',
  duration: '약 2~3주',
};

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-20 px-20 pb-32 pt-16',
  mainCard: 'gap-[15px] rounded-xl border border-border-strong/30 bg-background px-[18px] py-20 shadow-sm',
  titleGroup: 'gap-[5px] pt-4',
  articleTitle: 'text-[20px] leading-[30px] text-text-strong',
  updatedRow: 'flex-row items-center gap-[6px]',
  updatedText: 'text-[10px] leading-[16px] text-[#595c7e]',
  noticeBanner: 'flex-row items-center gap-[6px] rounded-md border border-primary-light/20 bg-primary-light/10 px-[23px] py-4',
  noticeText: 'flex-1 text-[10px] leading-[20px] text-primary-dark',
  stepRow: 'flex-row gap-16 pt-[15px]',
  stepBadgeCol: 'items-center',
  stepBadge: 'h-32 w-32 items-center justify-center rounded-full bg-primary shadow-sm',
  stepBadgeText: 'text-[12px] leading-[16px] text-white',
  stepConnector: 'w-[2px] flex-1 bg-[#dee4e0]',
  stepContent: 'flex-1 gap-4 pb-4',
  stepTitle: 'text-[14px] leading-[20px] text-text-strong',
  stepDesc: 'text-[13px] leading-[20px] text-[#595c7e]',
  tagsRow: 'flex-row gap-8 pt-4',
  tagChip: 'rounded-sm bg-background-muted px-8 py-[3px]',
  tagText: 'text-[11px] leading-[16.5px] text-[#595c7e]',
  infoCardsRow: 'flex-row gap-[14px]',
  infoCard: 'flex-1 rounded-lg border border-border-strong/20 bg-background p-[17px] shadow-sm',
  infoCardLabel: 'pt-8 text-[12px] leading-[16px] text-[#595c7e]',
  infoCardValue: 'text-[16px] leading-[24px] text-text-strong',
  footer: 'flex-row gap-8 px-20 pb-20 pt-8',
  editButton: 'h-[56px] flex-1 items-center justify-center rounded-lg border border-primary',
  editButtonLabel: 'text-[17px] leading-[22px] text-primary',
  linkButton: 'h-[56px] flex-[1.15] items-center justify-center rounded-lg bg-primary',
  linkButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

export default function InfoDetailScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          정보글
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 본문 카드 */}
        <View className={styles.mainCard}>
          <View className={styles.titleGroup}>
            <Text weight="semibold" className={styles.articleTitle}>
              {ARTICLE.title}
            </Text>
            <View className={styles.updatedRow}>
              <Image source={calendarIcon} style={{ width: 8, height: 9 }} />
              <Text className={styles.updatedText}>{ARTICLE.updatedAt}</Text>
            </View>
          </View>

          {/* 핵심 안내 배너 */}
          <View className={styles.noticeBanner}>
            <Image source={infoCircleIcon} style={{ width: 11, height: 11 }} />
            <Text weight="medium" className={styles.noticeText}>
              {ARTICLE.notice}
            </Text>
          </View>

          {/* 단계별 가이드 */}
          <View>
            {ARTICLE.steps.map((step, index) => {
              const isLast = index === ARTICLE.steps.length - 1;
              return (
                <View key={step.title} className={styles.stepRow}>
                  <View className={styles.stepBadgeCol}>
                    <View className={styles.stepBadge}>
                      <Text weight="bold" className={styles.stepBadgeText}>
                        {index + 1}
                      </Text>
                    </View>
                    {!isLast ? <View className={styles.stepConnector} /> : null}
                  </View>
                  <View className={styles.stepContent}>
                    <Text weight="semibold" className={styles.stepTitle}>
                      {step.title}
                    </Text>
                    <Text weight="medium" className={styles.stepDesc}>
                      {step.desc}
                    </Text>
                    {step.tags ? (
                      <View className={styles.tagsRow}>
                        {step.tags.map((tag) => (
                          <View key={tag} className={styles.tagChip}>
                            <Text weight="medium" className={styles.tagText}>
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 수수료 / 처리 기간 카드 */}
        <View className={styles.infoCardsRow}>
          <View className={styles.infoCard}>
            <Image source={feeIcon} style={{ width: 22, height: 16 }} />
            <Text weight="semibold" className={styles.infoCardLabel}>
              예상 수수료
            </Text>
            <Text weight="medium" className={styles.infoCardValue}>
              {ARTICLE.fee}
            </Text>
          </View>
          <View className={styles.infoCard}>
            <Image source={durationIcon} style={{ width: 17, height: 20 }} />
            <Text weight="semibold" className={styles.infoCardLabel}>
              처리 기간
            </Text>
            <Text weight="medium" className={styles.infoCardValue}>
              {ARTICLE.duration}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 액션 버튼 */}
      <View className={styles.footer}>
        <Pressable className={styles.editButton} onPress={() => router.push('/info/edit-request')}>
          <Text weight="semibold" className={styles.editButtonLabel}>
            정보 수정 요청하기
          </Text>
        </Pressable>
        <Pressable className={styles.linkButton}>
          <Text weight="semibold" className={styles.linkButtonLabel}>
            링크로 접속하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
