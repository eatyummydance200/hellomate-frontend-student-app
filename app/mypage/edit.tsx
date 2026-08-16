import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
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

export default function MyPageEditScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [studentType, setStudentType] = useState<(typeof STUDENT_TYPES)[number]['key']>('undergrad');
  const [grade, setGrade] = useState<(typeof GRADES)[number]>('1학년');

  return (
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          내 정보 수정
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-23 px-20 pb-32 pt-24"
        showsVerticalScrollIndicator={false}
      >
        <Text weight="semibold" className="text-[15px] leading-[24px] text-text">
          기본 정보
        </Text>

        {/* 이름 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            이름
          </Text>
          <View className="h-38 justify-center rounded-md border border-border-strong bg-background px-13">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="이름을 입력하세요"
              placeholderTextColor={PLACEHOLDER_COLOR}
              className="font-sans text-[14px] text-text"
            />
          </View>
        </View>

        {/* 국적 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            국적
          </Text>
          <Pressable className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-background px-13">
            <Text className="text-[14px] leading-[20px]" style={{ color: PLACEHOLDER_COLOR }}>
              국적을 선택하세요
            </Text>
            <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
          </Pressable>
        </View>

        {/* 사용 언어 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            사용 언어
          </Text>
          <Pressable className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-background px-13">
            <Text className="text-[14px] leading-[20px]" style={{ color: PLACEHOLDER_COLOR }}>
              언어를 선택하세요
            </Text>
            <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
          </Pressable>
        </View>

        {/* 학생 유형 */}
        <View className="gap-12">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            학생 유형
          </Text>
          {STUDENT_TYPES.map((type) => {
            const selected = studentType === type.key;
            return (
              <Pressable
                key={type.key}
                onPress={() => setStudentType(type.key)}
                className={
                  selected
                    ? 'flex-row items-center rounded-lg border-2 border-primary bg-background p-18 shadow-sm'
                    : 'flex-row items-center rounded-lg border border-border-strong bg-background p-17'
                }
              >
                <View
                  className={
                    selected
                      ? 'mr-16 h-24 w-24 items-center justify-center rounded-full border-2 border-primary'
                      : 'mr-16 h-24 w-24 items-center justify-center rounded-full border-2 border-border-strong'
                  }
                >
                  {selected ? <View className="h-12 w-12 rounded-full bg-primary" /> : null}
                </View>
                <Text weight="medium" className="text-[14px] leading-[20px] text-text-strong">
                  {type.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 출생연도 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            출생연도
          </Text>
          <Pressable className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-background px-13">
            <Text className="text-[14px] leading-[20px]" style={{ color: PLACEHOLDER_COLOR }}>
              출생연도를 선택하세요
            </Text>
            <Image source={calendarIcon} style={{ width: 16, height: 18 }} />
          </Pressable>
        </View>

        {/* 전공 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            전공
          </Text>
          <Pressable className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-background px-13">
            <Text className="text-[14px] leading-[20px]" style={{ color: PLACEHOLDER_COLOR }}>
              전공을 선택하거나 검색하세요
            </Text>
            <Image source={searchIcon} style={{ width: 16, height: 16 }} />
          </Pressable>
        </View>

        {/* 학년 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[14px] leading-[24px] text-text">
            학년
          </Text>
          <View className="flex-row flex-wrap gap-8">
            {GRADES.map((g) => {
              const selected = grade === g;
              return (
                <Pressable
                  key={g}
                  onPress={() => setGrade(g)}
                  className={
                    selected
                      ? 'h-31 items-center justify-center rounded-md border-2 border-primary bg-primary-light/10 px-27'
                      : 'h-31 items-center justify-center rounded-md border-2 border-border-strong bg-background px-27'
                  }
                >
                  <Text
                    weight="medium"
                    className={selected ? 'text-[14px] leading-[16px] text-primary' : 'text-[14px] leading-[16px] text-text'}
                  >
                    {g}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* 하단 액션 버튼 */}
      <View className="px-20 pb-20 pt-8">
        <Pressable
          className="h-56 items-center justify-center rounded-lg bg-primary"
          onPress={() => router.back()}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            수정하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
