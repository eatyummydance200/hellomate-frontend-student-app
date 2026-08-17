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

const styles = {
  container: 'flex-1 bg-background-subtle',
  header: 'flex-row items-center justify-between border-b border-border bg-background px-13 py-12',
  headerTitle: 'text-[15px] leading-[19px] text-text-strong',
  headerSubtitle: 'pt-7 text-[11px] leading-[16px] text-text-muted',
  noticeBanner: 'mx-19 mt-16 gap-12 rounded-lg border border-border bg-primary-light/20 p-16',
  noticeHeaderRow: 'flex-row items-center justify-between',
  noticeHeaderLeft: 'flex-row items-center gap-11',
  noticeTitle: 'text-[16px] leading-[24px] text-[#3d3d3d]',
  noticeBody: 'gap-4',
  noticeLine: 'text-[12px] leading-[18px] text-text',
  scroll: 'flex-1',
  scrollContent: 'gap-13 px-[5px] pt-18 pb-16',
  systemMessages: 'items-center gap-13',
  systemMessageChip: 'rounded-full bg-background-muted px-12 py-4',
  systemMessageText: 'text-[12px] leading-[18px] text-text-muted',
  messageList: 'gap-6',
  myMessageRow: 'flex-row items-end justify-end gap-4',
  myMessageMeta: 'items-end',
  unreadText: 'text-[11px] leading-[16px] text-primary',
  messageTime: 'text-[11px] leading-[16px] text-[#3d3d3d]',
  myBubble: 'max-w-[256px] rounded-lg bg-primary px-12 py-8',
  bubbleText: 'text-[14px] leading-[21px]',
  staffMessageGroup: 'gap-4',
  staffAuthor: 'pl-4 text-[12px] leading-[18px] text-text',
  staffMessageRow: 'flex-row items-end gap-4',
  staffBubble: 'max-w-[256px] rounded-lg bg-background px-12 py-8',
  staffMeta: 'items-start',
  footer: 'px-16 pb-20 pt-8',
  inputBar: 'h-[52px] w-full flex-row items-center justify-between rounded-full bg-background pl-16 pr-8 shadow-sm',
  inputPlaceholder: 'text-[#8b8b8b]',
  sendButton: 'h-[36px] w-[36px] items-center justify-center rounded-full bg-primary',
} as const;

export default function ClubChatScreen() {
  const router = useRouter();
  const [noticeExpanded, setNoticeExpanded] = useState(false);

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <View>
          <Text weight="medium" className={styles.headerTitle}>
            아시아 음식 러버들
          </Text>
          <Text className={styles.headerSubtitle}>멤버 24명</Text>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      {/* 클럽 소개 배너 (펼치기/접기) */}
      <Pressable className={styles.noticeBanner} onPress={() => setNoticeExpanded((v) => !v)}>
        <View className={styles.noticeHeaderRow}>
          <View className={styles.noticeHeaderLeft}>
            <Image source={infoCircleIcon} style={{ width: 24, height: 24 }} />
            <Text weight="semibold" className={styles.noticeTitle}>
              클럽 소개
            </Text>
          </View>
          <Image
            source={chevronDownIcon}
            style={{ width: 12, height: 6, transform: [{ rotate: noticeExpanded ? '180deg' : '0deg' }] }}
          />
        </View>
        {noticeExpanded ? (
          <View className={styles.noticeBody}>
            {CLUB_NOTICE.map((line) => (
              <Text key={line} className={styles.noticeLine}>
                {line}
              </Text>
            ))}
          </View>
        ) : null}
      </Pressable>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent}>
        <View className={styles.systemMessages}>
          {SYSTEM_MESSAGES.map((message) => (
            <View key={message} className={styles.systemMessageChip}>
              <Text className={styles.systemMessageText}>{message}</Text>
            </View>
          ))}
        </View>

        <View className={styles.messageList}>
          {MESSAGES.map((message) =>
            message.from === 'me' ? (
              <View key={message.id} className={styles.myMessageRow}>
                <View className={styles.myMessageMeta}>
                  <Text className={styles.unreadText}>{message.unread}</Text>
                  <Text className={styles.messageTime}>{message.time}</Text>
                </View>
                <View className={styles.myBubble}>
                  <Text color="inverse" className={styles.bubbleText}>
                    {message.text}
                  </Text>
                </View>
              </View>
            ) : (
              <View key={message.id} className={styles.staffMessageGroup}>
                <Text className={styles.staffAuthor}>{message.author}</Text>
                <View className={styles.staffMessageRow}>
                  <View className={styles.staffBubble}>
                    <Text color="strong" className={styles.bubbleText}>
                      {message.text}
                    </Text>
                  </View>
                  <View className={styles.staffMeta}>
                    <Text className={styles.unreadText}>{message.unread}</Text>
                    <Text className={styles.messageTime}>{message.time}</Text>
                  </View>
                </View>
              </View>
            ),
          )}
        </View>
      </ScrollView>

      {/* 하단 메시지 입력 바 */}
      <View className={styles.footer}>
        <View className={styles.inputBar}>
          <Text size="body" className={styles.inputPlaceholder}>
            메시지 보내기
          </Text>
          <View className={styles.sendButton}>
            <Image source={sendIcon} style={{ width: 16, height: 9 }} />
          </View>
        </View>
      </View>
    </View>
  );
}
