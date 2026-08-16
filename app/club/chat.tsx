import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const closeIcon = require('@/assets/icons/icon-close.svg');
const infoCircleIcon = require('@/assets/icons/icon-info-circle.svg');
const chevronDownIcon = require('@/assets/icons/icon-chevron-down.svg');
const sendIcon = require('@/assets/icons/icon-send.svg');

const CLUB_NOTICE = [
  '아시아 음식 러버들에 오신 것을 환영합니다! 🍜',
  '저희는 아시아 전역의 정통 맛을 사랑하는 유학생 모임입니다.',
  '고향의 맛이 그립거나 새로운 요리에 도전하고 싶으신 분들을 위해, 저희는 매주 맛집 탐방, 요리 교실, 그리고 최고의 식재료를 찾기 위한 마켓 투어를 진행합니다.',
  '매주 금요일 저녁 7시 저녁 모임',
  '정통 레시피 공유 및 요리 교실',
  '신입생들을 위한 지원 커뮤니티',
];

const SYSTEM_MESSAGES = ['알렉스님이 들어왔습니다', '김민지님이 들어왔습니다'];

type Message = {
  id: string;
  from: 'me' | 'sara' | 'alex';
  author?: string;
  time: string;
  unread: string;
  text: string;
};

const MESSAGES: Message[] = [
  {
    id: '1',
    from: 'sara',
    author: '사라',
    time: '오후 7:14',
    unread: '14',
    text: '5번가에 새로 생긴 라멘집 가보신 분 있나요? 돈코츠 라멘이 정말 맛있다고 들었어요! 🍜',
  },
  {
    id: '2',
    from: 'alex',
    author: '알렉스',
    time: '오후 7:14',
    unread: '14',
    text: '저 어제 갔다 왔어요! 국물이 정말 진하더라고요. 다음 모임은 꼭 거기서 해요.',
  },
  {
    id: '3',
    from: 'me',
    time: '오후 7:14',
    unread: '14',
    text: '좋은 생각이네요! 저 이번 주 금요일 저녁에 시간 되는데 같이 가실 분 있나요? 👋',
  },
];

export default function ClubChatScreen() {
  const router = useRouter();
  const [noticeExpanded, setNoticeExpanded] = useState(false);

  return (
    <View className="flex-1 bg-background-subtle">
      {/* 헤더 영역 */}
      <View className="flex-row items-center justify-between border-b border-border bg-background px-13 py-12">
        <View>
          <Text weight="medium" className="text-[15px] leading-[19px] text-text-strong">
            아시아 음식 러버들
          </Text>
          <Text className="pt-7 text-[11px] leading-[16px] text-text-muted">멤버 24명</Text>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      {/* 클럽 소개 배너 (펼치기/접기) */}
      <Pressable
        className="mx-19 mt-16 gap-12 rounded-lg border border-border bg-primary-light/20 p-16"
        onPress={() => setNoticeExpanded((v) => !v)}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-11">
            <Image source={infoCircleIcon} style={{ width: 24, height: 24 }} />
            <Text weight="semibold" className="text-[16px] leading-[24px] text-[#3d3d3d]">
              클럽 소개
            </Text>
          </View>
          <Image
            source={chevronDownIcon}
            style={{
              width: 12,
              height: 6,
              transform: [{ rotate: noticeExpanded ? '180deg' : '0deg' }],
            }}
          />
        </View>
        {noticeExpanded ? (
          <View className="gap-4">
            {CLUB_NOTICE.map((line) => (
              <Text key={line} className="text-[12px] leading-[18px] text-text">
                {line}
              </Text>
            ))}
          </View>
        ) : null}
      </Pressable>

      <ScrollView className="flex-1" contentContainerClassName="gap-13 px-[5px] pt-18 pb-16">
        <View className="items-center gap-13">
          {SYSTEM_MESSAGES.map((message) => (
            <View key={message} className="rounded-full bg-background-muted px-12 py-4">
              <Text className="text-[12px] leading-[18px] text-text-muted">{message}</Text>
            </View>
          ))}
        </View>

        <View className="gap-6">
          {MESSAGES.map((message) =>
            message.from === 'me' ? (
              <View key={message.id} className="flex-row items-end justify-end gap-4">
                <View className="items-end">
                  <Text className="text-[11px] leading-[16px] text-primary">{message.unread}</Text>
                  <Text className="text-[11px] leading-[16px] text-[#3d3d3d]">{message.time}</Text>
                </View>
                <View className="max-w-[256px] rounded-lg bg-primary px-12 py-8">
                  <Text color="inverse" className="text-[14px] leading-[21px]">
                    {message.text}
                  </Text>
                </View>
              </View>
            ) : (
              <View key={message.id} className="gap-4">
                <Text className="pl-4 text-[12px] leading-[18px] text-text">{message.author}</Text>
                <View className="flex-row items-end gap-4">
                  <View className="max-w-[256px] rounded-lg bg-background px-12 py-8">
                    <Text color="strong" className="text-[14px] leading-[21px]">
                      {message.text}
                    </Text>
                  </View>
                  <View className="items-start">
                    <Text className="text-[11px] leading-[16px] text-primary">{message.unread}</Text>
                    <Text className="text-[11px] leading-[16px] text-[#3d3d3d]">{message.time}</Text>
                  </View>
                </View>
              </View>
            ),
          )}
        </View>
      </ScrollView>

      {/* 하단 메시지 입력 바 */}
      <View className="px-16 pb-20 pt-8">
        <View className="h-[52px] w-full flex-row items-center justify-between rounded-full bg-background pl-16 pr-8 shadow-sm">
          <Text size="body" className="text-[#8b8b8b]">
            메시지 보내기
          </Text>
          <View className="h-[36px] w-[36px] items-center justify-center rounded-full bg-primary">
            <Image source={sendIcon} style={{ width: 16, height: 9 }} />
          </View>
        </View>
      </View>
    </View>
  );
}
