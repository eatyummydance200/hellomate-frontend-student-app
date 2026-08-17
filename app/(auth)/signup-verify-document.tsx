import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';
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

const styles = {
  container: 'flex-1 bg-white',
  header: 'flex-row items-center gap-10 border-b border-border bg-background px-20 py-20',
  headerTitle: 'text-[20px] leading-[1.5] text-[#3d3d3d]',
  content: 'flex-1 px-20 pt-24',
  introSection: 'gap-8',
  introTitle: 'text-[20px] leading-[32px] text-text-strong',
  introDesc: 'text-[14px] leading-[20px] text-text',
  uploadedBox: 'mt-24 h-237 overflow-hidden rounded-xl border border-primary',
  uploadedBadge: 'absolute left-16 top-16 flex-row items-center gap-6 rounded-full bg-primary-light px-12 py-6',
  uploadedBadgeText: 'text-[12px] leading-[16px] text-primary-dark',
  overlay: 'absolute inset-0 items-center justify-center bg-black/20',
  overlayActions: 'flex-row items-center gap-12',
  retakeButton: 'flex-row items-center gap-8 rounded-full bg-white/90 px-20 py-12',
  retakeButtonLabel: 'text-[15px] leading-[20px] text-text',
  trashButton: 'h-44 w-44 items-center justify-center rounded-full bg-white/90',
  uploadBox: 'mt-24 h-237 items-center justify-center rounded-xl border border-primary bg-background-subtle',
  uploadContent: 'items-center gap-15',
  uploadIconWrap: 'h-64 w-64 items-center justify-center rounded-full bg-primary/10',
  uploadTextGroup: 'items-center gap-5',
  uploadTitle: 'text-[15px] leading-[20px] text-primary',
  uploadDesc: 'text-[10px] leading-[16px] text-text',
  docTypesSection: 'gap-16 pt-24',
  docTypesHeader: 'flex-row items-center justify-between',
  docTypesTitle: 'text-[15px] leading-[22px] text-text-strong',
  docTypesBadge: 'rounded-full bg-primary-light/10 px-12 py-4',
  docTypesBadgeText: 'text-[12px] leading-[16px] text-primary',
  docTypeGrid: 'flex-row flex-wrap gap-12',
  docTypeCard: 'w-[47%] flex-row items-center gap-12 rounded-md border border-border-strong/30 bg-white p-17 shadow-sm',
  docTypeLabel: 'flex-1 text-[14px] leading-[20px] text-text-strong',
  noticeBox: 'gap-12 rounded-xl border border-border-strong/30 bg-background-subtle p-17 mt-16',
  noticeTitle: 'text-[13px] leading-[20px] text-text',
  noticeList: 'gap-10',
  noticeRow: 'flex-row gap-8',
  noticeDotWrap: 'h-12 items-start pt-6',
  noticeDot: 'h-6 w-6 rounded-full bg-primary',
  noticeText: 'flex-1 text-[10px] leading-[16px] text-text',
  footer: 'px-20 pb-20 pt-16',
  submitButtonLabel: 'text-[17px] leading-[22px] text-white',
} as const;

const submitButton = tv({
  base: 'h-56 items-center justify-center rounded-lg',
  variants: {
    uploaded: {
      true: 'bg-primary',
      false: 'bg-text-muted/50',
    },
  },
});

export default function SignUpVerifyDocumentScreen() {
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);

  return (
    <View className={styles.container}>
      {/* 헤더 영역 */}
      <View className={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className={styles.headerTitle}>
          서류 인증
        </Text>
      </View>

      <View className={styles.content}>
        {/* 안내 문구 영역 */}
        <View className={styles.introSection}>
          <Text weight="medium" className={styles.introTitle}>
            학생 인증 서류 제출해 주세요.
          </Text>
          <Text className={styles.introDesc}>정확한 정보를 위해 서류 전체가 나오도록 촬영해주세요.</Text>
        </View>

        {/* 서류 사진 업로드 영역 */}
        {uploaded ? (
          <View className={styles.uploadedBox}>
            <Image source={mockStudentId} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            <View className={styles.uploadedBadge}>
              <Image source={checkIcon} style={{ width: 12, height: 12 }} />
              <Text weight="medium" className={styles.uploadedBadgeText}>
                업로드 완료
              </Text>
            </View>
            <View className={styles.overlay}>
              <View className={styles.overlayActions}>
                <Pressable onPress={() => setUploaded(false)} className={styles.retakeButton}>
                  <Image source={retakeIcon} style={{ width: 13.33, height: 13.33 }} />
                  <Text weight="medium" className={styles.retakeButtonLabel}>
                    다시 촬영
                  </Text>
                </Pressable>
                <Pressable onPress={() => setUploaded(false)} className={styles.trashButton}>
                  <Image source={trashIcon} style={{ width: 16, height: 18 }} />
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => setUploaded(true)} className={styles.uploadBox}>
            <View className={styles.uploadContent}>
              <View className={styles.uploadIconWrap}>
                <Image source={cameraIcon} style={{ width: 30, height: 27 }} />
              </View>
              <View className={styles.uploadTextGroup}>
                <Text weight="medium" className={styles.uploadTitle}>
                  서류 사진 추가
                </Text>
                <Text className={styles.uploadDesc}>카메라로 촬영하거나 사진을 선택하세요</Text>
              </View>
            </View>
          </Pressable>
        )}

        {/* 인증 가능한 서류 영역 */}
        <View className={styles.docTypesSection}>
          <View className={styles.docTypesHeader}>
            <Text weight="medium" className={styles.docTypesTitle}>
              인증 가능한 서류
            </Text>
            <View className={styles.docTypesBadge}>
              <Text weight="medium" className={styles.docTypesBadgeText}>
                최근 3개월 이내
              </Text>
            </View>
          </View>
          <View className={styles.docTypeGrid}>
            {DOCUMENT_TYPES.map(({ icon, label, size }) => (
              <View key={label} className={styles.docTypeCard}>
                <Image source={icon} style={size} />
                <Text weight="medium" className={styles.docTypeLabel}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 인증 유의사항 영역 */}
        <View className={styles.noticeBox}>
          <Text weight="medium" className={styles.noticeTitle}>
            인증 유의사항
          </Text>
          <View className={styles.noticeList}>
            {NOTICES.map((notice) => (
              <View key={notice} className={styles.noticeRow}>
                <View className={styles.noticeDotWrap}>
                  <View className={styles.noticeDot} />
                </View>
                <Text weight="medium" className={styles.noticeText}>
                  {notice}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 인증 요청 버튼 영역 */}
      <View className={styles.footer}>
        <Pressable
          disabled={!uploaded}
          className={submitButton({ uploaded })}
          onPress={() => router.push('/(auth)/signup-verify-document-pending')}
        >
          <Text weight="semibold" className={styles.submitButtonLabel}>
            인증 요청 보내기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
