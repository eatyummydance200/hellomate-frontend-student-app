import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const heroImage = require('@/assets/images/info-hero.jpg');
const calendarIcon = require('@/assets/icons/icon-calendar-sm.svg');
const eyeIcon = require('@/assets/icons/icon-eye.svg');

const FEATURED = {
  tag: 'CITY GUIDE',
  title: '서울에서 꼭 가봐야 할 핫플레이스',
};

const ARTICLES = [
  { id: 'i1', title: '유학생을 위한 건강보험 선택가이드', date: '2024.10.20', views: 1200 },
  { id: 'i2', title: '유학생을 위한 생활비 절약 팁', date: '2024.10.22', views: 800 },
  { id: 'i3', title: '한국에서의 문화 체험 프로그램', date: '2024.10.25', views: 1500 },
  { id: 'i4', title: '유학생을 위한 취업 준비 가이드', date: '2024.10.28', views: 1000 },
  { id: 'i5', title: '한국어 학습을 위한 추천 자료', date: '2024.10.30', views: 600 },
] as const;

export default function InfoHomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Header onPressNotification={() => router.push('/notifications')} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* 히어로 배너 (CITY GUIDE) */}
        <View className="mx-16 mt-16 h-[136px] overflow-hidden rounded-xl">
          <Image source={heroImage} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          <View className="absolute inset-0 justify-end bg-black/40 p-24">
            <Text weight="medium" className="text-[12px] leading-[16px] text-white/80">
              {FEATURED.tag}
            </Text>
            <Text weight="semibold" className="w-[248px] text-[17px] leading-[28px] text-white">
              {FEATURED.title}
            </Text>
          </View>
        </View>

        {/* 배너 캐러셀 인디케이터 (첫 번째 활성 고정) */}
        <View className="flex-row gap-10 px-32 pt-16">
          <View className="h-[3px] flex-1 rounded-full bg-[#575c83]" />
          <View className="h-[3px] flex-1 rounded-full bg-border" />
          <View className="h-[3px] flex-1 rounded-full bg-border" />
          <View className="h-[3px] flex-1 rounded-full bg-border" />
        </View>

        {/* 생활정보 섹션 */}
        <View className="px-20 pt-24">
          <Text weight="semibold" className="text-[20px] leading-[1.5] text-text-strong">
            생활정보
          </Text>
          <Text className="pt-4 text-[12px] leading-[20px] text-[#595c7e]">
            한국 생활에 꼭 필요한 필수 정보를 확인하세요.
          </Text>
        </View>

        <View className="gap-16 px-18 pt-24">
          {ARTICLES.map((article) => (
            <Pressable
              key={article.id}
              className="gap-10 rounded-sm bg-background p-16 shadow-sm"
              onPress={() => router.push({ pathname: '/info/[id]', params: { id: article.id } })}
            >
              <Text weight="medium" className="w-[220px] text-[15px] leading-[20px] text-text-strong">
                {article.title}
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-8">
                  <Image source={calendarIcon} style={{ width: 12, height: 13 }} />
                  <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted">
                    {article.date}
                  </Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <Image source={eyeIcon} style={{ width: 13, height: 9 }} />
                  <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted">
                    {article.views}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}
