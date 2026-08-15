import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

// mirrors tailwind.config.js theme.colors — Image tintColor needs a raw value, not a className
const ACTIVE_COLOR = '#006b55'; // primary.DEFAULT
const INACTIVE_COLOR = '#6d7a74'; // text.muted

const icons = {
  notice: require('../../../assets/icons/nav-notice.svg'),
  community: require('../../../assets/icons/nav-community.svg'),
  club: require('../../../assets/icons/nav-club.svg'),
  info: require('../../../assets/icons/nav-info.svg'),
  mypage: require('../../../assets/icons/nav-mypage.svg'),
} as const;

const tabs = [
  { key: 'notice', label: '공지사항' },
  { key: 'community', label: '커뮤니티' },
  { key: 'club', label: '클럽' },
  { key: 'info', label: '정보' },
  { key: 'mypage', label: '마이페이지' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const label = tv({
  base: 'w-[44px] text-center font-semibold text-caption-sm',
  variants: {
    active: {
      true: 'text-primary',
      false: 'text-text-muted',
    },
  },
});

type BottomNavProps = {
  active: TabKey;
  onChange: (key: TabKey) => void;
};

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <View className="items-center px-20 pb-20 pt-8">
      <View className="w-[320px] flex-row items-center gap-12 rounded-full border border-background bg-background/20 px-16 py-12">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              className="w-[44px] items-center gap-4"
            >
              <Image
                source={icons[tab.key]}
                style={{ width: 24, height: 24 }}
                tintColor={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
              <Text className={label({ active: isActive })}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
