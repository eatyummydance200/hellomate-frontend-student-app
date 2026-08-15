import { Pressable, type PressableProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from './Text';

const button = tv({
  base: 'h-[56px] items-center justify-center rounded-lg',
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-border-strong',
    },
    disabled: {
      true: 'opacity-40',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const labelColor = {
  primary: 'inverse',
  secondary: 'default',
} as const;

export type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export function Button({ label, variant = 'primary', disabled, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={button({ variant, disabled, className })}
      disabled={disabled}
      {...props}
    >
      <Text size="title" weight="semibold" color={labelColor[variant]}>
        {label}
      </Text>
    </Pressable>
  );
}
