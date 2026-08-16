import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const checkIcon = require('@/assets/icons/icon-check.svg');

export default function ClubJoinedScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-end bg-black/20">
      <Pressable className="absolute inset-0" onPress={() => router.back()} />

      {/* 가입 완료 바텀시트 */}
      <View className="gap-16 rounded-t-[32px] bg-background px-20 pb-32 pt-20 shadow-lg">
        <View className="h-6 w-48 self-center rounded-full bg-border-strong" />

        <View className="items-center gap-16 pt-16">
          <View className="h-64 w-64 items-center justify-center rounded-full bg-primary-light/20">
            <View className="h-40 w-40 items-center justify-center rounded-full bg-primary">
              <Image source={checkIcon} style={{ width: 19, height: 14 }} />
            </View>
          </View>
          <View className="items-center gap-8">
            <Text weight="medium" className="text-[20px] leading-[32px] text-text-strong">
              클럽에 참여했어요!
            </Text>
            <Text className="text-[14px] leading-[20px] text-text">멤버들과 채팅방에서 인사해보세요.</Text>
          </View>
        </View>

        <Pressable
          className="h-[52px] w-full items-center justify-center rounded-lg bg-primary"
          onPress={() => router.replace('/club/chat')}
        >
          <Text weight="semibold" color="inverse" size="body">
            채팅방 입장하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
