import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';
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

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  searchSection: 'px-22 pt-24',
  searchBox: 'h-38 flex-row items-center gap-8 rounded-md border border-border-strong bg-white px-13',
  searchInput: 'flex-1 font-sans text-[14px] text-text-strong',
  resultsScroll: 'flex-1 px-20 pt-16',
  resultsList: 'gap-4',
  resultLabel: 'text-[16px] leading-[24px] text-text-strong',
  emptyState: 'flex-1 items-center justify-center gap-16 px-20',
  emptyIconWrap: 'h-64 w-64 items-center justify-center rounded-full bg-background-muted',
  emptyTextGroup: 'items-center gap-10',
  emptyTitle: 'text-[16px] leading-[24px] text-text',
  emptyDesc: 'text-[12px] leading-[16px] text-text-muted',
  footer: 'px-20 pb-20 pt-8',
} as const;

const resultItem = tv({
  base: 'rounded-lg p-16',
  variants: {
    selected: {
      true: 'bg-primary-light/20',
      false: '',
    },
  },
});

const submitButton = tv({
  base: 'h-56 items-center justify-center rounded-lg',
  variants: {
    hasSelection: {
      true: 'bg-primary',
      false: 'bg-border-strong',
    },
  },
});

const submitButtonLabel = tv({
  base: 'text-[17px] leading-[22px]',
  variants: {
    hasSelection: {
      true: 'text-white',
      false: 'text-text',
    },
  },
});

export default function SignUpMajorSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(MAJORS[0]);

  const results = MAJORS.filter((major) => major.includes(query.trim()));

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          전공 검색
        </Text>
      </View>

      {/* 검색 입력 영역 */}
      <View className={styles.searchSection}>
        <View className={styles.searchBox}>
          <Image source={searchIcon} style={{ width: 16, height: 16 }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="전공을 선택하거나 검색하세요"
            placeholderTextColor="rgba(61,73,68,0.5)"
            className={styles.searchInput}
          />
        </View>
      </View>

      {/* 검색 결과 영역 */}
      {results.length > 0 ? (
        <ScrollView className={styles.resultsScroll}>
          <View className={styles.resultsList}>
            {results.map((major) => (
              <Pressable key={major} onPress={() => setSelected(major)} className={resultItem({ selected: selected === major })}>
                <Text weight="medium" className={styles.resultLabel}>
                  {major}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className={styles.emptyState}>
          <View className={styles.emptyIconWrap}>
            <Image source={searchEmptyIcon} style={{ width: 25, height: 23.75 }} />
          </View>
          <View className={styles.emptyTextGroup}>
            <Text weight="medium" className={styles.emptyTitle}>
              검색 결과가 없어요
            </Text>
            <Text weight="medium" className={styles.emptyDesc}>
              찾으시는 전공이 없으신가요?
            </Text>
          </View>
        </View>
      )}

      {/* 선택 완료 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable
          disabled={!selected}
          className={submitButton({ hasSelection: Boolean(selected) })}
          onPress={() => router.navigate({ pathname: '/(auth)/signup-school-info', params: { major: selected } })}
        >
          <Text weight="semibold" className={submitButtonLabel({ hasSelection: Boolean(selected) })}>
            선택 완료
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
