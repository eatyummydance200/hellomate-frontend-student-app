import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Avatar } from '@/src/components/Avatar';
import { Text } from '@/src/components/Text';

const closeIcon = require('@/assets/icons/icon-close.svg');
const chevronRightSmIcon = require('@/assets/icons/icon-chevron-right-sm.svg');
const sendIcon = require('@/assets/icons/icon-send.svg');

type Message = {
  id: string;
  from: 'staff' | 'me';
  author?: string;
  time: string;
  unread?: number;
  text: string;
};

const MESSAGES: Message[] = [
  {
    id: '1',
    from: 'staff',
    author: '김하늘 (국제교류처)',
    time: '오후 7:14',
    text: '안녕하세요! 국제교류처 김하늘입니다.\n\n건강보험 신청 안내 공지사항에 대해 궁금하신 점이 있으신가요? 무엇이든 물어보세요.',
  },
  {
    id: '2',
    from: 'me',
    time: '오후 7:14',
    text: '안녕하세요. 외국인 유학생 전용 보험 가입 기간이 언제까지인지 궁금해서 연락드렸습니다.',
  },
  {
    id: '3',
    from: 'staff',
    author: '김하늘 (국제교류처)',
    time: '오후 7:14',
    unread: 1,
    text: '유학생 전용 보험은 이번 주 금요일(27일) 오후 5시까지 신청이 가능합니다. 포털 사이트에서 서류를 업로드해 주셔야 최종 접수됩니다!',
  },
];

export default function NoticeContactScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background-subtle">
      <View className="flex-row items-center justify-between border-b border-border bg-background px-[17px] py-[13px]">
        <View className="flex-row items-center gap-12">
          <Avatar size="sm" />
          <View>
            <Text weight="semibold" color="strong" className="text-[18px] leading-[20px]">
              김하늘
            </Text>
            <Text className="pt-4 text-[13px] leading-[16px]" color="default">
              국제교류처
            </Text>
          </View>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      <Pressable className="flex-row items-center justify-between border-b border-primary/10 bg-primary-light/20 px-20 py-12">
        <Text weight="medium" color="primary" className="text-[15px] leading-[24px]">
          문의 중인 공지: 건강보험 신청 안내
        </Text>
        <Image source={chevronRightSmIcon} style={{ width: 5, height: 8 }} />
      </Pressable>

      <ScrollView className="flex-1" contentContainerClassName="gap-16 px-16 pt-16 pb-16">
        <View className="items-center">
          <View className="rounded-full bg-background-muted px-12 py-4">
            <Text className="text-[10px] leading-[15px]" color="default">
              2023년 10월 24일 화요일
            </Text>
          </View>
        </View>

        {MESSAGES.map((message) =>
          message.from === 'me' ? (
            <View key={message.id} className="flex-row items-end justify-end gap-4">
              <Text className="text-[11px] leading-[16px] text-[#3d3d3d]">{message.time}</Text>
              <View className="max-w-[256px] rounded-lg bg-primary px-12 py-8">
                <Text color="inverse" size="label" className="leading-[21px]">
                  {message.text}
                </Text>
              </View>
            </View>
          ) : (
            <View key={message.id} className="gap-4">
              <Text size="caption" color="default" className="pl-4">
                {message.author}
              </Text>
              <View className="flex-row items-end gap-4">
                <View className="max-w-[234px] rounded-lg bg-background px-12 py-8">
                  <Text color="strong" size="label" className="leading-[21px]">
                    {message.text}
                  </Text>
                </View>
                <View className="items-start">
                  {message.unread ? (
                    <Text className="text-[11px] leading-[16px] text-primary">{message.unread}</Text>
                  ) : null}
                  <Text className="text-[11px] leading-[16px] text-[#3d3d3d]">{message.time}</Text>
                </View>
              </View>
            </View>
          ),
        )}
      </ScrollView>

      <View className="px-20 pb-20 pt-8">
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
