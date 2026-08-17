import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const avatarIcon = require('@/assets/icons/icon-avatar-community.svg');
const heartFilledIcon = require('@/assets/icons/icon-heart-filled.svg');
const messageIcon = require('@/assets/icons/icon-message-circle.svg');
const heartOutlineIcon = require('@/assets/icons/icon-heart-outline.svg');
const replyArrowIcon = require('@/assets/icons/icon-reply-arrow.svg');
const sendIcon = require('@/assets/icons/icon-send.svg');

// Figma 시안 기준 고정 콘텐츠. 실제 게시글 조회는 Phase 5에서 id로 연동.
const POST = {
  author: '익명2',
  lang: 'Chinese',
  time: '25분 전',
  translateLabel: '번역 보기',
  content: '宿舍里的洗衣机好像坏了，有人知道该联系谁修理吗？所有的机器显示屏都显示错误代码 E4。😭',
  likes: 3,
  comments: 2,
};

const COMMENTS = [
  {
    id: 'c1',
    author: '익명 3',
    time: '방금 전',
    text: '작년에는 시험 기간에 밤 11시까지 했어요.',
    likes: 0,
    replies: [{ id: 'c1-r1', author: '익명 3', time: '방금 전', text: '작년에는 시험 기간에 밤 11시까지 했어요.', likes: 0 }],
  },
  {
    id: 'c2',
    author: '익명 4',
    time: '방금 전',
    translateLabel: '번역 보기',
    text: 'The library usually stays open until 10 PM on weekdays, but during exams it might be midnight.',
    likes: 0,
    replies: [],
  },
] as const;

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-24 px-[17px] pb-20 pt-16',
  postCard: 'gap-12 rounded-lg border border-border-strong/30 bg-background p-16 shadow-sm',
  postHeaderRow: 'flex-row items-center gap-12',
  postMeta: 'gap-4',
  postAuthor: 'text-[16px] leading-[24px] text-[#3d3d3d]',
  postMetaRow: 'flex-row items-center gap-10',
  translateLabel: 'text-[10px] leading-[24px] text-primary',
  postContent: 'text-[14px] leading-[21px]',
  postFooterRow: 'flex-row items-center gap-16 border-t border-border-strong/30 pt-8',
  postStat: 'flex-row items-center gap-4',
  commentsSection: 'gap-16',
  commentsTitle: 'text-[15px] leading-[23px] text-[#3d3d3d]',
  commentGroup: 'gap-8',
  commentCard: 'gap-7 rounded-lg bg-background p-12 shadow-sm',
  commentHeaderRow: 'flex-row items-center justify-between',
  commentText: 'text-[14px] leading-[20px]',
  commentActionsRow: 'flex-row items-center gap-12 pt-4',
  commentLikeRow: 'flex-row items-center gap-4',
  commentLikeText: 'text-[11px] leading-[16px]',
  replyRow: 'flex-row items-start gap-4 pl-4',
  replyCard: 'flex-1 gap-7 rounded-lg bg-background-muted p-12 shadow-sm',
  footer: 'px-20 pb-20 pt-8',
  commentBar: 'h-[52px] w-full flex-row items-center justify-between rounded-full bg-background pl-16 pr-8 shadow-sm',
  commentBarLeft: 'flex-row items-center gap-12',
  anonBadge: 'rounded-full bg-[#e3eae5] px-8 py-[1px]',
  anonBadgeText: 'text-[10px] leading-[16px]',
  commentInput: 'font-sans text-body text-text',
  sendButton: 'h-[36px] w-[36px] items-center justify-center rounded-full bg-primary',
} as const;

export default function CommunityPostDetailScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          게시글
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className={styles.postCard}>
          <View className={styles.postHeaderRow}>
            <Image source={avatarIcon} style={{ width: 33, height: 33 }} />
            <View className={styles.postMeta}>
              <Text weight="semibold" className={styles.postAuthor}>
                {POST.author}
              </Text>
              <View className={styles.postMetaRow}>
                <Text size="caption" color="muted">
                  {POST.lang}
                </Text>
                <Text size="caption" color="muted">
                  {POST.time}
                </Text>
              </View>
            </View>
          </View>
          <Text weight="semibold" className={styles.translateLabel}>
            {POST.translateLabel}
          </Text>
          <Text color="default" className={styles.postContent}>
            {POST.content}
          </Text>
          <View className={styles.postFooterRow}>
            <View className={styles.postStat}>
              <Image source={heartFilledIcon} style={{ width: 12, height: 10 }} />
              <Text size="caption" color="strong">
                {POST.likes}
              </Text>
            </View>
            <View className={styles.postStat}>
              <Image source={messageIcon} style={{ width: 14, height: 14 }} />
              <Text size="caption" color="strong">
                {POST.comments}
              </Text>
            </View>
          </View>
        </View>

        <View className={styles.commentsSection}>
          <Text weight="semibold" className={styles.commentsTitle}>
            댓글 {POST.comments}
          </Text>

          {COMMENTS.map((comment) => (
            <View key={comment.id} className={styles.commentGroup}>
              <View className={styles.commentCard}>
                <View className={styles.commentHeaderRow}>
                  <Text size="caption" weight="medium" color="strong">
                    {comment.author}
                  </Text>
                  <Text size="caption" color="default">
                    {comment.time}
                  </Text>
                </View>
                {'translateLabel' in comment ? (
                  <Text weight="semibold" className={styles.translateLabel}>
                    {comment.translateLabel}
                  </Text>
                ) : null}
                <Text className={styles.commentText} color="default">
                  {comment.text}
                </Text>
                <View className={styles.commentActionsRow}>
                  <Text size="caption" weight="medium" color="primary">
                    답글 달기
                  </Text>
                  <View className={styles.commentLikeRow}>
                    <Image source={heartOutlineIcon} style={{ width: 12, height: 11 }} />
                    <Text className={styles.commentLikeText} color="default">
                      {comment.likes}
                    </Text>
                  </View>
                </View>
              </View>

              {comment.replies.map((reply) => (
                <View key={reply.id} className={styles.replyRow}>
                  <Image source={replyArrowIcon} style={{ width: 11, height: 13, marginTop: 8 }} />
                  <View className={styles.replyCard}>
                    <View className={styles.commentHeaderRow}>
                      <Text size="caption" weight="medium" color="strong">
                        {reply.author}
                      </Text>
                      <Text size="caption" color="default">
                        {reply.time}
                      </Text>
                    </View>
                    <Text className={styles.commentText} color="default">
                      {reply.text}
                    </Text>
                    <View className={styles.commentActionsRow}>
                      <Text size="caption" weight="medium" color="primary">
                        답글 달기
                      </Text>
                      <View className={styles.commentLikeRow}>
                        <Image source={heartOutlineIcon} style={{ width: 12, height: 11 }} />
                        <Text className={styles.commentLikeText} color="default">
                          {reply.likes}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View className={styles.footer}>
        <View className={styles.commentBar}>
          <View className={styles.commentBarLeft}>
            <View className={styles.anonBadge}>
              <Text className={styles.anonBadgeText} color="default">
                익명
              </Text>
            </View>
            <TextInput placeholder="댓글 입력" placeholderTextColor="#8b8b8b" className={styles.commentInput} />
          </View>
          <View className={styles.sendButton}>
            <Image source={sendIcon} style={{ width: 16, height: 9 }} />
          </View>
        </View>
      </View>
    </View>
  );
}
