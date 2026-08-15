import { View, type ViewProps } from 'react-native';
import { tv } from 'tailwind-variants';

const card = tv({
  base: 'border border-border-strong/30 bg-background p-16',
  variants: {
    radius: {
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  defaultVariants: {
    radius: 'lg',
  },
});

export type CardProps = ViewProps & {
  radius?: 'lg' | 'xl';
};

export function Card({ radius, className, ...props }: CardProps) {
  return <View className={card({ radius, className })} {...props} />;
}
