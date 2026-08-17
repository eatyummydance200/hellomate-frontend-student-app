import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const searchIcon = require('@/assets/icons/icon-search.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');

const GRADES = ['1학년', '2학년', '3학년', '4학년', '초과 학기', '대학원'];

const styles = {
  container: 'flex-1 bg-[#f6f8f8]',
  content: 'flex-1 px-24 pt-24',
  progressSection: 'gap-8',
  progressLabel: 'text-[18px] leading-[24px] text-primary',
  progressBarTrack: 'h-4 overflow-hidden rounded-[2px] bg-primary',
  introSection: 'gap-8 pt-23',
  introTitle: 'text-[20px] leading-[30px] text-text-strong',
  introDesc: 'text-[14px] leading-[20px] text-text',
  formSection: 'gap-23 pt-23',
  fieldGroup: 'gap-8',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  majorBox: 'h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-white px-13',
  gradeRow: 'flex-row flex-wrap gap-8',
  termsSection: 'gap-16 px-4 pt-32',
  allAgreeRow: 'flex-row items-center gap-12',
  allAgreeLabel: 'text-[16px] leading-[24px] text-text-strong',
  divider: 'h-[1px] bg-border-strong/30',
  termRow: 'flex-row items-center justify-between',
  termCheckRow: 'flex-row items-center gap-12',
  termLabel: 'text-[14px] leading-[20px] text-text',
  termViewLabel: 'text-[12px] leading-[16px] text-text-muted underline',
  footer: 'flex-row gap-17 px-21 pb-20 pt-8',
  backButton: 'h-56 flex-1 items-center justify-center rounded-lg bg-border-strong',
  backButtonLabel: 'text-[17px] leading-[22px] text-text',
} as const;

const majorLabel = tv({
  base: 'text-[14px] leading-[20px]',
  variants: {
    hasMajor: {
      true: 'text-text-strong',
      false: 'text-text',
    },
  },
});

const gradeOption = tv({
  base: 'h-31 items-center justify-center rounded-md border-2 px-16',
  variants: {
    selected: {
      true: 'border-primary bg-primary-light/10',
      false: 'border-border-strong bg-white',
    },
  },
});

const gradeLabel = tv({
  base: 'text-[14px] leading-[16px]',
  variants: {
    selected: {
      true: 'text-primary',
      false: 'text-text',
    },
  },
});

const bigCheckbox = tv({
  base: 'h-24 w-24 items-center justify-center rounded-md border-2',
  variants: {
    checked: {
      true: 'border-primary bg-primary',
      false: 'border-border-strong bg-white',
    },
  },
});

const smallCheckbox = tv({
  base: 'h-20 w-20 items-center justify-center rounded-[6px] border-2',
  variants: {
    checked: {
      true: 'border-primary bg-primary',
      false: 'border-border-strong bg-white',
    },
  },
});

const nextButton = tv({
  base: 'h-56 flex-[1.4] items-center justify-center rounded-lg',
  variants: {
    canVerify: {
      true: 'bg-primary',
      false: 'bg-border-strong',
    },
  },
});

const nextButtonLabel = tv({
  base: 'text-[17px] leading-[22px]',
  variants: {
    canVerify: {
      true: 'text-white',
      false: 'text-text',
    },
  },
});

export default function SignUpSchoolInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ major?: string }>();
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState(GRADES[0]);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    if (params.major) setMajor(params.major);
  }, [params.major]);

  const allAgreed = agreeTerms && agreePrivacy;
  const canVerify = agreeTerms && agreePrivacy;

  const toggleAll = () => {
    const next = !allAgreed;
    setAgreeTerms(next);
    setAgreePrivacy(next);
  };

  return (
    <View className={styles.container}>
      <View className={styles.content}>
        {/* 진행 단계 영역 */}
        <View className={styles.progressSection}>
          <Text weight="bold" className={styles.progressLabel}>
            3 / 3
          </Text>
          <View className={styles.progressBarTrack} />
        </View>

        {/* 안내 문구 영역 */}
        <View className={styles.introSection}>
          <Text weight="medium" className={styles.introTitle}>
            학교 정보를 입력해 주세요.
          </Text>
          <Text weight="medium" className={styles.introDesc}>
            전공과 학년에 맞는 공지를 제공하는 데 사용됩니다.
          </Text>
        </View>

        {/* 전공/학년 입력 영역 */}
        <View className={styles.formSection}>
          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              전공
            </Text>
            <Pressable onPress={() => router.push('/(auth)/signup-major-search')} className={styles.majorBox}>
              <Text weight="medium" className={majorLabel({ hasMajor: Boolean(major) })}>
                {major || '전공을 선택하거나 검색하세요'}
              </Text>
              <Image source={searchIcon} style={{ width: 16, height: 16 }} />
            </Pressable>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              학년
            </Text>
            <View className={styles.gradeRow}>
              {GRADES.map((g) => {
                const selected = grade === g;
                return (
                  <Pressable key={g} onPress={() => setGrade(g)} className={gradeOption({ selected })}>
                    <Text weight="medium" className={gradeLabel({ selected })}>
                      {g}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* 약관 동의 영역 */}
        <View className={styles.termsSection}>
          <Pressable onPress={toggleAll} className={styles.allAgreeRow}>
            <View className={bigCheckbox({ checked: allAgreed })}>
              {allAgreed && <Image source={checkIcon} style={{ width: 14, height: 14 }} />}
            </View>
            <Text weight="medium" className={styles.allAgreeLabel}>
              전체 동의
            </Text>
          </Pressable>

          <View className={styles.divider} />

          <View className={styles.termRow}>
            <Pressable onPress={() => setAgreeTerms((prev) => !prev)} className={styles.termCheckRow}>
              <View className={smallCheckbox({ checked: agreeTerms })}>
                {agreeTerms && <Image source={checkIcon} style={{ width: 12, height: 12 }} />}
              </View>
              <Text weight="medium" className={styles.termLabel}>
                서비스 이용약관 동의(필수)
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(auth)/signup-terms')}>
              <Text weight="medium" className={styles.termViewLabel}>
                보기
              </Text>
            </Pressable>
          </View>

          <View className={styles.termRow}>
            <Pressable onPress={() => setAgreePrivacy((prev) => !prev)} className={styles.termCheckRow}>
              <View className={smallCheckbox({ checked: agreePrivacy })}>
                {agreePrivacy && <Image source={checkIcon} style={{ width: 12, height: 12 }} />}
              </View>
              <Text weight="medium" className={styles.termLabel}>
                개인정보 수집 및 이용 동의(필수)
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(auth)/signup-terms')}>
              <Text weight="medium" className={styles.termViewLabel}>
                보기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* 이전/인증하기 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable className={styles.backButton} onPress={() => router.back()}>
          <Text weight="semibold" className={styles.backButtonLabel}>
            이전
          </Text>
        </Pressable>
        <Pressable disabled={!canVerify} className={nextButton({ canVerify })} onPress={() => router.push('/(auth)/signup-verify')}>
          <Text weight="semibold" className={nextButtonLabel({ canVerify })}>
            인증하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
