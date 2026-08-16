import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const lockIcon = require('@/assets/icons/icon-lock.svg');
const eyeToggleIcon = require('@/assets/icons/icon-eye-toggle.svg');

export default function ForgotPasswordNewScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            새 비밀번호 설정
          </Text>
          <Text weight="medium" className="pt-12 text-[14px] leading-[20px] text-[#595c7e]">
            안전한 사용을 위해 새로운 비밀번호를 설정해 주세요.
          </Text>
        </View>

        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            새 비밀번호
          </Text>
          <View className="h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-background px-17">
            <Image source={lockIcon} style={{ width: 16, height: 21 }} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력하세요"
              placeholderTextColor="#bccac3"
              secureTextEntry={!showPassword}
              className="flex-1 font-sans text-[14px] text-text"
            />
            <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
              <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
            </Pressable>
          </View>
        </View>

        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            비밀번호 확인
          </Text>
          <View className="h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-background px-17">
            <Image source={lockIcon} style={{ width: 16, height: 21 }} />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="비밀번호를 다시 입력하세요"
              placeholderTextColor="#bccac3"
              secureTextEntry={!showConfirmPassword}
              className="flex-1 font-sans text-[14px] text-text"
            />
            <Pressable onPress={() => setShowConfirmPassword((prev) => !prev)} hitSlop={8}>
              <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
            </Pressable>
          </View>
        </View>
      </View>

      <View className="px-20 pb-20 pt-8">
        <Pressable
          className="h-56 items-center justify-center rounded-lg bg-primary"
          onPress={() => router.replace('/(auth)')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            변경하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
