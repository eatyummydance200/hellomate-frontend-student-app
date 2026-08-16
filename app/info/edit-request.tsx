import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/src/components/Text';

const documentIcon = require('@/assets/icons/icon-document-sm.svg');
const sendArrowIcon = require('@/assets/icons/icon-send-arrow.svg');

const ARTICLE_TITLE = 'D-2 비자 연장 완벽 가이드';
const MAX_LENGTH = 500;

export default function InfoEditRequestScreen() {
  const router = useRouter();
  const [content, setContent] = useState('');

  return (
    <View className="flex-1 justify-end bg-black/20">
      <Pressable className="absolute inset-0" onPress={() => router.back()} />

      {/* 수정 요청 바텀시트 */}
      <View className="gap-16 rounded-t-[32px] bg-background pb-32 pt-16 shadow-lg">
        <View className="h-4 w-40 self-center rounded-full bg-border-strong" />

        <View className="gap-16 px-20">
          <View className="gap-8">
            <Text weight="semibold" className="text-[15px] leading-[24px] text-text-strong">
              수정 요청 보내기
            </Text>
            <Text weight="medium" className="text-[13px] leading-[20px] text-[#414465]">
              관리자에게 수정 요청을 보낼 수 있어요.
            </Text>
          </View>

          {/* 대상 정보글 컨텍스트 박스 */}
          <View className="flex-row items-center gap-8 rounded-md border border-primary-light/20 bg-primary-light/10 p-13">
            <Image source={documentIcon} style={{ width: 12, height: 15 }} />
            <Text weight="medium" className="text-[12px] leading-[20px] text-primary-dark">
              {ARTICLE_TITLE}
            </Text>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[16px] text-text-strong">
              수정 내용
            </Text>
            <TextInput
              className="h-[160px] rounded-xl border border-border-strong bg-background p-17 font-sans text-[14px] leading-[20px] text-text-strong"
              placeholder="수정이 필요한 내용을 구체적으로 작성해 주세요"
              placeholderTextColor="#bccac3"
              multiline
              textAlignVertical="top"
              maxLength={MAX_LENGTH}
              value={content}
              onChangeText={setContent}
            />
            <Text className="text-right text-[12px] leading-[16px] text-border-strong">
              {content.length} / {MAX_LENGTH}
            </Text>
          </View>

          <Pressable
            className="h-56 flex-row items-center justify-center gap-8 rounded-xl bg-primary"
            onPress={() => router.back()}
          >
            <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
              전송하기
            </Text>
            <Image source={sendArrowIcon} style={{ width: 16, height: 13 }} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
