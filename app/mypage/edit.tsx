import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const chevronDownIcon = require('@/assets/icons/icon-chevron-down.svg');
const calendarIcon = require('@/assets/icons/icon-calendar.svg');
const searchIcon = require('@/assets/icons/icon-search.svg');

const STUDENT_TYPES = [
  { key: 'undergrad', label: '학부 유학생' },
  { key: 'grad', label: '대학원 유학생' },
  { key: 'exchange', label: '교환학생' },
] as const;

const GRADES = ['1학년', '2학년', '3학년', '4학년', '초과 학기', '대학원'] as const;

const PLACEHOLDER_COLOR = 'rgba(61,73,68,0.5)';

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-23 px-20 pb-32 pt-24',
  sectionTitle: 'text-[15px] leading-[24px] text-text',
  fieldGroup: 'gap-8',
  fieldLabel: 'text-[14px] leading-[24px] text-text',
  nameInputBox: 'h-38 justify-center rounded-md border border-border-strong bg-background px-13',
  nameInput: 'font-sans text-[14px] text-text',
  selectBox: 'h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-background px-13',
  selectPlaceholder: 'text-[14px] leading-[20px]',
  studentTypeGroup: 'gap-12',
  studentTypeLabel: 'text-[14px] leading-[20px] text-text-strong',
  radioFilled: 'h-12 w-12 rounded-full bg-primary',
  gradeRow: 'flex-row flex-wrap gap-8',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-56 items-center justify-center rounded-lg bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

const studentTypeOption = tv({
  base: 'flex-row items-center rounded-lg bg-background',
  variants: {
    selected: {
      true: 'border-2 border-primary p-18 shadow-sm',
      false: 'border border-border-strong p-17',
    },
  },
});

const studentTypeRadio = tv({
  base: 'mr-16 h-24 w-24 items-center justify-center rounded-full border-2',
  variants: {
    selected: {
      true: 'border-primary',
      false: 'border-border-strong',
    },
  },
});

const gradeOption = tv({
  base: 'h-31 items-center justify-center rounded-md border-2 px-27',
  variants: {
    selected: {
      true: 'border-primary bg-primary-light/10',
      false: 'border-border-strong bg-background',
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

export default function MyPageEditScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [studentType, setStudentType] = useState<(typeof STUDENT_TYPES)[number]['key']>('undergrad');
  const [grade, setGrade] = useState<(typeof GRADES)[number]>('1학년');

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          내 정보 수정
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text weight="semibold" className={styles.sectionTitle}>
          기본 정보
        </Text>

        {/* 이름 */}
        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            이름
          </Text>
          <View className={styles.nameInputBox}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="이름을 입력하세요"
              placeholderTextColor={PLACEHOLDER_COLOR}
              className={styles.nameInput}
            />
          </View>
        </View>

        {/* 국적 */}
        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            국적
          </Text>
          <Pressable className={styles.selectBox}>
            <Text className={styles.selectPlaceholder} style={{ color: PLACEHOLDER_COLOR }}>
              국적을 선택하세요
            </Text>
            <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
          </Pressable>
        </View>

        {/* 사용 언어 */}
        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            사용 언어
          </Text>
          <Pressable className={styles.selectBox}>
            <Text className={styles.selectPlaceholder} style={{ color: PLACEHOLDER_COLOR }}>
              언어를 선택하세요
            </Text>
            <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
          </Pressable>
        </View>

        {/* 학생 유형 */}
        <View className={styles.studentTypeGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            학생 유형
          </Text>
          {STUDENT_TYPES.map((type) => {
            const selected = studentType === type.key;
            return (
              <Pressable key={type.key} onPress={() => setStudentType(type.key)} className={studentTypeOption({ selected })}>
                <View className={studentTypeRadio({ selected })}>{selected ? <View className={styles.radioFilled} /> : null}</View>
                <Text weight="medium" className={styles.studentTypeLabel}>
                  {type.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 출생연도 */}
        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            출생연도
          </Text>
          <Pressable className={styles.selectBox}>
            <Text className={styles.selectPlaceholder} style={{ color: PLACEHOLDER_COLOR }}>
              출생연도를 선택하세요
            </Text>
            <Image source={calendarIcon} style={{ width: 16, height: 18 }} />
          </Pressable>
        </View>

        {/* 전공 */}
        <View className={styles.fieldGroup}>
          <Text weight="medium" className={styles.fieldLabel}>
            전공
          </Text>
          <Pressable className={styles.selectBox}>
            <Text className={styles.selectPlaceholder} style={{ color: PLACEHOLDER_COLOR }}>
              전공을 선택하거나 검색하세요
            </Text>
            <Image source={searchIcon} style={{ width: 16, height: 16 }} />
          </Pressable>
        </View>

        {/* 학년 */}
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
      </ScrollView>

      {/* 하단 액션 버튼 */}
      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.back()}>
          <Text weight="semibold" className={styles.submitButtonLabel}>
            수정하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
