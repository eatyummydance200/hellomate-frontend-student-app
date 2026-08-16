import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/src/components/Text';

const closeIcon = require('@/assets/icons/icon-close.svg');

const SWITCH_TRACK = { false: '#e9efeb', true: '#006b55' };

type ToggleRowProps = {
  title: string;
  description?: string;
  value: boolean;
  onChange: (next: boolean) => void;
  isLast?: boolean;
};

function ToggleRow({ title, description, value, onChange, isLast }: ToggleRowProps) {
  return (
    <View
      className={
        isLast
          ? 'flex-row items-center justify-between p-16'
          : 'flex-row items-center justify-between border-b border-[rgba(188,202,195,0.3)] p-16'
      }
    >
      <View className="gap-4">
        <Text weight="semibold" className="text-[15px] leading-5 text-text-strong">
          {title}
        </Text>
        {description ? (
          <Text weight="medium" className="text-[12px] leading-4 text-text">
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
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View
        className="flex-row items-center justify-between border-b border-border bg-background px-24 pb-19"
        style={{ paddingTop: insets.top + 19 }}
      >
        <Text weight="semibold" className="text-[20px] leading-[30px] text-[#3d3d3d]">
          알림 설정
        </Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={closeIcon} style={{ width: 24, height: 24 }} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-24 px-24 pb-32 pt-16"
        showsVerticalScrollIndicator={false}
      >
        <Text weight="medium" className="text-[10px] leading-6 text-text">
          {'HelloMate의 소식을 실시간으로 받아보세요. 각 카테고리별로 알림 수신 여부를 개별적으로 설정할 수 있습니다.'}
        </Text>

        {/* 채팅 알림 영역 */}
        <View className="gap-14">
          <Text weight="semibold" className="text-[17px] leading-[22px] text-[#3d3d3d]">
            채팅 알림
          </Text>
          <View className="rounded-lg bg-background shadow-sm">
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
        <View className="gap-14">
          <Text weight="semibold" className="text-[17px] leading-[22px] text-[#3d3d3d]">
            서비스 알림
          </Text>
          <View className="rounded-lg bg-background shadow-sm">
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
            <View className="flex-row items-center justify-between bg-[rgba(239,245,241,0.3)] p-16">
              <View className="gap-4">
                <Text weight="semibold" className="text-[15px] leading-5 text-text-strong">
                  시스템 안내
                </Text>
                <Text weight="medium" className="text-[10px] leading-4 text-primary">
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
