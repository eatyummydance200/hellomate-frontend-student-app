import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const mailIcon = require('@/assets/icons/icon-mail.svg');

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          비밀번호 찾기
        </Text>
      </View>

      <View className="flex-1 gap-24 px-20 pt-24">
        <View>
          <Text weight="medium" className="text-[20px] leading-[32px] text-text-strong">
            비밀번호를 잊으셨나요?
          </Text>
          <Text weight="medium" className="pt-12 text-[14px] leading-[22.75px] text-[#595c7e]">
            {'가입 시 등록한 이메일 주소를 입력해 주세요.\n비밀번호 재설정을 위한 인증 번호를 보내드립니다.'}
          </Text>
        </View>

        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            이메일
          </Text>
          <View className="h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-background px-17">
            <Image source={mailIcon} style={{ width: 20, height: 16 }} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@inu.ac.kr"
              placeholderTextColor="rgba(109,122,116,0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 font-sans text-[14px] text-text"
            />
          </View>
        </View>
      </View>

      <View className="px-20 pb-20 pt-8">
        <Pressable
          className="h-56 items-center justify-center rounded-lg bg-primary"
          onPress={() => router.push('/(auth)/forgot-password-verify')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            인증 번호 전송하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
