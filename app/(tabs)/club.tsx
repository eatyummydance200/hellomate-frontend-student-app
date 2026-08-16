import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const heroIcon = require('@/assets/icons/icon-club-hero.svg');
const searchIcon = require('@/assets/icons/icon-search.svg');
const sortChevronIcon = require('@/assets/icons/icon-sort-chevron.svg');
const calendarIcon = require('@/assets/icons/icon-calendar.svg');
const chatBubbleIcon = require('@/assets/icons/icon-chat-bubble.svg');
const compassIcon = require('@/assets/icons/icon-compass.svg');

const ALL_CLUBS = [
  {
    id: 'c1',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'available' as const,
    current: 22,
    total: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
  {
    id: 'c2',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'joined' as const,
    current: 22,
    total: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
  {
    id: 'c3',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'closed' as const,
    current: 25,
    total: 25,
    deadline: '모집 종료',
  },
  {
    id: 'c4',
    title: '저녁 축구 경기',
    desc: '서울의 숨은 명소를 함께 찾아봐요...',
    status: 'joined' as const,
    current: 22,
    total: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
] as const;

const MY_CLUBS = ALL_CLUBS.filter((club) => club.status === 'joined');

const STATUS_BADGE = {
  available: { label: '참여 가능', className: 'bg-primary', textClassName: 'text-text-inverse' },
  joined: { label: '참여 중', className: 'bg-primary/10', textClassName: 'text-primary' },
  closed: { label: '마감', className: 'bg-[#d5dbd7]', textClassName: 'text-text' },
} as const;

export default function ClubHomeScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'all' | 'mine'>('all');

  return (
    <View className="flex-1 bg-background">
      <Header onPressNotification={() => router.push('/notifications')} />

      {/* 전체 클럽 / 내 클럽 탭 */}
      <View className="flex-row bg-background">
        <Pressable
          className={`h-40 flex-1 items-center justify-center border-b ${tab === 'all' ? 'border-primary-dark' : 'border-[#c6c6cd]'}`}
          onPress={() => setTab('all')}
        >
          <Text weight="semibold" className={tab === 'all' ? 'text-primary-dark' : 'text-[#8e8e93]'}>
            전체 클럽
          </Text>
        </Pressable>
        <Pressable
          className={`h-40 flex-1 items-center justify-center border-b ${tab === 'mine' ? 'border-primary-dark' : 'border-[#c6c6cd]'}`}
          onPress={() => setTab('mine')}
        >
          <Text weight="semibold" className={tab === 'mine' ? 'text-primary-dark' : 'text-[#8e8e93]'}>
            내 클럽
          </Text>
        </Pressable>
      </View>

      {tab === 'all' ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-18 px-16 pb-32 pt-16"
          showsVerticalScrollIndicator={false}
        >
          {/* 클럽 만들기 유도 히어로 배너 */}
          <Pressable
            className="h-96 overflow-hidden rounded-xl bg-primary-light/20"
            onPress={() => router.push('/club/create')}
          >
            <View className="absolute right-[-28px] top-[-32px] h-[128px] w-[128px] rounded-full bg-primary/15" />
            <View className="gap-[3px] p-16">
              <Text weight="medium" className="text-[17px] leading-[25px] text-primary-dark">
                나만의 클럽을{'\n'}만들어보세요
              </Text>
              <Text className="text-[10px] leading-[16px] text-[rgba(0,80,63,0.7)]">
                취향이 맞는 메이트들과 만날 수 있어요.
              </Text>
            </View>
            <Image source={heroIcon} style={{ width: 64, height: 38, position: 'absolute', right: 26, bottom: 10 }} />
          </Pressable>

          <Text size="display" weight="semibold" className="text-[#3d3d3d]">
            클럽 둘러보기
          </Text>

          <View className="h-40 flex-row items-center justify-between rounded-sm border border-border bg-background px-12 py-8">
            <TextInput
              placeholder="클럽명으로 검색하세요."
              placeholderTextColor="#8b8b8b"
              className="flex-1 font-sans text-label text-text"
            />
            <Image source={searchIcon} style={{ width: 20, height: 20 }} />
          </View>

          <Pressable className="flex-row items-center gap-4 self-start">
            <Text weight="semibold" className="text-[13px] leading-[24px] text-text">
              최신순
            </Text>
            <Image source={sortChevronIcon} style={{ width: 9, height: 4 }} />
          </Pressable>

          <View className="gap-16">
            {ALL_CLUBS.map((club) => {
              const badge = STATUS_BADGE[club.status];
              const isClosed = club.status === 'closed';
              return (
                <Pressable
                  key={club.id}
                  className="w-full gap-16 rounded-xl border border-border-strong/30 bg-background p-18 shadow-sm"
                  style={isClosed ? { opacity: 0.5 } : undefined}
                  onPress={() => router.push({ pathname: '/club/[id]', params: { id: club.id } })}
                >
                  <View className="flex-row items-start justify-between gap-8">
                    <View className="flex-1 gap-4">
                      <Text weight="semibold" className="text-[17px] leading-[20px] text-text-strong">
                        {club.title}
                      </Text>
                      <Text className="text-[13px] leading-[20px] text-text">{club.desc}</Text>
                    </View>
                    <View className={`items-center justify-center rounded-sm px-12 py-4 ${badge.className}`}>
                      <Text weight="medium" className={`text-[14px] leading-[24px] ${badge.textClassName}`}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>
                  <View className="gap-8">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-[14px] leading-[24px] text-text">참여 인원</Text>
                      <Text weight="semibold" className="text-[14px] leading-[24px] text-text-strong">
                        {club.current}/{club.total}
                      </Text>
                    </View>
                    <View className="h-6 overflow-hidden rounded-full bg-[#e3eae5]">
                      <View
                        className={`h-full rounded-full ${isClosed ? 'bg-border' : 'bg-primary'}`}
                        style={{ width: `${Math.round((club.current / club.total) * 100)}%` }}
                      />
                    </View>
                    <View className="flex-row items-center gap-7 pt-4">
                      <Image source={calendarIcon} style={{ width: 11, height: 12 }} />
                      <Text className="text-[13px] leading-[24px] text-text">{club.deadline}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-13 px-16 pb-32 pt-24"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center gap-8">
            <Text weight="semibold" className="text-[20px] leading-[24px] text-text-strong">
              가입한 클럽
            </Text>
            <View className="rounded-full bg-primary-light/20 px-8 py-[2px]">
              <Text weight="semibold" className="text-[15px] leading-[16px] text-primary">
                {MY_CLUBS.length}
              </Text>
            </View>
          </View>

          <View className="gap-13">
            {MY_CLUBS.map((club) => (
              <Pressable
                key={club.id}
                className="w-full gap-16 rounded-xl border border-border-strong/30 bg-background p-18 shadow-sm"
                onPress={() => router.push({ pathname: '/club/[id]', params: { id: club.id } })}
              >
                <View className="gap-4">
                  <Text weight="semibold" className="text-[17px] leading-[20px] text-text-strong">
                    {club.title}
                  </Text>
                  <Text className="text-[13px] leading-[20px] text-text">{club.desc}</Text>
                </View>
                <View className="gap-8">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[14px] leading-[24px] text-text">참여 인원</Text>
                    <Text weight="semibold" className="text-[14px] leading-[24px] text-text-strong">
                      {club.current}/{club.total}
                    </Text>
                  </View>
                  <View className="h-6 overflow-hidden rounded-full bg-[#e3eae5]">
                    <View
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.round((club.current / club.total) * 100)}%` }}
                    />
                  </View>
                  <View className="flex-row items-center gap-7 pt-4">
                    <Image source={calendarIcon} style={{ width: 11, height: 12 }} />
                    <Text className="text-[13px] leading-[24px] text-text">{club.deadline}</Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-between gap-8 border-t border-border-strong/20 pt-16">
                  <Pressable
                    className="h-32 flex-row items-center gap-12 rounded-md bg-primary px-16"
                    onPress={() => router.push('/club/chat')}
                  >
                    <Image source={chatBubbleIcon} style={{ width: 15, height: 15 }} />
                    <Text weight="semibold" className="text-[13px] leading-[16px] text-text-inverse">
                      채팅
                    </Text>
                  </Pressable>
                  <Pressable className="h-32 items-center justify-center rounded-md border border-[#6f6f6f] px-14">
                    <Text weight="semibold" className="text-[13px] leading-[16px] text-[#6f6f6f]">
                      나가기
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            className="items-center gap-8 rounded-xl border-2 border-dashed border-primary/30 bg-primary-light/10 px-26 pb-26 pt-34"
            onPress={() => setTab('all')}
          >
            <Image source={compassIcon} style={{ width: 33, height: 33 }} />
            <Text weight="medium" className="text-[17px] leading-[22px] text-text-strong">
              더 많은 클럽을 찾고 싶나요?
            </Text>
            <Text weight="medium" className="text-[14px] leading-[20px] text-text">
              다른 클럽들을 확인해보세요.
            </Text>
            <View className="rounded-full border border-primary bg-[#f5fbf6] px-33 py-11">
              <Text weight="medium" className="text-[13px] leading-[16px] text-primary">
                클럽 둘러보기
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      )}

      <BottomNav />
    </View>
  );
}
