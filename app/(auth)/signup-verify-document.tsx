import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const cameraIcon = require('@/assets/icons/icon-camera.svg');
const retakeIcon = require('@/assets/icons/icon-retake.svg');
const trashIcon = require('@/assets/icons/icon-trash.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');
const idCardIcon = require('@/assets/icons/icon-id-card.svg');
const enrollmentCertIcon = require('@/assets/icons/icon-enrollment-cert.svg');
const graduationCapIcon = require('@/assets/icons/icon-graduation-cap.svg');
const transcriptIcon = require('@/assets/icons/icon-transcript.svg');
const mockStudentId = require('@/assets/images/mock-student-id.png');

const DOCUMENT_TYPES = [
  { icon: idCardIcon, label: '학생증\n(모바일 포함)', size: { width: 20, height: 20 } },
  { icon: enrollmentCertIcon, label: '재학증명서', size: { width: 16, height: 20 } },
  { icon: graduationCapIcon, label: '입학허가서', size: { width: 22, height: 18 } },
  { icon: transcriptIcon, label: '성적증명서', size: { width: 19.5, height: 16 } },
];

const NOTICES = [
  '빛 반사가 없는 밝은 곳에서 촬영해주세요.',
  '이름, 학교명, 학번이 선명하게 보여야 합니다.',
  '주민등록번호 뒷자리는 포스트잇 등으로 가려주세요.',
];

export default function SignUpVerifyDocumentScreen() {
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          서류 인증
        </Text>
      </View>

      <View className="flex-1 px-20 pt-24">
        {/* 안내 문구 영역 */}
        <View className="gap-8">
          <Text weight="medium" className="text-[20px] leading-[32px] text-text-strong">
            학생 인증 서류 제출해 주세요.
          </Text>
          <Text className="text-[14px] leading-[20px] text-text">
            정확한 정보를 위해 서류 전체가 나오도록 촬영해주세요.
          </Text>
        </View>

        {/* 서류 사진 업로드 영역 */}
        {uploaded ? (
          <View className="mt-24 h-237 overflow-hidden rounded-xl border border-primary">
            <Image source={mockStudentId} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            <View className="absolute left-16 top-16 flex-row items-center gap-6 rounded-full bg-primary-light px-12 py-6">
              <Image source={checkIcon} style={{ width: 12, height: 12 }} />
              <Text weight="medium" className="text-[12px] leading-[16px] text-primary-dark">
                업로드 완료
              </Text>
            </View>
            <View className="absolute inset-0 items-center justify-center bg-black/20">
              <View className="flex-row items-center gap-12">
                <Pressable
                  onPress={() => setUploaded(false)}
                  className="flex-row items-center gap-8 rounded-full bg-white/90 px-20 py-12"
                >
                  <Image source={retakeIcon} style={{ width: 13.33, height: 13.33 }} />
                  <Text weight="medium" className="text-[15px] leading-[20px] text-text">
                    다시 촬영
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setUploaded(false)}
                  className="h-44 w-44 items-center justify-center rounded-full bg-white/90"
                >
                  <Image source={trashIcon} style={{ width: 16, height: 18 }} />
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => setUploaded(true)}
            className="mt-24 h-237 items-center justify-center rounded-xl border border-primary bg-background-subtle"
          >
            <View className="items-center gap-15">
              <View className="h-64 w-64 items-center justify-center rounded-full bg-primary/10">
                <Image source={cameraIcon} style={{ width: 30, height: 27 }} />
              </View>
              <View className="items-center gap-5">
                <Text weight="medium" className="text-[15px] leading-[20px] text-primary">
                  서류 사진 추가
                </Text>
                <Text className="text-[10px] leading-[16px] text-text">
                  카메라로 촬영하거나 사진을 선택하세요
                </Text>
              </View>
            </View>
          </Pressable>
        )}

        {/* 인증 가능한 서류 영역 */}
        <View className="gap-16 pt-24">
          <View className="flex-row items-center justify-between">
            <Text weight="medium" className="text-[15px] leading-[22px] text-text-strong">
              인증 가능한 서류
            </Text>
            <View className="rounded-full bg-primary-light/10 px-12 py-4">
              <Text weight="medium" className="text-[12px] leading-[16px] text-primary">
                최근 3개월 이내
              </Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-12">
            {DOCUMENT_TYPES.map(({ icon, label, size }) => (
              <View
                key={label}
                className="w-[47%] flex-row items-center gap-12 rounded-md border border-border-strong/30 bg-white p-17 shadow-sm"
              >
                <Image source={icon} style={size} />
                <Text weight="medium" className="flex-1 text-[14px] leading-[20px] text-text-strong">
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 인증 유의사항 영역 */}
        <View className="gap-12 rounded-xl border border-border-strong/30 bg-background-subtle p-17 mt-16">
          <Text weight="medium" className="text-[13px] leading-[20px] text-text">
            인증 유의사항
          </Text>
          <View className="gap-10">
            {NOTICES.map((notice) => (
              <View key={notice} className="flex-row gap-8">
                <View className="h-12 items-start pt-6">
                  <View className="h-6 w-6 rounded-full bg-primary" />
                </View>
                <Text weight="medium" className="flex-1 text-[10px] leading-[16px] text-text">
                  {notice}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 인증 요청 버튼 영역 */}
      <View className="px-20 pb-20 pt-16">
        <Pressable
          disabled={!uploaded}
          className={`h-56 items-center justify-center rounded-lg ${uploaded ? 'bg-primary' : 'bg-text-muted/50'}`}
          onPress={() => router.push('/(auth)/signup-verify-document-pending')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            인증 요청 보내기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
