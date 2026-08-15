import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

const logo = require('../../../assets/images/logo.png');
const bellIcon = require('../../../assets/icons/notification-bell.svg');

type HeaderProps = {
  onPressNotification?: () => void;
};

export function Header({ onPressNotification }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border bg-background px-16 py-20">
      <Image source={logo} style={{ width: 108, height: 24 }} contentFit="contain" />
      <Pressable onPress={onPressNotification} hitSlop={8}>
        <Image source={bellIcon} style={{ width: 24, height: 24 }} />
      </Pressable>
    </View>
  );
}
