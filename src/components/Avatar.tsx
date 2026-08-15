import { Image } from 'expo-image';
import { View } from 'react-native';
import { tv } from 'tailwind-variants';

const placeholderIcon = require('../../assets/icons/avatar-placeholder.svg');

const wrapper = tv({
  base: 'items-center justify-center overflow-hidden rounded-full bg-background-circle',
  variants: {
    size: {
      sm: 'h-[34px] w-[34px]',
      lg: 'h-[48px] w-[48px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export type AvatarProps = {
  source?: string;
  size?: 'sm' | 'lg';
};

export function Avatar({ source, size = 'sm' }: AvatarProps) {
  return (
    <View className={wrapper({ size })}>
      <Image
        source={source ? { uri: source } : placeholderIcon}
        style={{ width: '100%', height: '100%' }}
        contentFit={source ? 'cover' : 'contain'}
      />
    </View>
  );
}
