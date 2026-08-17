import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const checkIcon = require('@/assets/icons/icon-check.svg');

const styles = {
  overlay: 'flex-1 justify-end bg-black/20',
  backdrop: 'absolute inset-0',
  sheet: 'gap-16 rounded-t-[32px] bg-background px-20 pb-32 pt-20 shadow-lg',
  handle: 'h-6 w-48 self-center rounded-full bg-border-strong',
  content: 'items-center gap-16 pt-16',
  badgeOuter: 'h-64 w-64 items-center justify-center rounded-full bg-primary-light/20',
  badgeInner: 'h-40 w-40 items-center justify-center rounded-full bg-primary',
  textGroup: 'items-center gap-8',
  title: 'text-[20px] leading-[32px] text-text-strong',
  desc: 'text-[14px] leading-[20px] text-text',
  enterButton: 'h-[52px] w-full items-center justify-center rounded-lg bg-primary',
} as const;

export default function ClubJoinedScreen() {
  const router = useRouter();

  return (
    <View className={styles.overlay}>
      <Pressable className={styles.backdrop} onPress={() => router.back()} />

      {/* 가입 완료 바텀시트 */}
      <View className={styles.sheet}>
        <View className={styles.handle} />

        <View className={styles.content}>
          <View className={styles.badgeOuter}>
            <View className={styles.badgeInner}>
              <Image source={checkIcon} style={{ width: 19, height: 14 }} />
            </View>
          </View>
          <View className={styles.textGroup}>
            <Text weight="medium" className={styles.title}>
              클럽에 참여했어요!
            </Text>
            <Text className={styles.desc}>멤버들과 채팅방에서 인사해보세요.</Text>
          </View>
        </View>

        <Pressable className={styles.enterButton} onPress={() => router.replace('/club/chat')}>
          <Text weight="semibold" color="inverse" size="body">
            채팅방 입장하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
