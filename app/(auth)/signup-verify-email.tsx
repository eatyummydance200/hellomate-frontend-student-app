import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const mailIcon = require('@/assets/icons/icon-mail.svg');

const NOTICES = [
  '반드시 학교 도메인(@ac.kr, @edu 등)이 포함된 공식 메일을 사용해야 합니다.',
  '메일이 도착하지 않는 경우 스팸 메일함을 확인해 주세요.',
  '동일한 이메일로는 한 번만 가입이 가능합니다.',
];

export default function SignUpVerifyEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

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

      <View className="flex-1 px-20 pt-24">
        {/* 안내 문구 영역 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[20px] leading-[32px] text-text-strong">
            학교 이메일을 입력해 주세요.
          </Text>
          <Text className="text-[14px] leading-[20px] text-text">
            학생 인증을 위해 학교 공식 이메일 주소가 필요합니다. 재학 중인 대학교의 이메일을 입력해 주세요.
          </Text>
        </View>

        {/* 이메일 입력 영역 */}
        <View className="gap-8 pt-24">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            학교 이메일
          </Text>
          <View className="h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-white px-17">
            <Image source={mailIcon} style={{ width: 20, height: 16 }} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@inu.ac.kr"
              placeholderTextColor="rgba(109,122,116,0.5)"
              autoCapitalize="none"
              keyboardType="email-address"
              className="flex-1 font-sans text-[14px] text-text-strong"
            />
          </View>
        </View>

        {/* 인증 유의사항 영역 */}
        <View className="gap-12 rounded-xl border border-border-strong/30 bg-background-subtle p-17 mt-24">
          <Text weight="medium" className="text-[13px] leading-[20px] text-text">
            인증 유의사항
          </Text>
          <View className="gap-10">
            {NOTICES.map((notice) => (
              <View key={notice} className="flex-row gap-8">
                <View className="h-12 items-start pt-6">
                  <View className="h-6 w-6 rounded-full bg-primary" />
                </View>
                <Text weight="medium" className="flex-1 text-[10px] leading-[16px] text-text">
                  {notice}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 인증 번호 전송 버튼 영역 */}
      <View className="px-20 pb-20 pt-8">
        <Pressable
          disabled={!email}
          className={`h-56 items-center justify-center rounded-lg ${email ? 'bg-primary' : 'bg-border-strong'}`}
          onPress={() => router.push('/(auth)/signup-verify-email-code')}
        >
          <Text weight="semibold" className={`text-[17px] leading-[22px] ${email ? 'text-white' : 'text-text'}`}>
            인증 번호 전송하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
