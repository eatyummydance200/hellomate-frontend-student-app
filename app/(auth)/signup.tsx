import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const mailIcon = require('@/assets/icons/icon-mail.svg');
const eyeToggleIcon = require('@/assets/icons/icon-eye-toggle.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');

const styles = {
  container: 'flex-1 bg-[#f6f8f8]',
  content: 'flex-1 px-24 pt-24',
  progressSection: 'gap-8',
  progressLabel: 'text-[18px] leading-[24px] text-primary',
  progressBarTrack: 'h-4 overflow-hidden rounded-[2px] bg-[#dee4e0]',
  progressBarFill: 'h-full w-1/3 bg-primary',
  introSection: 'gap-8 pt-23',
  introTitle: 'text-[20px] leading-[30px] text-text-strong',
  introDesc: 'text-[14px] leading-[20px] text-text',
  formSection: 'gap-23 pt-23',
  fieldGroup: 'gap-8',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  nameInputBox: 'h-38 justify-center rounded-md border border-border-strong bg-white px-12',
  textInput: 'font-sans text-[14px] text-text-strong',
  fieldHint: 'text-[12px] leading-[16px] text-text',
  emailInputBox: 'h-38 flex-row items-center gap-10 rounded-md border border-border-strong bg-white px-12',
  textInputFlex: 'flex-1 font-sans text-[14px] text-text-strong',
  idRow: 'flex-row items-center gap-8',
  idInputBox: 'h-38 flex-1 justify-center rounded-md border border-border-strong bg-white px-16',
  idCheckButton: 'h-38 items-center justify-center rounded-md bg-[#d5d7ff] px-16',
  idCheckButtonLabel: 'text-[14px] leading-[20px] text-[#5a5c7f]',
  checkRow: 'flex-row items-center gap-4',
  checkRowLabel: 'text-[12px] leading-[16px] text-primary',
  passwordInputBox: 'h-38 flex-row items-center rounded-md border border-border-strong bg-white px-12',
  passwordHintRow: 'flex-row gap-12 pt-4',
  passwordHintItem: 'flex-row items-center gap-4',
  passwordHintDot: 'h-13 w-13 rounded-full border border-border-strong',
  matchRow: 'flex-row items-center gap-4 pt-4',
  matchLabel: 'text-[12px] leading-[16px] text-primary',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 items-center justify-center rounded-lg bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

const passwordHintText = tv({
  base: 'text-[12px] leading-[16px]',
  variants: {
    valid: {
      true: 'text-primary',
      false: 'text-text-muted',
    },
  },
});

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
    <View className={styles.container}>
      <View className={styles.content}>
        {/* 진행 단계 영역 */}
        <View className={styles.progressSection}>
          <Text weight="bold" className={styles.progressLabel}>
            1 / 3
          </Text>
          <View className={styles.progressBarTrack}>
            <View className={styles.progressBarFill} />
          </View>
        </View>

        {/* 안내 문구 영역 */}
        <View className={styles.introSection}>
          <Text weight="medium" className={styles.introTitle}>
            {'로그인에 사용할 정보를\n입력해 주세요'}
          </Text>
          <Text weight="medium" className={styles.introDesc}>
            아이디와 비밀번호는 로그인할 때 사용됩니다.
          </Text>
        </View>

        {/* 입력 폼 영역 */}
        <View className={styles.formSection}>
          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              이름
            </Text>
            <View className={styles.nameInputBox}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="이름을 입력하세요"
                placeholderTextColor="rgba(61,73,68,0.5)"
                className={styles.textInput}
              />
            </View>
            <Text weight="medium" className={styles.fieldHint}>
              학생 인증 서류와 동일한 이름을 입력해 주세요.
            </Text>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              이메일
            </Text>
            <View className={styles.emailInputBox}>
              <Image source={mailIcon} style={{ width: 20, height: 16 }} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@inu.ac.kr"
                placeholderTextColor="rgba(109,122,116,0.5)"
                autoCapitalize="none"
                keyboardType="email-address"
                className={styles.textInputFlex}
              />
            </View>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              아이디
            </Text>
            <View className={styles.idRow}>
              <View className={styles.idInputBox}>
                <TextInput
                  value={id}
                  onChangeText={(value) => {
                    setId(value);
                    setIsIdChecked(false);
                  }}
                  placeholder="아이디를 입력하세요"
                  placeholderTextColor="rgba(61,73,68,0.5)"
                  autoCapitalize="none"
                  className={styles.textInput}
                />
              </View>
              <Pressable onPress={() => setIsIdChecked(true)} className={styles.idCheckButton}>
                <Text weight="medium" className={styles.idCheckButtonLabel}>
                  중복 확인
                </Text>
              </Pressable>
            </View>
            {isIdChecked && id.length > 0 && (
              <View className={styles.checkRow}>
                <Image source={checkIcon} style={{ width: 12, height: 12 }} />
                <Text weight="medium" className={styles.checkRowLabel}>
                  사용할 수 있는 아이디예요
                </Text>
              </View>
            )}
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              비밀번호
            </Text>
            <View className={styles.passwordInputBox}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className={styles.textInputFlex}
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
                <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
              </Pressable>
            </View>
            <View className={styles.passwordHintRow}>
              <View className={styles.passwordHintItem}>
                {hasMinLength ? (
                  <Image source={checkIcon} style={{ width: 13, height: 13 }} />
                ) : (
                  <View className={styles.passwordHintDot} />
                )}
                <Text weight="medium" className={passwordHintText({ valid: hasMinLength })}>
                  8자 이상
                </Text>
              </View>
              <View className={styles.passwordHintItem}>
                {hasLetterAndNumber ? (
                  <Image source={checkIcon} style={{ width: 13, height: 13 }} />
                ) : (
                  <View className={styles.passwordHintDot} />
                )}
                <Text weight="medium" className={passwordHintText({ valid: hasLetterAndNumber })}>
                  영문, 숫자 포함
                </Text>
              </View>
            </View>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              비밀번호 확인
            </Text>
            <View className={styles.passwordInputBox}>
              <TextInput
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={!showPasswordConfirm}
                className={styles.textInputFlex}
              />
              <Pressable onPress={() => setShowPasswordConfirm((prev) => !prev)} hitSlop={8}>
                <Image source={eyeToggleIcon} style={{ width: 22, height: 15 }} />
              </Pressable>
            </View>
            {passwordsMatch && (
              <View className={styles.matchRow}>
                <Image source={checkIcon} style={{ width: 13, height: 13 }} />
                <Text weight="medium" className={styles.matchLabel}>
                  비밀번호가 일치해요.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 다음 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.push('/(auth)/signup-basic-info')}>
          <Text weight="semibold" className={styles.submitButtonLabel}>
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
