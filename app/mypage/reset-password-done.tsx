import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const closeIcon = require('@/assets/icons/icon-close.svg');
const checkCircleIcon = require('@/assets/icons/icon-check-circle.svg');

export default function MyPageResetPasswordDoneScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#f6f8f8]">
      <View className="items-end px-20 pt-61">
        <Pressable onPress={() => router.replace('/(tabs)/mypage')} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center gap-4 px-20 pb-96">
        <View className="mb-32 h-96 w-96 items-center justify-center rounded-full bg-primary-light/10">
          <View className="h-80 w-80 items-center justify-center rounded-full bg-primary-light/20">
            <View className="h-64 w-64 items-center justify-center rounded-full bg-primary-light shadow-sm">
              <Image source={checkCircleIcon} style={{ width: 31.44, height: 31.44 }} />
            </View>
          </View>
        </View>
        <Text weight="medium" className="text-center text-[20px] leading-[32px] tracking-[-0.6px] text-text-strong">
          {'비밀번호가 성공적으로\n변경되었습니다.'}
        </Text>
      </View>
    </View>
  );
}
