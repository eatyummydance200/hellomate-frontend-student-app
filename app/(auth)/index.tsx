import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const logo = require('@/assets/images/logo-lockup.svg');
const userIcon = require('@/assets/icons/icon-user.svg');
const lockIcon = require('@/assets/icons/icon-lock.svg');
const eyeToggleIcon = require('@/assets/icons/icon-eye-toggle.svg');
const alertIcon = require('@/assets/icons/icon-alert-circle.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');

const DUMMY_ID = 'student123';
const DUMMY_PASSWORD = 'hellomate123';

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (id === DUMMY_ID && password === DUMMY_PASSWORD) {
      router.replace('/(tabs)');
      return;
    }
    setError(true);
  };

  const fieldBorder = error ? 'border-danger' : 'border-border-strong';

  return (
    <View className="flex-1 bg-[#f6f8f8]">
      <View className="flex-1 items-center px-36 pt-136">
        {/* 로고 영역 */}
        <Image source={logo} style={{ width: 75, height: 73 }} />

        {/* 입력 폼 영역 */}
        <View className="w-full gap-16 pt-40">
          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              아이디
            </Text>
            <View className={`h-56 flex-row items-center gap-12 rounded-md border ${fieldBorder} bg-white px-17`}>
              <Image source={userIcon} style={{ width: 16, height: 16 }} />
              <TextInput
                value={id}
                onChangeText={(value) => {
                  setId(value);
                  setError(false);
                }}
                placeholder="아이디를 입력하세요"
                placeholderTextColor="#bccac3"
                autoCapitalize="none"
                className="flex-1 font-sans text-[14px] text-text-strong"
              />
            </View>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              비밀번호
            </Text>
            <View className={`h-56 flex-row items-center gap-12 rounded-md border ${fieldBorder} bg-white px-17`}>
              <Image source={lockIcon} style={{ width: 16, height: 21 }} />
              <TextInput
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setError(false);
                }}
                placeholder="비밀번호를 입력하세요"
                placeholderTextColor="#bccac3"
                secureTextEntry={!showPassword}
                className="flex-1 font-sans text-[14px] text-text-strong"
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
                <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
              </Pressable>
            </View>
            {error && (
              <View className="flex-row items-center gap-4">
                <Image source={alertIcon} style={{ width: 13.33, height: 13.33 }} />
                <Text weight="medium" className="text-[12px] leading-[16px] text-danger">
                  아이디 또는 비밀번호를 확인해 주세요
                </Text>
              </View>
            )}
          </View>

          {/* 로그인 버튼 영역 */}
          <View className="gap-16 pt-16">
            <Pressable className="h-52 items-center justify-center rounded-xl bg-[#49c9a7]" onPress={handleLogin}>
              <Text weight="semibold" className="text-[16px] leading-[24px] text-white">
                로그인
              </Text>
            </Pressable>

            <View className="flex-row items-center justify-between px-4">
              <Pressable
                className="flex-row items-center gap-8"
                onPress={() => setAutoLogin((prev) => !prev)}
                hitSlop={8}
              >
                <View
                  className={
                    autoLogin
                      ? 'h-16 w-16 items-center justify-center rounded-[4px] bg-primary'
                      : 'h-16 w-16 items-center justify-center rounded-[4px] border border-border-strong bg-white'
                  }
                >
                  {autoLogin && <Image source={checkIcon} style={{ width: 10, height: 7.4 }} />}
                </View>
                <Text weight="medium" className="text-[12px] leading-[16px] text-text">
                  자동 로그인
                </Text>
              </Pressable>
              <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
                <Text weight="medium" className="text-[12px] leading-[16px] text-text">
                  비밀번호 찾기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* 하단 회원가입 유도 영역 */}
      <View className="flex-row items-center justify-center gap-8 px-20 pb-32">
        <Text className="text-[14px] leading-[24px] text-[#595c7e]">아직 계정이 없으신가요?</Text>
        <Pressable onPress={() => router.push('/(auth)/signup')}>
          <Text weight="semibold" className="text-[14px] leading-[24px] text-[#49c9a7]">
            회원가입
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
