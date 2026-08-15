import { Image } from 'expo-image';
import { TextInput, View, type ImageSourcePropType, type TextInputProps } from 'react-native';
import { Text } from './Text';

const PLACEHOLDER_COLOR = 'rgba(109,122,116,0.6)'; // text-muted @ 60%, matches Figma placeholder fill

export type InputProps = TextInputProps & {
  label?: string;
  required?: boolean;
  error?: string;
  leftIcon?: ImageSourcePropType;
};

export function Input({ label, required, error, leftIcon, ...props }: InputProps) {
  return (
    <View className="w-full">
      {label ? (
        <Text size="label" weight="medium" color="strong" className="mb-8">
          {label}
          {required ? <Text color="danger"> *</Text> : null}
        </Text>
      ) : null}
      <View className="h-[56px] flex-row items-center rounded-md border border-border-strong bg-background px-16">
        {leftIcon ? (
          <Image source={leftIcon} style={{ width: 16, height: 16, marginRight: 12 }} />
        ) : null}
        <TextInput
          className="flex-1 font-sans text-label text-text"
          placeholderTextColor={PLACEHOLDER_COLOR}
          {...props}
        />
      </View>
      {error ? (
        <Text size="caption" weight="medium" color="danger" className="mt-4">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
