import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronDownIcon = require('@/assets/icons/icon-chevron-down.svg');
const calendarIcon = require('@/assets/icons/icon-calendar-sm.svg');

const NATIONALITIES = ['대한민국', '중국', '베트남', '몽골', '일본'];
const LANGUAGES = ['한국어', '영어', '중국어', '베트남어'];
const BIRTH_YEARS = ['2001년', '2000년', '1999년', '1998년'];
const STUDENT_TYPES = ['학부 유학생', '대학원 유학생', '교환학생'];

export default function SignUpBasicInfoScreen() {
  const router = useRouter();
  const [nationalityIndex, setNationalityIndex] = useState<number | null>(null);
  const [languageIndex, setLanguageIndex] = useState<number | null>(null);
  const [birthYearIndex, setBirthYearIndex] = useState<number | null>(null);
  const [studentType, setStudentType] = useState(STUDENT_TYPES[0]);

  return (
    <View className="flex-1 bg-[#f6f8f8]">
      <View className="flex-1 px-24 pt-24">
        {/* 진행 단계 영역 */}
        <View className="gap-8">
          <Text weight="bold" className="text-[18px] leading-[24px] text-primary">
            2 / 3
          </Text>
          <View className="h-4 overflow-hidden rounded-[2px] bg-[#dee4e0]">
            <View className="h-full w-2/3 bg-primary" />
          </View>
        </View>

        {/* 안내 문구 영역 */}
        <View className="gap-8 pt-23">
          <Text weight="medium" className="text-[20px] leading-[30px] text-text-strong">
            기본 정보를 알려 주세요.
          </Text>
          <Text weight="medium" className="text-[14px] leading-[20px] text-text">
            서비스 언어와 필요한 정보를 제공하는 데 사용됩니다.
          </Text>
        </View>

        {/* 입력 폼 영역 */}
        <View className="gap-23 pt-23">
          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              국적
            </Text>
            <Pressable
              onPress={() => setNationalityIndex(((nationalityIndex ?? -1) + 1) % NATIONALITIES.length)}
              className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-white px-13"
            >
              <Text weight="medium" className={`text-[14px] leading-[20px] ${nationalityIndex === null ? 'text-text-muted' : 'text-text-strong'}`}>
                {nationalityIndex === null ? '국적을 선택하세요' : NATIONALITIES[nationalityIndex]}
              </Text>
              <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
            </Pressable>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              사용 언어
            </Text>
            <Pressable
              onPress={() => setLanguageIndex(((languageIndex ?? -1) + 1) % LANGUAGES.length)}
              className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-white px-13"
            >
              <Text weight="medium" className={`text-[14px] leading-[20px] ${languageIndex === null ? 'text-text-muted' : 'text-text-strong'}`}>
                {languageIndex === null ? '언어를 선택하세요' : LANGUAGES[languageIndex]}
              </Text>
              <Image source={chevronDownIcon} style={{ width: 12, height: 7.4 }} />
            </Pressable>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              학생 유형
            </Text>
            <View className="gap-12">
              {STUDENT_TYPES.map((type) => {
                const selected = studentType === type;
                return (
                  <Pressable
                    key={type}
                    onPress={() => setStudentType(type)}
                    className={`flex-row items-center rounded-lg border-2 bg-white p-17 ${
                      selected ? 'border-primary' : 'border-border-strong'
                    }`}
                  >
                    <View className="w-40 items-start pr-16">
                      <View
                        className={`h-24 w-24 items-center justify-center rounded-full border-2 p-2 ${
                          selected ? 'border-primary' : 'border-border-strong'
                        }`}
                      >
                        {selected && <View className="h-12 w-12 rounded-full bg-primary" />}
                      </View>
                    </View>
                    <Text weight="medium" className="text-[14px] leading-[20px] text-text-strong">
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              출생연도
            </Text>
            <Pressable
              onPress={() => setBirthYearIndex(((birthYearIndex ?? -1) + 1) % BIRTH_YEARS.length)}
              className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-white px-13"
            >
              <Text weight="medium" className={`text-[14px] leading-[20px] ${birthYearIndex === null ? 'text-text-muted' : 'text-text-strong'}`}>
                {birthYearIndex === null ? '출생연도를 선택하세요' : BIRTH_YEARS[birthYearIndex]}
              </Text>
              <Image source={calendarIcon} style={{ width: 16, height: 18 }} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* 이전/다음 버튼 영역 */}
      <View className="flex-row gap-17 px-21 pb-20 pt-8">
        <Pressable
          className="h-56 flex-1 items-center justify-center rounded-lg bg-border-strong"
          onPress={() => router.back()}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-text">
            이전
          </Text>
        </Pressable>
        <Pressable
          className="h-56 flex-[1.4] items-center justify-center rounded-lg bg-primary"
          onPress={() => router.push('/(auth)/signup-school-info')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
