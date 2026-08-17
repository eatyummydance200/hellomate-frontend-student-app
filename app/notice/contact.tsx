import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const styles = {
  container: 'flex-1 bg-background-subtle',
  header: 'flex-row items-center justify-between border-b border-border bg-background px-[17px] pb-[13px]',
  headerLeft: 'flex-row items-center gap-12',
  headerName: 'text-[18px] leading-[20px]',
  headerDept: 'pt-4 text-[13px] leading-[16px]',
  contextBar: 'flex-row items-center justify-between border-b border-primary/10 bg-primary-light/20 px-20 py-12',
  contextText: 'text-[15px] leading-[24px]',
  scroll: 'flex-1',
  scrollContent: 'gap-16 px-16 pt-16 pb-16',
  dateChipWrap: 'items-center',
  dateChip: 'rounded-full bg-background-muted px-12 py-4',
  dateChipText: 'text-[10px] leading-[15px]',
  myMessageRow: 'flex-row items-end justify-end gap-4',
  myMessageTime: 'text-[11px] leading-[16px] text-[#3d3d3d]',
  myBubble: 'max-w-[256px] rounded-lg bg-primary px-12 py-8',
  bubbleText: 'leading-[21px]',
  staffMessageGroup: 'gap-4',
  staffAuthor: 'pl-4',
  staffMessageRow: 'flex-row items-end gap-4',
  staffBubble: 'max-w-[234px] rounded-lg bg-background px-12 py-8',
  staffMetaCol: 'items-start',
  unreadText: 'text-[11px] leading-[16px] text-primary',
  messageTime: 'text-[11px] leading-[16px] text-[#3d3d3d]',
  footer: 'px-20 pb-20 pt-8',
  inputBar: 'h-[52px] w-full flex-row items-center justify-between rounded-full bg-background pl-16 pr-8 shadow-sm',
  inputPlaceholder: 'text-[#8b8b8b]',
  sendButton: 'h-[36px] w-[36px] items-center justify-center rounded-full bg-primary',
} as const;

export default function NoticeContactScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className={styles.container}>
      <View className={styles.header} style={{ paddingTop: insets.top + 13 }}>
        <View className={styles.headerLeft}>
          <Avatar size="sm" />
          <View>
            <Text weight="semibold" color="strong" className={styles.headerName}>
              김하늘
            </Text>
            <Text className={styles.headerDept} color="default">
              국제교류처
            </Text>
          </View>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      <Pressable className={styles.contextBar}>
        <Text weight="medium" color="primary" className={styles.contextText}>
          문의 중인 공지: 건강보험 신청 안내
        </Text>
        <Image source={chevronRightSmIcon} style={{ width: 5, height: 8 }} />
      </Pressable>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent}>
        <View className={styles.dateChipWrap}>
          <View className={styles.dateChip}>
            <Text className={styles.dateChipText} color="default">
              2023년 10월 24일 화요일
            </Text>
          </View>
        </View>

        {MESSAGES.map((message) =>
          message.from === 'me' ? (
            <View key={message.id} className={styles.myMessageRow}>
              <Text className={styles.myMessageTime}>{message.time}</Text>
              <View className={styles.myBubble}>
                <Text color="inverse" size="label" className={styles.bubbleText}>
                  {message.text}
                </Text>
              </View>
            </View>
          ) : (
            <View key={message.id} className={styles.staffMessageGroup}>
              <Text size="caption" color="default" className={styles.staffAuthor}>
                {message.author}
              </Text>
              <View className={styles.staffMessageRow}>
                <View className={styles.staffBubble}>
                  <Text color="strong" size="label" className={styles.bubbleText}>
                    {message.text}
                  </Text>
                </View>
                <View className={styles.staffMetaCol}>
                  {message.unread ? <Text className={styles.unreadText}>{message.unread}</Text> : null}
                  <Text className={styles.messageTime}>{message.time}</Text>
                </View>
              </View>
            </View>
          ),
        )}
      </ScrollView>

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
