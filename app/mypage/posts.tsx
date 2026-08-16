import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const heartIcon = require('@/assets/icons/icon-heart-outline.svg');
const messageIcon = require('@/assets/icons/icon-message-circle.svg');
const calendarIcon = require('@/assets/icons/icon-calendar-xs.svg');

const FILTERS = ['전체', '커뮤니티', '클럽'] as const;
type Filter = (typeof FILTERS)[number];

type CommunityPost = {
  id: string;
  category: '커뮤니티';
  time: string;
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
};

type ClubPost = {
  id: string;
  category: '클럽';
  time: string;
  title: string;
  excerpt: string;
  memberCount: number;
  memberLimit: number;
  deadline: string;
};

const POSTS: (CommunityPost | ClubPost)[] = [
  {
    id: 'p1',
    category: '커뮤니티',
    time: '1주일 전',
    title: '한국 음식 그리울 때 다들 어디 가세요?',
    excerpt: '요즘 김치찌개가 너무 먹고 싶네요... 추천 맛집 부탁 드려요!',
    likes: 3,
    comments: 3,
  },
  {
    id: 'p2',
    category: '커뮤니티',
    time: '1주일 전',
    title: '한국 음식 그리울 때 다들 어디 가세요?',
    excerpt: '요즘 김치찌개가 너무 먹고 싶네요... 추천 맛집 부탁 드려요!',
    likes: 3,
    comments: 3,
  },
  {
    id: 'p3',
    category: '클럽',
    time: '1주일 전',
    title: '저녁 축구 경기',
    excerpt: '서울의 숨은 명소를 함께 찾아봐요...',
    memberCount: 22,
    memberLimit: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
  {
    id: 'p4',
    category: '클럽',
    time: '1주일 전',
    title: '저녁 축구 경기',
    excerpt: '서울의 숨은 명소를 함께 찾아봐요...',
    memberCount: 22,
    memberLimit: 25,
    deadline: '마감일: 10월 24일, 18:00',
  },
];

const CATEGORY_BADGE: Record<'커뮤니티' | '클럽', string> = {
  커뮤니티: 'bg-[#a4b3ff]/20',
  클럽: 'bg-[#ffdad6]/70',
};

export default function MyPagePostsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('전체');

  const posts = POSTS.filter((post) => filter === '전체' || post.category === filter);

  return (
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          내가 작성한 글
        </Text>
      </View>

      {/* 필터 탭 */}
      <View className="flex-row gap-16 px-20 pt-16">
        {FILTERS.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)}>
            <Text
              weight={filter === item ? 'medium' : 'sans'}
              className={filter === item ? 'text-[14px] text-primary' : 'text-[14px] text-[#8b8b8b]'}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-16 px-20 pb-32 pt-16"
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <View key={post.id} className="gap-12 rounded-xl bg-background p-13 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className={`rounded-full px-8 py-4 ${CATEGORY_BADGE[post.category]}`}>
                <Text weight="medium" className="text-[10px] text-[#1c1e1e]">
                  {post.category}
                </Text>
              </View>
              <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted">
                {post.time}
              </Text>
            </View>

            <Text weight="medium" className="text-[15px] leading-[18.75px] text-text-strong">
              {post.title}
            </Text>
            <Text weight="medium" className="text-[14px] leading-[20px] text-text">
              {post.excerpt}
            </Text>

            {post.category === '커뮤니티' ? (
              <View className="flex-row gap-8 border-t border-border-strong/30 pt-6">
                <View className="flex-row items-center gap-4">
                  <Image source={heartIcon} style={{ width: 14, height: 14 }} />
                  <Text className="text-[12px] leading-[16px] text-[#3d3d3d]">{post.likes}</Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <Image source={messageIcon} style={{ width: 14, height: 14 }} />
                  <Text className="text-[12px] leading-[16px] text-[#3d3d3d]">{post.comments}</Text>
                </View>
              </View>
            ) : (
              <View className="gap-8">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[14px] leading-[24px] text-text">참여 인원</Text>
                  <Text weight="semibold" className="text-[14px] leading-[24px] text-text-strong">
                    {post.memberCount}/{post.memberLimit}
                  </Text>
                </View>
                <View className="h-6 overflow-hidden rounded-full bg-background-muted">
                  <View
                    className="h-6 rounded-full bg-primary"
                    style={{ width: `${(post.memberCount / post.memberLimit) * 100}%` }}
                  />
                </View>
                <View className="flex-row items-center gap-8">
                  <Image source={calendarIcon} style={{ width: 8, height: 9 }} />
                  <Text className="text-[13px] leading-[24px] text-text">{post.deadline}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
