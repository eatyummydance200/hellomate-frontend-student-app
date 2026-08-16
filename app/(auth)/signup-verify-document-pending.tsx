import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const enrollmentCertIcon = require('@/assets/icons/icon-enrollment-cert.svg');

const STEPS = [
  { label: '제출 완료', active: true },
  { label: '검토 중', active: true },
  { label: '인증 완료', active: false },
];

export default function SignUpVerifyDocumentPendingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          서류 인증
        </Text>
      </View>

      {/* 검토 중 안내 영역 */}
      <View className="flex-1 items-center gap-17 px-20 pt-56">
        <View className="h-256 w-256 items-center justify-center rounded-full border-2 border-primary/5">
          <View className="items-center justify-center rounded-3xl bg-white p-32 shadow-md">
            <View className="h-96 w-96 items-center justify-center rounded-full border-2 border-primary bg-primary-light/10">
              <Image source={enrollmentCertIcon} style={{ width: 32, height: 40 }} />
            </View>
          </View>
        </View>

        <View className="w-269 gap-8">
          <View className="flex-row items-center justify-between">
            {STEPS.map((step) => (
              <Text
                key={step.label}
                weight="medium"
                className={`text-[11px] leading-[16.5px] ${step.active ? 'text-primary' : 'text-text-muted'}`}
              >
                {step.label}
              </Text>
            ))}
          </View>
          <View className="h-6 flex-row overflow-hidden rounded-full">
            <View className="w-1/2 bg-primary" />
            <View className="w-1/2 bg-primary/30" />
          </View>
        </View>

        <View className="items-center gap-15 pt-8">
          <Text weight="medium" className="text-center text-[20px] leading-[32px] tracking-[-0.6px] text-text-strong">
            인증 정보를 확인하고 있어요.
          </Text>
          <Text className="text-center text-[14px] leading-[24px] text-text">
            {'제출하신 학생 서류를 꼼꼼히 확인하고 있습니다.\n검토가 완료되면 앱 푸시로 결과를 알려 드릴게요.'}
          </Text>
        </View>
      </View>

      {/* 확인 버튼 영역 */}
      <View className="px-20 pb-20 pt-8">
        <Pressable
          className="h-56 items-center justify-center rounded-lg bg-primary"
          onPress={() => router.push('/(auth)/signup-verify-document-done')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            확인
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
