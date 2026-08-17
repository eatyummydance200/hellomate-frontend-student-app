import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const timerIcon = require('@/assets/icons/icon-timer.svg');
const arrowRightIcon = require('@/assets/icons/icon-arrow-right-sm.svg');

const CODE_LENGTH = 6;
const START_SECONDS = 180;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 px-20 pt-24',
  title: 'text-[20px] leading-[32px] text-text-strong',
  desc: 'pt-12 text-[14px] leading-[20px] text-[#595c7e]',
  codeRow: 'flex-row justify-between pt-24',
  codeInput: 'h-56 w-43 rounded-md border border-border-strong bg-background text-center font-sans text-[20px] text-text-strong',
  timerSection: 'items-center pt-24',
  timerRow: 'flex-row items-center gap-8',
  timerText: 'text-[15px] leading-[22px] text-primary',
  resendButton: 'pt-16',
  resendLabel: 'text-[12px] leading-[16px] text-[#575858] underline',
  footer: 'px-20 pb-20 pt-8',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

const submitButton = tv({
  base: 'h-56 flex-row items-center justify-center gap-8 rounded-lg',
  variants: {
    complete: {
      true: 'bg-primary',
      false: 'bg-text-muted/50',
    },
  },
});

export default function ForgotPasswordVerifyScreen() {
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
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          비밀번호 찾기
        </Text>
      </View>

      <View className={styles.content}>
        <Text weight="medium" className={styles.title}>
          인증 번호 입력
        </Text>
        <Text weight="medium" className={styles.desc}>
          이메일로 발송된 6자리 인증 번호를 입력해 주세요.
        </Text>

        {/* 인증 번호 입력 박스 */}
        <View className={styles.codeRow}>
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
              className={styles.codeInput}
            />
          ))}
        </View>

        <View className={styles.timerSection}>
          <View className={styles.timerRow}>
            <Image source={timerIcon} style={{ width: 15, height: 17.5 }} />
            <Text weight="bold" className={styles.timerText}>
              {formatTime(secondsLeft)}
            </Text>
          </View>
          <Pressable onPress={handleResend} className={styles.resendButton}>
            <Text weight="semibold" className={styles.resendLabel}>
              인증 번호 재발송
            </Text>
          </Pressable>
        </View>
      </View>

      <View className={styles.footer}>
        <Pressable
          disabled={!isComplete}
          className={submitButton({ complete: isComplete })}
          onPress={() => router.push('/(auth)/forgot-password-new')}
        >
          <Text weight="semibold" className={styles.submitButtonLabel}>
            다음
          </Text>
          <Image source={arrowRightIcon} style={{ width: 13.33, height: 13.33 }} />
        </Pressable>
      </View>
    </View>
  );
}
