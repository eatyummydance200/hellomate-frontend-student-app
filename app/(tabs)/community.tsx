import { Image } from 'expo-image';
import { useRouter, type Href } from 'expo-router';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const searchIcon = require('@/assets/icons/icon-search.svg');
const sortChevronIcon = require('@/assets/icons/icon-sort-chevron.svg');
const avatarIcon = require('@/assets/icons/icon-avatar-community.svg');
const heartOutlineIcon = require('@/assets/icons/icon-heart-outline.svg');
const messageIcon = require('@/assets/icons/icon-message-circle.svg');
const pencilIcon = require('@/assets/icons/icon-pencil.svg');

const POSTS = [
  {
    id: 'p1',
    author: '익명1',
    lang: 'English',
    time: '10분 전',
    translateLabel: '번역 보기',
    content:
      "Does anyone know a good Tteokbokki place near the central library? I'm looking for somewhere that isn't too spicy but still authentic! 🥘",
    likes: 3,
    comments: 3,
  },
  {
    id: 'p2',
    author: '익명2',
    lang: 'Chinese',
    time: '25분 전',
    translateLabel: '원본 보기',
    content:
      '기숙사 세탁기가 고장 난 것 같은데, 수리하려면 어디로 연락해야 하는지 아시는 분 계신가요? 세탁기 화면에 모두 E4 에러 코드가 떠 있네요. 😭',
    likes: 3,
    comments: 3,
  },
  {
    id: 'p3',
    author: '익명2',
    lang: 'Chinese',
    time: '25분 전',
    translateLabel: '번역 보기',
    content: '宿舍里的洗衣机好像坏了，有人知道该联系谁修理吗？所有的机器显示屏都显示错误代码 E4。😭',
    likes: 3,
    comments: 2,
  },
] as const;

type TabKey = 'notice' | 'community' | 'club' | 'info' | 'mypage';

const TAB_ROUTES: Record<TabKey, Href> = {
  notice: '/(tabs)',
  community: '/(tabs)/community',
  club: '/(tabs)/club',
  info: '/(tabs)/info',
  mypage: '/(tabs)/mypage',
};

export default function CommunityHomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Header onPressNotification={() => router.push('/notifications')} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-16 px-16 pb-32 pt-16"
        showsVerticalScrollIndicator={false}
      >
        <Text size="display" weight="semibold" className="text-[#3d3d3d]">
          자유게시판
        </Text>

        <View className="h-40 flex-row items-center justify-between rounded-sm border border-border bg-background px-12 py-8">
          <TextInput
            placeholder="검색어를 입력하세요"
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
          {POSTS.map((post) => (
            <Pressable
              key={post.id}
              className="w-full gap-12 rounded-lg border border-border-strong/30 bg-background p-16 shadow-sm"
              onPress={() => router.push({ pathname: '/community/[id]', params: { id: post.id } })}
            >
              <View className="flex-row items-center gap-12">
                <Image source={avatarIcon} style={{ width: 33, height: 33 }} />
                <View className="gap-4">
                  <Text weight="semibold" className="text-[16px] leading-[24px] text-[#3d3d3d]">
                    {post.author}
                  </Text>
                  <View className="flex-row items-center gap-10">
                    <Text size="caption" color="muted">
                      {post.lang}
                    </Text>
                    <Text size="caption" color="muted">
                      {post.time}
                    </Text>
                  </View>
                </View>
              </View>
              <Text weight="semibold" className="text-[10px] leading-[24px] text-primary">
                {post.translateLabel}
              </Text>
              <Text numberOfLines={4} color="default" className="text-[14px] leading-[21px]">
                {post.content}
              </Text>
              <View className="flex-row items-center gap-16 border-t border-border-strong/30 pt-8">
                <View className="flex-row items-center gap-4">
                  <Image source={heartOutlineIcon} style={{ width: 14, height: 14 }} />
                  <Text size="caption" color="strong">
                    {post.likes}
                  </Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <Image source={messageIcon} style={{ width: 14, height: 14 }} />
                  <Text size="caption" color="strong">
                    {post.comments}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        className="absolute bottom-[96px] right-20 h-[62px] w-[62px] items-center justify-center rounded-full bg-primary shadow-lg"
        onPress={() => router.push('/community/write')}
      >
        <Image source={pencilIcon} style={{ width: 21, height: 21 }} />
      </Pressable>

      <BottomNav active="community" onChange={(key: TabKey) => router.push(TAB_ROUTES[key])} />
    </View>
  );
}
