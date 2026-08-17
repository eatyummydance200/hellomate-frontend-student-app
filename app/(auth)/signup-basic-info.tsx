import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const chevronDownIcon = require('@/assets/icons/icon-chevron-down.svg');
const calendarIcon = require('@/assets/icons/icon-calendar-sm.svg');

const NATIONALITIES = ['대한민국', '중국', '베트남', '몽골', '일본'];
const LANGUAGES = ['한국어', '영어', '중국어', '베트남어'];
const BIRTH_YEARS = ['2001년', '2000년', '1999년', '1998년'];
const STUDENT_TYPES = ['학부 유학생', '대학원 유학생', '교환학생'];

const styles = {
  container: 'flex-1 bg-[#f6f8f8]',
  content: 'flex-1 px-24 pt-24',
  progressSection: 'gap-8',
  progressLabel: 'text-[18px] leading-[24px] text-primary',
  progressBarTrack: 'h-4 overflow-hidden rounded-[2px] bg-[#dee4e0]',
  progressBarFill: 'h-full w-2/3 bg-primary',
  introSection: 'gap-8 pt-23',
  introTitle: 'text-[20px] leading-[30px] text-text-strong',
  introDesc: 'text-[14px] leading-[20px] text-text',
  formSection: 'gap-23 pt-23',
  fieldGroup: 'gap-8',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  selectBox: 'h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-white px-13',
  studentTypeList: 'gap-12',
  radioOuter: 'w-40 items-start pr-16',
  radioInner: 'h-12 w-12 rounded-full bg-primary',
  studentTypeLabel: 'text-[14px] leading-[20px] text-text-strong',
  footer: 'flex-row gap-17 px-21 pb-20 pt-8',
  backButton: 'h-56 flex-1 items-center justify-center rounded-lg bg-border-strong',
  backButtonLabel: 'text-[17px] leading-[22px] text-text',
  nextButton: 'h-56 flex-[1.4] items-center justify-center rounded-lg bg-primary',
  nextButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

const selectValueText = tv({
  base: 'text-[14px] leading-[20px]',
  variants: {
    selected: {
      true: 'text-text-strong',
      false: 'text-text-muted',
    },
  },
});

const studentTypeOption = tv({
  base: 'flex-row items-center rounded-lg border-2 bg-white p-17',
  variants: {
    selected: {
      true: 'border-primary',
      false: 'border-border-strong',
    },
  },
});

const radioCircle = tv({
  base: 'h-24 w-24 items-center justify-center rounded-full border-2 p-2',
  variants: {
    selected: {
      true: 'border-primary',
      false: 'border-border-strong',
    },
  },
});

export default function SignUpBasicInfoScreen() {
  const router = useRouter();
  const [nationalityIndex, setNationalityIndex] = useState<number | null>(null);
  const [languageIndex, setLanguageIndex] = useState<number | null>(null);
  const [birthYearIndex, setBirthYearIndex] = useState<number | null>(null);
  const [studentType, setStudentType] = useState(STUDENT_TYPES[0]);

  return (
    <View className={styles.container}>
      <View className={styles.content}>
        {/* 진행 단계 영역 */}
        <View className={styles.progressSection}>
          <Text weight="bold" className={styles.progressLabel}>
            2 / 3
          </Text>
          <View className={styles.progressBarTrack}>
            <View className={styles.progressBarFill} />
          </View>
        </View>

        {/* 안내 문구 영역 */}
        <View className={styles.introSection}>
          <Text weight="medium" className={styles.introTitle}>
            기본 정보를 알려 주세요.
          </Text>
          <Text weight="medium" className={styles.introDesc}>
            서비스 언어와 필요한 정보를 제공하는 데 사용됩니다.
          </Text>
        </View>

        {/* 입력 폼 영역 */}
        <View className={styles.formSection}>
          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              국적
            </Text>
            <Pressable
              onPress={() => setNationalityIndex(((nationalityIndex ?? -1) + 1) % NATIONALITIES.length)}
              className={styles.selectBox}
            >
              <Text weight="medium" className={selectValueText({ selected: nationalityIndex !== null })}>
                {nationalityIndex === null ? '국적을 선택하세요' : NATIONALITIES[nationalityIndex]}
              </Text>
              <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
            </Pressable>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              사용 언어
            </Text>
            <Pressable
              onPress={() => setLanguageIndex(((languageIndex ?? -1) + 1) % LANGUAGES.length)}
              className={styles.selectBox}
            >
              <Text weight="medium" className={selectValueText({ selected: languageIndex !== null })}>
                {languageIndex === null ? '언어를 선택하세요' : LANGUAGES[languageIndex]}
              </Text>
              <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
            </Pressable>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              학생 유형
            </Text>
            <View className={styles.studentTypeList}>
              {STUDENT_TYPES.map((type) => {
                const selected = studentType === type;
                return (
                  <Pressable
                    key={type}
                    onPress={() => setStudentType(type)}
                    className={studentTypeOption({ selected })}
                  >
                    <View className={styles.radioOuter}>
                      <View className={radioCircle({ selected })}>
                        {selected && <View className={styles.radioInner} />}
                      </View>
                    </View>
                    <Text weight="medium" className={styles.studentTypeLabel}>
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className={styles.fieldGroup}>
            <Text weight="medium" className={styles.fieldLabel}>
              출생연도
            </Text>
            <Pressable
              onPress={() => setBirthYearIndex(((birthYearIndex ?? -1) + 1) % BIRTH_YEARS.length)}
              className={styles.selectBox}
            >
              <Text weight="medium" className={selectValueText({ selected: birthYearIndex !== null })}>
                {birthYearIndex === null ? '출생연도를 선택하세요' : BIRTH_YEARS[birthYearIndex]}
              </Text>
              <Image source={calendarIcon} style={{ width: 16, height: 18 }} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* 이전/다음 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable className={styles.backButton} onPress={() => router.back()}>
          <Text weight="semibold" className={styles.backButtonLabel}>
            이전
          </Text>
        </Pressable>
        <Pressable className={styles.nextButton} onPress={() => router.push('/(auth)/signup-school-info')}>
          <Text weight="semibold" className={styles.nextButtonLabel}>
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
