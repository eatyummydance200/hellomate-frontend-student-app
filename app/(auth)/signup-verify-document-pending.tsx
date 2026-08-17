import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const enrollmentCertIcon = require('@/assets/icons/icon-enrollment-cert.svg');

const STEPS = [
  { label: '제출 완료', active: true },
  { label: '검토 중', active: true },
  { label: '인증 완료', active: false },
];

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 items-center gap-17 px-20 pt-56',
  iconOuter: 'h-256 w-256 items-center justify-center rounded-full border-2 border-primary/5',
  iconMiddle: 'items-center justify-center rounded-3xl bg-white p-32 shadow-md',
  iconInner: 'h-96 w-96 items-center justify-center rounded-full border-2 border-primary bg-primary-light/10',
  stepsWrap: 'w-269 gap-8',
  stepsRow: 'flex-row items-center justify-between',
  progressBar: 'h-6 flex-row overflow-hidden rounded-full',
  progressDone: 'w-1/2 bg-primary',
  progressRemaining: 'w-1/2 bg-primary/30',
  textGroup: 'items-center gap-15 pt-8',
  title: 'text-center text-[20px] leading-[32px] tracking-[-0.6px] text-text-strong',
  desc: 'text-center text-[14px] leading-[24px] text-text',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 items-center justify-center rounded-lg bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

const stepLabel = tv({
  base: 'text-[11px] leading-[16.5px]',
  variants: {
    active: {
      true: 'text-primary',
      false: 'text-text-muted',
    },
  },
});

export default function SignUpVerifyDocumentPendingScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          서류 인증
        </Text>
      </View>

      {/* 검토 중 안내 영역 */}
      <View className={styles.content}>
        <View className={styles.iconOuter}>
          <View className={styles.iconMiddle}>
            <View className={styles.iconInner}>
              <Image source={enrollmentCertIcon} style={{ width: 32, height: 40 }} />
            </View>
          </View>
        </View>

        <View className={styles.stepsWrap}>
          <View className={styles.stepsRow}>
            {STEPS.map((step) => (
              <Text key={step.label} weight="medium" className={stepLabel({ active: step.active })}>
                {step.label}
              </Text>
            ))}
          </View>
          <View className={styles.progressBar}>
            <View className={styles.progressDone} />
            <View className={styles.progressRemaining} />
          </View>
        </View>

        <View className={styles.textGroup}>
          <Text weight="medium" className={styles.title}>
            인증 정보를 확인하고 있어요.
          </Text>
          <Text className={styles.desc}>
            {'제출하신 학생 서류를 꼼꼼히 확인하고 있습니다.\n검토가 완료되면 앱 푸시로 결과를 알려 드릴게요.'}
          </Text>
        </View>
      </View>

      {/* 확인 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.push('/(auth)/signup-verify-document-done')}>
          <Text weight="semibold" className={styles.submitButtonLabel}>
            확인
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
