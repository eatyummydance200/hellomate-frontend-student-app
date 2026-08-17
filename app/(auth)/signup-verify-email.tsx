import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const mailIcon = require('@/assets/icons/icon-mail.svg');

const NOTICES = [
  '반드시 학교 도메인(@ac.kr, @edu 등)이 포함된 공식 메일을 사용해야 합니다.',
  '메일이 도착하지 않는 경우 스팸 메일함을 확인해 주세요.',
  '동일한 이메일로는 한 번만 가입이 가능합니다.',
];

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 px-20 pt-24',
  introSection: 'gap-8',
  introTitle: 'text-[20px] leading-[32px] text-text-strong',
  introDesc: 'text-[14px] leading-[20px] text-text',
  fieldGroup: 'gap-8 pt-24',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  inputBox: 'h-56 flex-row items-center gap-12 rounded-md border border-border-strong bg-white px-17',
  textInput: 'flex-1 font-sans text-[14px] text-text-strong',
  noticeBox: 'gap-12 rounded-xl border border-border-strong/30 bg-background-subtle p-17 mt-24',
  noticeTitle: 'text-[13px] leading-[20px] text-text',
  noticeList: 'gap-10',
  noticeRow: 'flex-row gap-8',
  noticeDotWrap: 'h-12 items-start pt-6',
  noticeDot: 'h-6 w-6 rounded-full bg-primary',
  noticeText: 'flex-1 text-[10px] leading-[16px] text-text',
  footer: 'px-20 pb-20 pt-8',
} as const;

const submitButton = tv({
  base: 'h-56 items-center justify-center rounded-lg',
  variants: {
    hasEmail: {
      true: 'bg-primary',
      false: 'bg-border-strong',
    },
  },
});

const submitButtonLabel = tv({
  base: 'text-[17px] leading-[22px]',
  variants: {
    hasEmail: {
      true: 'text-white',
      false: 'text-text',
    },
  },
});

export default function SignUpVerifyEmailScreen() {
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
          이메일 인증
        </Text>
      </View>

      <View className={styles.content}>
        {/* 안내 문구 영역 */}
        <View className={styles.introSection}>
          <Text weight="medium" className={styles.introTitle}>
            학교 이메일을 입력해 주세요.
          </Text>
          <Text className={styles.introDesc}>
            학생 인증을 위해 학교 공식 이메일 주소가 필요합니다. 재학 중인 대학교의 이메일을 입력해 주세요.
          </Text>
        </View>

        {/* 이메일 입력 영역 */}
        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            학교 이메일
          </Text>
          <View className={styles.inputBox}>
            <Image source={mailIcon} style={{ width: 20, height: 16 }} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@inu.ac.kr"
              placeholderTextColor="rgba(109,122,116,0.5)"
              autoCapitalize="none"
              keyboardType="email-address"
              className={styles.textInput}
            />
          </View>
        </View>

        {/* 인증 유의사항 영역 */}
        <View className={styles.noticeBox}>
          <Text weight="medium" className={styles.noticeTitle}>
            인증 유의사항
          </Text>
          <View className={styles.noticeList}>
            {NOTICES.map((notice) => (
              <View key={notice} className={styles.noticeRow}>
                <View className={styles.noticeDotWrap}>
                  <View className={styles.noticeDot} />
                </View>
                <Text weight="medium" className={styles.noticeText}>
                  {notice}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 인증 번호 전송 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable
          disabled={!email}
          className={submitButton({ hasEmail: Boolean(email) })}
          onPress={() => router.push('/(auth)/signup-verify-email-code')}
        >
          <Text weight="semibold" className={submitButtonLabel({ hasEmail: Boolean(email) })}>
            인증 번호 전송하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
