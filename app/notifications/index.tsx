import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const settingsIcon = require('@/assets/icons/icon-settings-outline.svg');
const groupChatIcon = require('@/assets/icons/icon-group-chat.svg');

const CHAT_FILTERS = ['전체', '1:1 문의', '클럽 채팅'] as const;
const ALARM_FILTERS = ['전체', '공지', '커뮤니티', '클럽', '생활정보'] as const;

type ChatItem = {
  id: string;
  name: string;
  isGroup: boolean;
  senderPrefix?: string;
  message: string;
  time: string;
  unread?: number;
  category: (typeof CHAT_FILTERS)[number];
};

const CHATS: ChatItem[] = [
  {
    id: 'c1',
    name: '김하늘(국제교류처 담당자)',
    isGroup: false,
    message:
      '최신 기술 트렌드를 소개하고, 다양한 스타트업과의 협업 기회를 모색하는 전시회입니다. 참가자들의 많은 관심을 부탁드립니다.',
    time: '5분 전',
    unread: 12,
    category: '1:1 문의',
  },
  {
    id: 'c2',
    name: '이민수(학생처 담당자)',
    isGroup: false,
    message: '학생 안전과 복지를 위한 체계적인 프로그램을 안내합니다. 궁금한 사항은 언제든지 문의해 주세요.',
    time: '10분 전',
    unread: 13,
    category: '1:1 문의',
  },
  {
    id: 'c3',
    name: '박지혜(장학처 담당자)',
    isGroup: false,
    message: '장학금 신청 및 관련 정보 세션을 개최합니다. 많은 참여 부탁드립니다!',
    time: '15분 전',
    category: '1:1 문의',
  },
  {
    id: 'c4',
    name: 'Asian Food Lovers',
    isGroup: true,
    senderPrefix: 'Min-su',
    message: '오늘 명동에서 훠궈 드실 분 계신가요?',
    time: '5분 전',
    unread: 12,
    category: '클럽 채팅',
  },
  {
    id: 'c5',
    name: 'Asian Food Lovers',
    isGroup: true,
    senderPrefix: 'Min-su',
    message: '오늘 명동에서 훠궈 드실 분 계신가요?',
    time: '5분 전',
    category: '클럽 채팅',
  },
];

type AlarmItem = {
  id: string;
  date: '오늘' | '어제';
  category: Exclude<(typeof ALARM_FILTERS)[number], '전체'>;
  categoryBg: string;
  time: string;
  read: boolean;
  title: string;
  description: string;
  cta?: string;
};

const ALARMS: AlarmItem[] = [
  {
    id: 'a1',
    date: '오늘',
    category: '공지',
    categoryBg: 'rgba(164,179,255,0.2)',
    time: '오전 10:30',
    read: false,
    title: '새로운 캠퍼스 가이드가 업데이트 되었습니다.',
    description: '2024년도 2학기 외국인 학생을 위한 비자연장 안내 가이드를 확인하세요.',
  },
  {
    id: 'a2',
    date: '오늘',
    category: '클럽',
    categoryBg: 'rgba(228,228,14,0.2)',
    time: '오전 10:30',
    read: false,
    title: "'서울 맛집 탐방' 클럽 참여 완료!",
    description: '이제 클럽 멤버들과 채팅을 시작할 수 있습니다. 환영 인사를 건네보세요!',
    cta: '채팅방 바로가기',
  },
  {
    id: 'a3',
    date: '어제',
    category: '공지',
    categoryBg: 'rgba(164,179,255,0.2)',
    time: '오전 10:30',
    read: true,
    title: '새로운 캠퍼스 가이드가 업데이트 되었습니다.',
    description: '2024년도 2학기 외국인 학생을 위한 비자연장 안내 가이드를 확인하세요.',
  },
  {
    id: 'a4',
    date: '어제',
    category: '클럽',
    categoryBg: 'rgba(228,228,14,0.2)',
    time: '오전 10:30',
    read: true,
    title: "'서울 맛집 탐방' 클럽 참여 완료!",
    description: '이제 클럽 멤버들과 채팅을 시작할 수 있습니다. 환영 인사를 건네보세요!',
    cta: '채팅방 바로가기',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'채팅' | '알림'>('알림');
  const [chatFilter, setChatFilter] = useState<(typeof CHAT_FILTERS)[number]>('전체');
  const [alarmFilter, setAlarmFilter] = useState<(typeof ALARM_FILTERS)[number]>('전체');

  const visibleChats =
    chatFilter === '전체' ? CHATS : CHATS.filter((chat) => chat.category === chatFilter);
  const visibleAlarms =
    alarmFilter === '전체' ? ALARMS : ALARMS.filter((alarm) => alarm.category === alarmFilter);

  return (
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View className="flex-row items-center justify-between border-b border-border bg-background px-20 py-20">
        <View className="flex-row items-center gap-10">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
          </Pressable>
          <Text weight="semibold" className="text-[20px] leading-[30px] text-[#3d3d3d]">
            알림
          </Text>
        </View>
        <Pressable onPress={() => router.push('/notifications/settings')} hitSlop={8}>
          <Image source={settingsIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      {/* 채팅/알림 탭 전환 영역 */}
      <View className="flex-row bg-background">
        <Pressable
          onPress={() => setActiveTab('채팅')}
          className={
            activeTab === '채팅'
              ? 'flex-1 items-center border-b border-primary-dark py-10'
              : 'flex-1 items-center border-b border-[#c6c6cd] py-10'
          }
        >
          <Text
            weight="semibold"
            className={
              activeTab === '채팅' ? 'text-[16px] leading-6 text-primary-dark' : 'text-[16px] leading-6 text-[#8e8e93]'
            }
          >
            채팅
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('알림')}
          className={
            activeTab === '알림'
              ? 'flex-1 items-center border-b border-primary-dark py-10'
              : 'flex-1 items-center border-b border-[#c6c6cd] py-10'
          }
        >
          <Text
            weight="semibold"
            className={
              activeTab === '알림' ? 'text-[16px] leading-6 text-primary-dark' : 'text-[16px] leading-6 text-[#8e8e93]'
            }
          >
            알림
          </Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-20 px-20 pb-32 pt-16"
        showsVerticalScrollIndicator={false}
      >
        {/* 필터 태그 영역 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-8">
            {(activeTab === '채팅' ? CHAT_FILTERS : ALARM_FILTERS).map((filter) => {
              const isActive =
                activeTab === '채팅' ? filter === chatFilter : filter === alarmFilter;
              return (
                <Pressable
                  key={filter}
                  onPress={() =>
                    activeTab === '채팅'
                      ? setChatFilter(filter as (typeof CHAT_FILTERS)[number])
                      : setAlarmFilter(filter as (typeof ALARM_FILTERS)[number])
                  }
                  className={
                    isActive
                      ? 'rounded-full bg-primary px-16 py-4'
                      : 'rounded-full border border-border bg-background px-16 py-4'
                  }
                >
                  <Text size="label" weight="medium" className={isActive ? 'text-text-inverse' : 'text-[#6f6f6f]'}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* 채팅 목록 영역 */}
        {activeTab === '채팅' ? (
          <View>
            {visibleChats.map((chat) => (
              <View key={chat.id} className="flex-row items-start justify-between border-b border-border py-16">
                <View className="flex-1 gap-5 pr-12">
                  <View className="flex-row items-center gap-6">
                    <Text weight="semibold" className="text-[16px] leading-6 text-[#3d3d3d]">
                      {chat.name}
                    </Text>
                    {chat.isGroup ? <Image source={groupChatIcon} style={{ width: 19, height: 9 }} /> : null}
                  </View>
                  <Text numberOfLines={2} className="text-[12px] leading-5 text-[#1c1e1e]">
                    {chat.senderPrefix ? (
                      <>
                        <Text weight="semibold" className="text-[14px] leading-5 text-primary">
                          {chat.senderPrefix}:{' '}
                        </Text>
                        <Text className="text-[14px] leading-5 text-text">{chat.message}</Text>
                      </>
                    ) : (
                      chat.message
                    )}
                  </Text>
                </View>
                <View className="items-end gap-8">
                  {chat.unread ? (
                    <View className="h-20 items-center justify-center rounded-full bg-primary px-6">
                      <Text className="text-[12px] leading-[18px] text-text-inverse">{chat.unread}</Text>
                    </View>
                  ) : null}
                  <Text className="text-[12px] leading-[18px] text-[#8b8b8b]">{chat.time}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* 알림 목록 영역 */
          <View className="gap-20">
            {(['오늘', '어제'] as const).map((date) => {
              const items = visibleAlarms.filter((alarm) => alarm.date === date);
              if (items.length === 0) return null;
              return (
                <View key={date} className="gap-12">
                  <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
                    {date}
                  </Text>
                  <View className="gap-12">
                    {items.map((item) => (
                      <View
                        key={item.id}
                        className={
                          item.read
                            ? 'gap-5 rounded-sm bg-background p-16 opacity-50 shadow-sm'
                            : 'gap-5 rounded-sm bg-background p-16 shadow-sm'
                        }
                      >
                        <View className="flex-row items-center justify-between">
                          <View
                            className="h-24 items-center justify-center rounded-lg px-8"
                            style={{ backgroundColor: item.categoryBg }}
                          >
                            <Text className="text-[10px] leading-6 text-[#1c1e1e]">{item.category}</Text>
                          </View>
                          <View className="flex-row items-center gap-4">
                            <Text weight="medium" className="text-[12px] leading-4 text-text-muted">
                              {item.time}
                            </Text>
                            {!item.read ? <View className="h-8 w-8 rounded-full bg-primary-light" /> : null}
                          </View>
                        </View>
                        <Text weight="medium" className="text-[15px] leading-5 text-text-strong">
                          {item.title}
                        </Text>
                        <Text weight="medium" numberOfLines={2} className="text-[14px] leading-5 text-text">
                          {item.description}
                        </Text>
                        {item.cta ? (
                          <Pressable className="mt-4 h-32 items-center justify-center self-start rounded-md bg-primary px-16">
                            <Text weight="semibold" className="text-[12px] leading-6 text-text-inverse">
                              {item.cta}
                            </Text>
                          </Pressable>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
