import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');

const styles = {
  container: 'flex-1 bg-background',
  header: 'relative flex-row items-center border-b border-border bg-background px-20 py-20',
  headerTitle: 'absolute left-0 right-0 text-center text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-16 px-16 pt-16',
  aiNoticeBox: 'rounded-lg border border-primary-light/20 bg-primary-light/10 p-16',
  aiNoticeText: 'text-[13px] leading-[20px] text-primary-dark',
  formCard: 'gap-24 rounded-xl border border-border-strong/30 bg-background p-24 shadow-sm',
  nameBadge: 'self-start rounded-full bg-primary px-12 py-4',
  fieldGroup: 'gap-8',
  titleInputBox: 'h-[56px] justify-center rounded-md border border-border-strong bg-background px-16',
  titleInput: 'font-sans text-label text-text',
  contentInput: 'h-[114px] rounded-md border border-border-strong bg-background p-16 font-sans text-label text-text',
  footer: 'px-16 pb-20 pt-8',
  submitButton: 'h-[52px] w-full items-center justify-center rounded-lg bg-primary',
} as const;

export default function CommunityWriteScreen() {
  const router = useRouter();

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          새 글 작성
        </Text>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className={styles.aiNoticeBox}>
          <Text className={styles.aiNoticeText}>AI가 다른 사용자에게 필요한 언어로 번역해드려요.</Text>
        </View>

        <View className={styles.formCard}>
          <View className={styles.nameBadge}>
            <Text size="caption" color="inverse">
              실명
            </Text>
          </View>

          <View className={styles.fieldGroup}>
            <Text size="title" weight="medium" color="strong">
              제목 <Text color="danger">*</Text>
            </Text>
            <View className={styles.titleInputBox}>
              <TextInput
                placeholder="제목을 입력하세요."
                placeholderTextColor="rgba(109,122,116,0.6)"
                className={styles.titleInput}
              />
            </View>
          </View>

          <View className={styles.fieldGroup}>
            <Text size="title" weight="medium" color="strong">
              내용 <Text color="danger">*</Text>
            </Text>
            <TextInput
              placeholder="내용을 입력하세요. 어떤 언어로 작성하셔도 괜찮아요."
              placeholderTextColor="rgba(109,122,116,0.6)"
              multiline
              textAlignVertical="top"
              className={styles.contentInput}
            />
          </View>
        </View>
      </ScrollView>

      <View className={styles.footer}>
        <Pressable className={styles.submitButton} onPress={() => router.back()}>
          <Text weight="semibold" color="inverse" size="body">
            게시하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
