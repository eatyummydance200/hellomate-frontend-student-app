import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const mailIcon = require('@/assets/icons/icon-mail.svg');
const eyeToggleIcon = require('@/assets/icons/icon-eye-toggle.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('hellomate_student');
  const [isIdChecked, setIsIdChecked] = useState(true);
  const [password, setPassword] = useState('pa1234');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('pa1234');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasLetterAndNumber = /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const passwordsMatch = passwordConfirm.length > 0 && passwordConfirm === password;

  return (
    <View className="flex-1 bg-[#f6f8f8]">
      <View className="flex-1 px-24 pt-24">
        {/* 진행 단계 영역 */}
        <View className="gap-8">
          <Text weight="bold" className="text-[18px] leading-[24px] text-primary">
            1 / 3
          </Text>
          <View className="h-4 overflow-hidden rounded-[2px] bg-[#dee4e0]">
            <View className="h-full w-1/3 bg-primary" />
          </View>
        </View>

        {/* 안내 문구 영역 */}
        <View className="gap-8 pt-23">
          <Text weight="medium" className="text-[20px] leading-[30px] text-text-strong">
            {'로그인에 사용할 정보를\n입력해 주세요'}
          </Text>
          <Text weight="medium" className="text-[14px] leading-[20px] text-text">
            아이디와 비밀번호는 로그인할 때 사용됩니다.
          </Text>
        </View>

        {/* 입력 폼 영역 */}
        <View className="gap-23 pt-23">
          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              이름
            </Text>
            <View className="h-38 justify-center rounded-md border border-border-strong bg-white px-12">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="이름을 입력하세요"
                placeholderTextColor="rgba(61,73,68,0.5)"
                className="font-sans text-[14px] text-text-strong"
              />
            </View>
            <Text weight="medium" className="text-[12px] leading-[16px] text-text">
              학생 인증 서류와 동일한 이름을 입력해 주세요.
            </Text>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              이메일
            </Text>
            <View className="h-38 flex-row items-center gap-10 rounded-md border border-border-strong bg-white px-12">
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

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              아이디
            </Text>
            <View className="flex-row items-center gap-8">
              <View className="h-38 flex-1 justify-center rounded-md border border-border-strong bg-white px-16">
                <TextInput
                  value={id}
                  onChangeText={(value) => {
                    setId(value);
                    setIsIdChecked(false);
                  }}
                  placeholder="아이디를 입력하세요"
                  placeholderTextColor="rgba(61,73,68,0.5)"
                  autoCapitalize="none"
                  className="font-sans text-[14px] text-text-strong"
                />
              </View>
              <Pressable
                onPress={() => setIsIdChecked(true)}
                className="h-38 items-center justify-center rounded-md bg-[#d5d7ff] px-16"
              >
                <Text weight="medium" className="text-[14px] leading-[20px] text-[#5a5c7f]">
                  중복 확인
                </Text>
              </Pressable>
            </View>
            {isIdChecked && id.length > 0 && (
              <View className="flex-row items-center gap-4">
                <Image source={checkIcon} style={{ width: 12, height: 12 }} />
                <Text weight="medium" className="text-[12px] leading-[16px] text-primary">
                  사용할 수 있는 아이디예요
                </Text>
              </View>
            )}
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              비밀번호
            </Text>
            <View className="h-38 flex-row items-center rounded-md border border-border-strong bg-white px-12">
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 font-sans text-[14px] text-text-strong"
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
                <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
              </Pressable>
            </View>
            <View className="flex-row gap-12 pt-4">
              <View className="flex-row items-center gap-4">
                {hasMinLength ? (
                  <Image source={checkIcon} style={{ width: 13, height: 13 }} />
                ) : (
                  <View className="h-13 w-13 rounded-full border border-border-strong" />
                )}
                <Text weight="medium" className={`text-[12px] leading-[16px] ${hasMinLength ? 'text-primary' : 'text-text-muted'}`}>
                  8자 이상
                </Text>
              </View>
              <View className="flex-row items-center gap-4">
                {hasLetterAndNumber ? (
                  <Image source={checkIcon} style={{ width: 13, height: 13 }} />
                ) : (
                  <View className="h-13 w-13 rounded-full border border-border-strong" />
                )}
                <Text weight="medium" className={`text-[12px] leading-[16px] ${hasLetterAndNumber ? 'text-primary' : 'text-text-muted'}`}>
                  영문, 숫자 포함
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              비밀번호 확인
            </Text>
            <View className="h-38 flex-row items-center rounded-md border border-border-strong bg-white px-12">
              <TextInput
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={!showPasswordConfirm}
                className="flex-1 font-sans text-[14px] text-text-strong"
              />
              <Pressable onPress={() => setShowPasswordConfirm((prev) => !prev)} hitSlop={8}>
                <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
              </Pressable>
            </View>
            {passwordsMatch && (
              <View className="flex-row items-center gap-4 pt-4">
                <Image source={checkIcon} style={{ width: 13, height: 13 }} />
                <Text weight="medium" className="text-[12px] leading-[16px] text-primary">
                  비밀번호가 일치해요.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 다음 버튼 영역 */}
      <View className="px-20 pb-20 pt-8">
        <Pressable
          className="h-56 items-center justify-center rounded-lg bg-primary"
          onPress={() => router.push('/(auth)/signup-basic-info')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
