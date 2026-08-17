import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';
import { Text } from '@/src/components/Text';

const closeIcon = require('@/assets/icons/icon-close.svg');

const SWITCH_TRACK = { false: '#e9efeb', true: '#006b55' };

const styles = {
  container: 'flex-1 bg-background',
  header: 'flex-row items-center justify-between border-b border-border bg-background px-24 pb-19',
  headerTitle: 'text-[20px] leading-[30px] text-[#3d3d3d]',
  scroll: 'flex-1',
  scrollContent: 'gap-24 px-24 pb-32 pt-16',
  introText: 'text-[10px] leading-6 text-text',
  section: 'gap-14',
  sectionTitle: 'text-[17px] leading-[22px] text-[#3d3d3d]',
  sectionCard: 'rounded-lg bg-background shadow-sm',
  rowTextWrap: 'gap-4',
  rowTitle: 'text-[15px] leading-5 text-text-strong',
  rowDesc: 'text-[12px] leading-4 text-text',
  systemRow: 'flex-row items-center justify-between bg-[rgba(239,245,241,0.3)] p-16',
  systemRowTitle: 'text-[15px] leading-5 text-text-strong',
  systemRowBadge: 'text-[10px] leading-4 text-primary',
} as const;

const toggleRow = tv({
  base: 'flex-row items-center justify-between p-16',
  variants: {
    last: {
      true: '',
      false: 'border-b border-[rgba(188,202,195,0.3)]',
    },
  },
});

type ToggleRowProps = {
  title: string;
  description?: string;
  value: boolean;
  onChange: (next: boolean) => void;
  isLast?: boolean;
};

function ToggleRow({ title, description, value, onChange, isLast }: ToggleRowProps) {
  return (
    <View className={toggleRow({ last: Boolean(isLast) })}>
      <View className={styles.rowTextWrap}>
        <Text weight="semibold" className={styles.rowTitle}>
          {title}
        </Text>
        {description ? (
          <Text weight="medium" className={styles.rowDesc}>
            {description}
          </Text>
        ) : null}
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={SWITCH_TRACK} thumbColor="#ffffff" />
    </View>
  );
}

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [prefs, setPrefs] = useState({
    dmChat: true,
    clubChat: true,
    notice: true,
    community: true,
    clubActivity: true,
    lifeInfo: true,
  });

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header} style={{ paddingTop: insets.top + 19 }}>
        <Text weight="semibold" className={styles.headerTitle}>
          알림 설정
        </Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      <ScrollView className={styles.scroll} contentContainerClassName={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text weight="medium" className={styles.introText}>
          {'HelloMate의 소식을 실시간으로 받아보세요. 각 카테고리별로 알림 수신 여부를 개별적으로 설정할 수 있습니다.'}
        </Text>

        {/* 채팅 알림 영역 */}
        <View className={styles.section}>
          <Text weight="semibold" className={styles.sectionTitle}>
            채팅 알림
          </Text>
          <View className={styles.sectionCard}>
            <ToggleRow
              title="담당자 1:1 채팅"
              description="문의 및 상담 메시지 알림"
              value={prefs.dmChat}
              onChange={(next) => setPrefs((prev) => ({ ...prev, dmChat: next }))}
            />
            <ToggleRow
              title="클럽 그룹 채팅"
              description="가입된 클럽 멤버들과의 대화 알림"
              value={prefs.clubChat}
              onChange={(next) => setPrefs((prev) => ({ ...prev, clubChat: next }))}
              isLast
            />
          </View>
        </View>

        {/* 서비스 알림 영역 */}
        <View className={styles.section}>
          <Text weight="semibold" className={styles.sectionTitle}>
            서비스 알림
          </Text>
          <View className={styles.sectionCard}>
            <ToggleRow
              title="공지사항"
              value={prefs.notice}
              onChange={(next) => setPrefs((prev) => ({ ...prev, notice: next }))}
            />
            <ToggleRow
              title="커뮤니티"
              value={prefs.community}
              onChange={(next) => setPrefs((prev) => ({ ...prev, community: next }))}
            />
            <ToggleRow
              title="클럽활동"
              value={prefs.clubActivity}
              onChange={(next) => setPrefs((prev) => ({ ...prev, clubActivity: next }))}
            />
            <ToggleRow
              title="생활 정보"
              value={prefs.lifeInfo}
              onChange={(next) => setPrefs((prev) => ({ ...prev, lifeInfo: next }))}
            />
            <View className={styles.systemRow}>
              <View className={styles.rowTextWrap}>
                <Text weight="semibold" className={styles.systemRowTitle}>
                  시스템 안내
                </Text>
                <Text weight="medium" className={styles.systemRowBadge}>
                  필수 수신 알림
                </Text>
              </View>
              <Switch value disabled trackColor={SWITCH_TRACK} thumbColor="#ffffff" style={{ opacity: 0.5 }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
