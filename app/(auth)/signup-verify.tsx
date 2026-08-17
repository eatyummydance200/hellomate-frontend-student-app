import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const clockIcon = require('@/assets/icons/icon-clock.svg');
const arrowRightIcon = require('@/assets/icons/icon-arrow-right-sm.svg');
const cameraBadgeIcon = require('@/assets/icons/icon-camera-badge.svg');

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 gap-25 px-20 pt-24',
  introSection: 'gap-8',
  introTitle: 'text-[20px] leading-[32px] text-text-strong',
  introDesc: 'text-[14px] leading-[20px] text-text',
  methodsSection: 'gap-25',
  card: 'gap-10 rounded-xl bg-white p-17 shadow-md',
  cardHeaderRow: 'flex-row items-center gap-8',
  cardTitle: 'text-[15px] leading-[22px] text-text-strong',
  badge: 'rounded-full bg-primary-light/20 px-8 py-2',
  badgeText: 'text-[10px] leading-[15px] text-primary-dark',
  cardDesc: 'text-[12px] leading-[20px] text-text',
  timeRow: 'flex-row items-center gap-8 rounded-md bg-background-subtle px-12 py-5',
  timeText: 'text-[10px] leading-[16px] text-text',
  emailButton: 'h-41 flex-row items-center justify-center gap-8 rounded-lg bg-primary',
  emailButtonLabel: 'text-[15px] leading-[24px] text-white',
  docButton: 'h-42 flex-row items-center justify-center gap-8 rounded-lg bg-primary',
  docButtonLabel: 'text-[16px] leading-[24px] text-white',
} as const;

export default function SignUpVerifyScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          학생 인증
        </Text>
      </View>

      <View className={styles.content}>
        {/* 안내 문구 영역 */}
        <View className={styles.introSection}>
          <Text weight="medium" className={styles.introTitle}>
            거의 다 왔어요!
          </Text>
          <Text className={styles.introDesc}>
            {'HelloMate의 안전한 커뮤니티 이용을 위해\n대학교 학생 인증을 완료해주세요.'}
          </Text>
        </View>

        {/* 인증 방법 선택 영역 */}
        <View className={styles.methodsSection}>
          <View className={styles.card}>
            <View className={styles.cardHeaderRow}>
              <Text weight="medium" className={styles.cardTitle}>
                이메일로 인증하기
              </Text>
              <View className={styles.badge}>
                <Text weight="medium" className={styles.badgeText}>
                  가장 빠름
                </Text>
              </View>
            </View>
            <Text className={styles.cardDesc}>
              {'학교 공식 웹메일(@univ.ac.kr)로\n보내드린 인증코드를 입력하세요.'}
            </Text>
            <View className={styles.timeRow}>
              <Image source={clockIcon} style={{ width: 10, height: 10 }} />
              <Text weight="medium" className={styles.timeText}>
                평균 소요 시간: 1분 내외
              </Text>
            </View>
            <Pressable className={styles.emailButton} onPress={() => router.push('/(auth)/signup-verify-email')}>
              <Text weight="medium" className={styles.emailButtonLabel}>
                이메일 인증 시작
              </Text>
              <Image source={arrowRightIcon} style={{ width: 13.33, height: 13.33 }} />
            </Pressable>
          </View>

          <View className={styles.card}>
            <Text weight="medium" className={styles.cardTitle}>
              서류 사진으로 인증하기
            </Text>
            <Text className={styles.cardDesc}>
              {'학생증, 재학증명서 등 증빙 서류를\n사진으로 촬영하여 업로드하세요.'}
            </Text>
            <View className={styles.timeRow}>
              <Image source={clockIcon} style={{ width: 10, height: 10 }} />
              <Text weight="medium" className={styles.timeText}>
                영업일 기준 1~2일 내 승인 완료
              </Text>
            </View>
            <Pressable className={styles.docButton} onPress={() => router.push('/(auth)/signup-verify-document')}>
              <Text weight="medium" className={styles.docButtonLabel}>
                서류 업로드 시작
              </Text>
              <Image source={cameraBadgeIcon} style={{ width: 18.33, height: 16.67 }} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
