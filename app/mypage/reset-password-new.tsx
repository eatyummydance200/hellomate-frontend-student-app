import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const lockIcon = require('@/assets/icons/icon-lock.svg');
const eyeToggleIcon = require('@/assets/icons/icon-eye-toggle.svg');

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 gap-24 px-20 pt-24',
  title: 'text-[20px] leading-[32px] text-text-strong',
  desc: 'pt-12 text-[14px] leading-[20px] text-[#595c7e]',
  fieldGroup: 'gap-8',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  inputBox: 'h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-background px-17',
  textInput: 'flex-1 font-sans text-[14px] text-text',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 items-center justify-center rounded-lg bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

export default function MyPageResetPasswordNewScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          비밀번호 재설정
        </Text>
      </View>

      <View className={styles.content}>
        <View>
          <Text weight="medium" className={styles.title}>
            새 비밀번호 설정
          </Text>
          <Text weight="medium" className={styles.desc}>
            안전한 사용을 위해 새로운 비밀번호를 설정해 주세요.
          </Text>
        </View>

        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            새 비밀번호
          </Text>
          <View className={styles.inputBox}>
            <Image source={lockIcon} style={{ width: 16, height: 21 }} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력하세요"
              placeholderTextColor="#bccac3"
              secureTextEntry={!showPassword}
              className={styles.textInput}
            />
            <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
              <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
            </Pressable>
          </View>
        </View>

        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            비밀번호 확인
          </Text>
          <View className={styles.inputBox}>
            <Image source={lockIcon} style={{ width: 16, height: 21 }} />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="비밀번호를 다시 입력하세요"
              placeholderTextColor="#bccac3"
              secureTextEntry={!showConfirmPassword}
              className={styles.textInput}
            />
            <Pressable onPress={() => setShowConfirmPassword((prev) => !prev)} hitSlop={8}>
              <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
            </Pressable>
          </View>
        </View>
      </View>

      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.push('/mypage/reset-password-done')}>
          <Text weight="semibold" className={styles.submitButtonLabel}>
            변경하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
