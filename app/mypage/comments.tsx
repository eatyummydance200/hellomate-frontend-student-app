import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');

type Comment = {
  id: string;
  time: string;
  text: string;
  quote: string;
  isNew?: boolean;
};

type CommentGroup = {
  date: string;
  comments: Comment[];
};

const COMMENT_GROUPS: CommentGroup[] = [
  {
    date: '오늘',
    comments: [
      {
        id: 'c1',
        time: '2시간 전',
        text: '저도 비슷한 경험이 있는데, 학과 사무실에 직접 방문해서 문의하시는 게 가장 빨라요! 보통 친절하게 알려 주시더라고요.',
        quote: '원문: 학생 비자 연장 서류 준비할 때 주의할 점이 있을까요?',
        isNew: true,
      },
    ],
  },
  {
    date: '어제',
    comments: [
      {
        id: 'c2',
        time: '1시간 전',
        text: '저는 온라인으로 문의해봤는데, 답변이 빠르더라고요. 서류를 미리 준비해두면 더 좋을 것 같아요!',
        quote: '원문: 비자 연장 시 어떤 서류가 필요한가요?',
      },
      {
        id: 'c3',
        time: '30분 전',
        text: '또한, 친구에게 조언을 구하는 것도 좋은 방법이에요. 최근 비자 연장을 한 친구가 있어서 도움이 많이 되었어요.',
        quote: '원문: 비자 연장 절차는 어떻게 되나요?',
      },
      {
        id: 'c4',
        time: '30분 전',
        text: '또한, 친구에게 조언을 구하는 것도 좋은 방법이에요. 최근 비자 연장을 한 친구가 있어서 도움이 많이 되었어요.',
        quote: '원문: 비자 연장 절차는 어떻게 되나요?',
        isNew: true,
      },
    ],
  },
];

export default function MyPageCommentsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          내가 작성한 댓글
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-20 px-19 pb-32 pt-24"
        showsVerticalScrollIndicator={false}
      >
        {COMMENT_GROUPS.map((group) => (
          <View key={group.date} className="gap-20">
            <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
              {group.date}
            </Text>

            {group.comments.map((comment) => (
              <View
                key={comment.id}
                className="gap-8 rounded-xl border border-border-strong/30 bg-background p-17 shadow-sm"
              >
                <View className="flex-row items-center gap-8">
                  {comment.isNew ? <View className="h-8 w-8 rounded-full bg-primary-light" /> : null}
                  <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted">
                    {comment.time}
                  </Text>
                </View>
                <Text weight="medium" className="text-[14px] leading-[22.75px] text-text-strong">
                  {comment.text}
                </Text>
                <View className="rounded-md border-l-4 border-primary-light bg-background-subtle py-12 pl-16 pr-12">
                  <Text weight="medium" numberOfLines={1} className="text-[12px] leading-[16px] text-text">
                    {comment.quote}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
