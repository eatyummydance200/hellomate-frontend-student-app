import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const checkCircleIcon = require('@/assets/icons/icon-check-circle.svg');

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 items-center justify-center gap-24 px-20',
  badgeOuter: 'h-128 w-128 items-center justify-center rounded-full bg-white shadow-md',
  badgeInner: 'h-116 w-116 items-center justify-center rounded-full border-4 border-primary-light/20',
  title: 'text-center text-[20px] leading-[32px] tracking-[-0.6px] text-text-strong',
  desc: 'text-center text-[14px] leading-[22.75px] text-text',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 items-center justify-center rounded-lg bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

export default function SignUpVerifyEmailDoneScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          이메일 인증
        </Text>
      </View>

      {/* 완료 안내 영역 */}
      <View className={styles.content}>
        <View className={styles.badgeOuter}>
          <View className={styles.badgeInner}>
            <Image source={checkCircleIcon} style={{ width: 53, height: 53 }} />
          </View>
        </View>
        <Text weight="medium" className={styles.title}>
          이메일 인증이 완료되었어요
        </Text>
        <Text className={styles.desc}>
          {'이제 HelloMate의 모든 서비스를\n자유롭게 이용하실 수 있습니다.'}
        </Text>
      </View>

      {/* 로그인 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.replace('/(auth)')}>
          <Text weight="semibold" className={styles.submitButtonLabel}>
            로그인
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
