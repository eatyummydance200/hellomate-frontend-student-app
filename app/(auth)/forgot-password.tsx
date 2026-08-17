import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const mailIcon = require('@/assets/icons/icon-mail.svg');

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 gap-24 px-20 pt-24',
  introTitle: 'text-[20px] leading-[32px] text-text-strong',
  introDesc: 'pt-12 text-[14px] leading-[22.75px] text-[#595c7e]',
  fieldGroup: 'gap-8',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  inputBox: 'h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-background px-17',
  textInput: 'flex-1 font-sans text-[14px] text-text',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 items-center justify-center rounded-lg bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

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
        <View>
          <Text weight="medium" className={styles.introTitle}>
            비밀번호를 잊으셨나요?
          </Text>
          <Text weight="medium" className={styles.introDesc}>
            {'가입 시 등록한 이메일 주소를 입력해 주세요.\n비밀번호 재설정을 위한 인증 번호를 보내드립니다.'}
          </Text>
        </View>

        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            이메일
          </Text>
          <View className={styles.inputBox}>
            <Image source={mailIcon} style={{ width: 20, height: 16 }} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@inu.ac.kr"
              placeholderTextColor="rgba(109,122,116,0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              className={styles.textInput}
            />
          </View>
        </View>
      </View>

      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.push('/(auth)/forgot-password-verify')}>
          <Text weight="semibold" className={styles.submitButtonLabel}>
            인증 번호 전송하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
