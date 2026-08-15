import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tv } from 'tailwind-variants';

const text = tv({
  base: 'font-sans text-text',
  variants: {
    size: {
      micro: 'text-micro',
      captionSm: 'text-caption-sm',
      caption: 'text-caption',
      label: 'text-label',
      body: 'text-body',
      title: 'text-title',
      display: 'text-display',
    },
    weight: {
      sans: 'font-sans',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-text',
      strong: 'text-text-strong',
      muted: 'text-text-muted',
      inverse: 'text-text-inverse',
      primary: 'text-primary',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    size: 'label',
    weight: 'sans',
    color: 'default',
  },
});

type TextVariants = {
  size?: 'micro' | 'captionSm' | 'caption' | 'label' | 'body' | 'title' | 'display';
  weight?: 'sans' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'strong' | 'muted' | 'inverse' | 'primary' | 'danger';
};

export type TextProps = RNTextProps & TextVariants;

export function Text({ size, weight, color, className, ...props }: TextProps) {
  return <RNText className={text({ size, weight, color, className })} {...props} />;
}
