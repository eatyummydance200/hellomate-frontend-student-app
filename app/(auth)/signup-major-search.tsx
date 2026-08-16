import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const searchIcon = require('@/assets/icons/icon-search.svg');
const searchEmptyIcon = require('@/assets/icons/icon-search-empty.svg');

const MAJORS = [
  '컴퓨터공학부',
  '소프트웨어학과',
  '정보통신공학전공',
  '지능형로봇학과',
  '데이터사이언스전공',
  '인공지능학과',
  '경영정보시스템전공',
  '시각디자인학과',
  '전자공학부',
  '기계공학과',
];

export default function SignUpMajorSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(MAJORS[0]);

  const results = MAJORS.filter((major) => major.includes(query.trim()));

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          전공 검색
        </Text>
      </View>

      {/* 검색 입력 영역 */}
      <View className="px-22 pt-24">
        <View className="h-38 flex-row items-center gap-8 rounded-md border border-border-strong bg-white px-13">
          <Image source={searchIcon} style={{ width: 16, height: 16 }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="전공을 선택하거나 검색하세요"
            placeholderTextColor="rgba(61,73,68,0.5)"
            className="flex-1 font-sans text-[14px] text-text-strong"
          />
        </View>
      </View>

      {/* 검색 결과 영역 */}
      {results.length > 0 ? (
        <ScrollView className="flex-1 px-20 pt-16">
          <View className="gap-4">
            {results.map((major) => (
              <Pressable
                key={major}
                onPress={() => setSelected(major)}
                className={`rounded-lg p-16 ${selected === major ? 'bg-primary-light/20' : ''}`}
              >
                <Text weight="medium" className="text-[16px] leading-[24px] text-text-strong">
                  {major}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center gap-16 px-20">
          <View className="h-64 w-64 items-center justify-center rounded-full bg-background-muted">
            <Image source={searchEmptyIcon} style={{ width: 25, height: 23.75 }} />
          </View>
          <View className="items-center gap-10">
            <Text weight="medium" className="text-[16px] leading-[24px] text-text">
              검색 결과가 없어요
            </Text>
            <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted">
              찾으시는 전공이 없으신가요?
            </Text>
          </View>
        </View>
      )}

      {/* 선택 완료 버튼 영역 */}
      <View className="px-20 pb-20 pt-8">
        <Pressable
          disabled={!selected}
          className={`h-56 items-center justify-center rounded-lg ${selected ? 'bg-primary' : 'bg-border-strong'}`}
          onPress={() =>
            router.navigate({ pathname: '/(auth)/signup-school-info', params: { major: selected } })
          }
        >
          <Text weight="semibold" className={`text-[17px] leading-[22px] ${selected ? 'text-white' : 'text-text'}`}>
            선택 완료
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
