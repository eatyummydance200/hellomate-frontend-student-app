import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const timerIcon = require('@/assets/icons/icon-timer.svg');
const arrowRightIcon = require('@/assets/icons/icon-arrow-right-sm.svg');
const alertIcon = require('@/assets/icons/icon-alert-circle.svg');

const CODE_LENGTH = 6;
const START_SECONDS = 180;
const CORRECT_CODE = '123456';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function SignUpVerifyEmailCodeScreen() {
  const router = useRouter();
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const code = digits.join('');
  const isComplete = code.length === CODE_LENGTH;
  const isError = isComplete && code !== CORRECT_CODE;
  const isCorrect = isComplete && code === CORRECT_CODE;

  const handleChangeDigit = (value: string, index: number) => {
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    setDigits(Array(CODE_LENGTH).fill(''));
    setSecondsLeft(START_SECONDS);
    inputRefs.current[0]?.focus();
  };

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

      <View className="flex-1 px-24 pt-24">
        {/* 안내 문구 영역 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[20px] leading-[32px] text-text-strong">
            인증 번호 입력
          </Text>
          <Text weight="medium" className="text-[14px] leading-[20px] text-[#595c7e]">
            이메일로 발송된 6자리 인증 번호를 입력해 주세요.
          </Text>
        </View>

        {/* 인증 번호 입력 영역 */}
        <View className="gap-24 pt-24">
          <View className="gap-6">
            <View className="flex-row justify-between">
              {digits.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleChangeDigit(value, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className={`h-56 w-43 rounded-md border bg-white text-center font-sans text-[20px] ${
                    isError ? 'border-danger text-danger' : 'border-border-strong text-text-strong'
                  }`}
                />
              ))}
            </View>
            {isError && (
              <View className="flex-row items-center gap-4 pt-4">
                <Image source={alertIcon} style={{ width: 15, height: 15 }} />
                <Text weight="medium" className="text-[12px] leading-[16px] text-[#e56d6d]">
                  인증번호가 일치하지 않아요
                </Text>
              </View>
            )}
          </View>

          <View className="items-center">
            <View className="flex-row items-center gap-8">
              <Image source={timerIcon} style={{ width: 15, height: 17.5 }} />
              <Text weight="bold" className={`text-[15px] leading-[22px] ${isError ? 'text-danger' : 'text-primary'}`}>
                {formatTime(secondsLeft)}
              </Text>
            </View>
            <Pressable onPress={handleResend} className="pt-16">
              <Text weight="semibold" className="text-[12px] leading-[16px] text-[#575858] underline">
                인증 번호 재발송
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="px-20 pb-20 pt-8">
        <Pressable
          disabled={!isCorrect}
          className={
            isCorrect
              ? 'h-56 flex-row items-center justify-center gap-8 rounded-lg bg-primary'
              : 'h-56 flex-row items-center justify-center gap-8 rounded-lg bg-text-muted/50'
          }
          onPress={() => router.push('/(auth)/signup-verify-email-done')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            다음
          </Text>
          <Image source={arrowRightIcon} style={{ width: 13.33, height: 13.33 }} />
        </Pressable>
      </View>
    </View>
  );
}
