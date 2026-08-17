import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const warningTriangleIcon = require('@/assets/icons/icon-warning-triangle.svg');
const reuploadIcon = require('@/assets/icons/icon-reupload.svg');

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 items-center justify-center gap-16 px-20',
  iconWrap: 'mb-8 h-80 w-80 items-center justify-center rounded-full bg-[rgba(241,160,82,0.1)] shadow-md',
  title: 'text-center text-[20px] leading-[32px] text-text-strong',
  desc: 'text-center text-[14px] leading-[20px] text-text',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 flex-row items-center justify-center gap-8 rounded-lg bg-primary-light',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

export default function SignUpVerifyDocumentFailedScreen() {
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

      {/* 실패 안내 영역 */}
      <View className={styles.content}>
        <View className={styles.iconWrap}>
          <Image source={warningTriangleIcon} style={{ width: 44, height: 38 }} />
        </View>
        <Text weight="medium" className={styles.title}>
          서류를 다시 확인해 주세요
        </Text>
        <Text weight="medium" className={styles.desc}>
          {'제출하신 학생 인증 서류에서 보완이 필요한\n항목이 발견되었습니다.'}
        </Text>
      </View>

      {/* 다시 제출하기 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.push('/(auth)/signup-verify-document')}>
          <Image source={reuploadIcon} style={{ width: 16, height: 20 }} />
          <Text weight="semibold" className={styles.submitButtonLabel}>
            다시 제출하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
