import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const minusIcon = require('@/assets/icons/icon-minus.svg');
const plusIcon = require('@/assets/icons/icon-plus.svg');
const calendarIcon = require('@/assets/icons/icon-calendar.svg');

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-24 px-20 pb-32 pt-16',
  fieldGroup: 'gap-8',
  nameInputBox: 'h-[56px] justify-center rounded-md border border-border-strong bg-background px-16',
  nameInput: 'font-sans text-label text-text',
  maxMembersBox: 'h-[56px] flex-row items-center justify-between rounded-md border border-border-strong bg-background px-16',
  maxMembersLabel: 'text-[14px] leading-[20px] text-text',
  stepperRow: 'flex-row items-center gap-16',
  stepperButton: 'h-32 w-32 items-center justify-center rounded-full border border-border-strong',
  stepperIncrementButton: 'h-32 w-32 items-center justify-center rounded-full bg-primary',
  stepperValue: 'w-24 text-center text-[17px] leading-[22px] text-text-strong',
  deadlineBox: 'h-[56px] flex-row items-center gap-13 rounded-md border border-border-strong bg-background px-16',
  deadlineText: 'text-[14px] leading-[20px] text-text-strong',
  introInput: 'h-[114px] rounded-md border border-border-strong bg-background p-16 font-sans text-label text-text',
  footer: 'px-20 pb-20 pt-8',
  submitButton: 'h-[52px] w-full items-center justify-center rounded-md bg-primary',
  submitButtonLabel: 'text-[17px] leading-[22px]',
} as const;

export default function ClubCreateScreen() {
  const router = useRouter();
  const [maxMembers, setMaxMembers] = useState(5);

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          클럽 만들기
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 클럽 이름 */}
        <View className={styles.fieldGroup}>
          <Text size="title" weight="medium" color="strong">
            클럽 이름 <Text color="danger">*</Text>
          </Text>
          <View className={styles.nameInputBox}>
            <TextInput
              placeholder="멋진 이름을 입력하세요..."
              placeholderTextColor="rgba(109,122,116,0.6)"
              className={styles.nameInput}
            />
          </View>
        </View>

        {/* 최대 인원 */}
        <View className={styles.fieldGroup}>
          <Text size="title" weight="medium" color="strong">
            최대 인원 <Text color="danger">*</Text>
          </Text>
          <View className={styles.maxMembersBox}>
            <Text className={styles.maxMembersLabel}>모임 정원 설정</Text>
            <View className={styles.stepperRow}>
              <Pressable
                className={styles.stepperButton}
                onPress={() => setMaxMembers((count) => Math.max(1, count - 1))}
                hitSlop={4}
              >
                <Image source={minusIcon} style={{ width: 8, height: 1 }} />
              </Pressable>
              <Text weight="bold" className={styles.stepperValue}>
                {maxMembers}
              </Text>
              <Pressable
                className={styles.stepperIncrementButton}
                onPress={() => setMaxMembers((count) => Math.min(99, count + 1))}
                hitSlop={4}
              >
                <Image source={plusIcon} style={{ width: 8, height: 8 }} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* 모집 마감일 */}
        <View className={styles.fieldGroup}>
          <Text size="title" weight="medium" color="strong">
            모집 마감일 <Text color="danger">*</Text>
          </Text>
          <View className={styles.deadlineBox}>
            <Image source={calendarIcon} style={{ width: 18, height: 20 }} />
            <Text className={styles.deadlineText}>mm/dd/yyyy</Text>
          </View>
        </View>

        {/* 클럽 소개 */}
        <View className={styles.fieldGroup}>
          <Text size="title" weight="medium" color="strong">
            클럽 소개 <Text color="danger">*</Text>
          </Text>
          <TextInput
            placeholder="어떤 활동을 어디서 하나요? 당신의 멋진 계획을 사람들에게 알려주세요..."
            placeholderTextColor="rgba(109,122,116,0.6)"
            multiline
            textAlignVertical="top"
            className={styles.introInput}
          />
        </View>
      </ScrollView>

      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.push('/(tabs)/club')}>
          <Text weight="semibold" color="inverse" className={styles.submitButtonLabel}>
            클럽 개설하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
