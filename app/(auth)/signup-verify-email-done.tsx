import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const checkCircleIcon = require('@/assets/icons/icon-check-circle.svg');

export default function SignUpVerifyEmailDoneScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          이메일 인증
        </Text>
      </View>

      {/* 완료 안내 영역 */}
      <View className="flex-1 items-center justify-center gap-24 px-20">
        <View className="h-128 w-128 items-center justify-center rounded-full bg-white shadow-md">
          <View className="h-116 w-116 items-center justify-center rounded-full border-4 border-primary-light/20">
            <Image source={checkCircleIcon} style={{ width: 53, height: 53 }} />
          </View>
        </View>
        <Text weight="medium" className="text-center text-[20px] leading-[32px] tracking-[-0.6px] text-text-strong">
          이메일 인증이 완료되었어요
        </Text>
        <Text className="text-center text-[14px] leading-[22.75px] text-text">
          {'이제 HelloMate의 모든 서비스를\n자유롭게 이용하실 수 있습니다.'}
        </Text>
      </View>

      {/* 로그인 버튼 영역 */}
      <View className="px-20 pb-20 pt-8">
        <Pressable
          className="h-56 items-center justify-center rounded-lg bg-primary"
          onPress={() => router.replace('/(auth)')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            로그인
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
