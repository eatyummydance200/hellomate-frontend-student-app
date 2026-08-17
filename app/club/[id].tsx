import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const chatBubbleIcon = require('@/assets/icons/icon-chat-bubble.svg');
const hostAvatar = require('@/assets/images/club-host-avatar.png');

// Figma 시안 기준 고정 콘텐츠. 실제 클럽 조회는 Phase 5에서 id로 연동.
const CLUB = {
  title: '아시아 음식 러버들',
  intro: [
    '아시아 음식 러버들에 오신 것을 환영합니다! 🍜 저희는 아시아 전역의 정통 맛을 사랑하는 유학생 모임입니다.',
    '고향의 맛이 그립거나 새로운 요리에 도전하고 싶으신 분들을 위해, 저희는 매주 맛집 탐방, 요리 교실, 그리고 최고의 식재료를 찾기 위한 마켓 투어를 진행합니다.',
  ],
  bullets: ['매주 금요일 저녁 7시 저녁 모임', '정통 레시피 공유 및 요리 교실', '신입생들을 위한 지원 커뮤니티'],
  spotsLeftLabel: '7자리 남았어요',
  progressPercent: 65,
  hostName: 'Ji-won Kim',
  hostRole: '국제 홍보대사',
};

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-20 px-20 pb-32 pt-16',
  title: 'text-[20px] leading-[30px] text-text-strong',
  introCard: 'gap-12 rounded-xl bg-background p-16 shadow-sm',
  introTitle: 'text-[17px] leading-[22px] text-text-strong',
  introBody: 'gap-12',
  introParagraph: 'text-[14px] leading-[20px] text-text',
  bulletList: 'gap-8',
  progressCard: 'gap-12 rounded-lg bg-background px-16 py-13 shadow-sm',
  progressHeaderRow: 'flex-row items-center justify-between',
  progressTitle: 'text-[16px] leading-[24px] text-text-strong',
  progressSpotsLeft: 'text-[14px] leading-[20px] text-primary',
  progressTrack: 'h-12 overflow-hidden rounded-full bg-background-muted',
  progressFill: 'h-full rounded-full bg-primary',
  hostRow: 'flex-row items-center justify-between rounded-lg bg-background-muted/50 p-16',
  hostInfoRow: 'flex-row items-center gap-12',
  hostAvatarWrap: 'h-48 w-48 items-center justify-center overflow-hidden rounded-full border-2 border-background shadow-sm',
  hostTextWrap: 'gap-[2px]',
  hostName: 'text-[16px] leading-[24px] text-text-strong',
  hostRole: 'text-[12px] leading-[18px] text-text',
  hostChatButton: 'h-40 w-40 items-center justify-center rounded-full bg-primary',
  footer: 'gap-9 border-t border-border-strong/20 bg-background/80 px-18 pb-18 pt-19',
  footerNote: 'text-center text-[12px] leading-[18px] text-text',
  joinButton: 'h-[52px] w-full items-center justify-center rounded-lg bg-primary',
} as const;

export default function ClubDetailScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          클럽 상세글
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text weight="semibold" className={styles.title}>
          {CLUB.title}
        </Text>

        {/* 클럽 소개 카드 */}
        <View className={styles.introCard}>
          <Text weight="medium" className={styles.introTitle}>
            클럽 소개
          </Text>
          <View className={styles.introBody}>
            {CLUB.intro.map((paragraph) => (
              <Text key={paragraph} weight="medium" className={styles.introParagraph}>
                {paragraph}
              </Text>
            ))}
            <View className={styles.bulletList}>
              {CLUB.bullets.map((bullet) => (
                <Text key={bullet} weight="medium" className={styles.introParagraph}>
                  {bullet}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* 모집 현황 진행바 */}
        <View className={styles.progressCard}>
          <View className={styles.progressHeaderRow}>
            <Text weight="medium" className={styles.progressTitle}>
              모집 현황
            </Text>
            <Text weight="medium" className={styles.progressSpotsLeft}>
              {CLUB.spotsLeftLabel}
            </Text>
          </View>
          <View className={styles.progressTrack}>
            <View className={styles.progressFill} style={{ width: `${CLUB.progressPercent}%` }} />
          </View>
        </View>

        {/* 클럽장 정보 */}
        <View className={styles.hostRow}>
          <View className={styles.hostInfoRow}>
            <View className={styles.hostAvatarWrap}>
              <Image source={hostAvatar} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            </View>
            <View className={styles.hostTextWrap}>
              <Text weight="bold" className={styles.hostName}>
                {CLUB.hostName}
              </Text>
              <Text weight="medium" className={styles.hostRole}>
                {CLUB.hostRole}
              </Text>
            </View>
          </View>
          <Pressable className={styles.hostChatButton}>
            <Image source={chatBubbleIcon} style={{ width: 20, height: 20 }} />
          </Pressable>
        </View>
      </ScrollView>

      {/* 하단 고정 참여 CTA */}
      <View className={styles.footer}>
        <Text weight="medium" className={styles.footerNote}>
          가입하면 클럽 채팅방에 참여할 수 있어요
        </Text>
        <Pressable className={styles.joinButton} onPress={() => router.push('/club/joined')}>
          <Text weight="semibold" color="inverse" size="body">
            참여하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
