import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const closeIcon = require('@/assets/icons/icon-close.svg');
const checkCircleIcon = require('@/assets/icons/icon-check-circle.svg');

const styles = {
  container: 'flex-1 bg-[#f6f8f8]',
  closeRow: 'items-end px-20 pt-61',
  content: 'flex-1 items-center justify-center gap-4 px-20 pb-96',
  badgeOuter: 'mb-32 h-96 w-96 items-center justify-center rounded-full bg-primary-light/10',
  badgeMiddle: 'h-80 w-80 items-center justify-center rounded-full bg-primary-light/20',
  badgeInner: 'h-64 w-64 items-center justify-center rounded-full bg-primary-light shadow-sm',
  title: 'text-center text-[20px] leading-[32px] tracking-[-0.6px] text-text-strong',
} as const;

export default function MyPageResetPasswordDoneScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      <View className={styles.closeRow}>
        <Pressable onPress={() => router.replace('/(tabs)/mypage')} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      <View className={styles.content}>
        <View className={styles.badgeOuter}>
          <View className={styles.badgeMiddle}>
            <View className={styles.badgeInner}>
              <Image source={checkCircleIcon} style={{ width: 31.44, height: 31.44 }} />
            </View>
          </View>
        </View>
        <Text weight="medium" className={styles.title}>
          {'비밀번호가 성공적으로\n변경되었습니다.'}
        </Text>
      </View>
    </View>
  );
}
