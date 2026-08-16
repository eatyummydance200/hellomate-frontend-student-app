import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const calendarIcon = require('@/assets/icons/icon-calendar-xs.svg');
const infoCircleIcon = require('@/assets/icons/icon-info-circle-sm.svg');
const feeIcon = require('@/assets/icons/icon-fee.svg');
const durationIcon = require('@/assets/icons/icon-duration.svg');

// Figma 시안 기준 고정 콘텐츠. 실제 정보글 조회는 Phase 5에서 id로 연동.
const ARTICLE = {
  title: 'D-2 비자 연장 완벽 가이드',
  updatedAt: '2026.03.15 업데이트',
  notice: '비자 만료 4개월 전부터 연장을 준비하는것을 권장해요.',
  steps: [
    {
      title: '만료일 확인',
      desc: '외국인등록증 뒷면 또는 하이코리아에서 현재 체류 기간 만료일을 정확히 확인하세요.',
    },
    {
      title: '서류 제출',
      desc: '필요 서류를 모두 준비하여 관할 출입국 관리 사무소에 제출하세요.',
      tags: ['#재학증명서', '#체류지입증'],
    },
    {
      title: '상담 예약',
      desc: '출입국 관리 사무소에 상담 예약을 하여 필요한 정보를 미리 확인하세요.',
    },
    {
      title: '비자 연장 신청',
      desc: '정해진 기간 내에 비자 연장 신청서를 작성하여 제출하세요.',
    },
  ],
  fee: '60,000원',
  duration: '약 2~3주',
};

export default function InfoDetailScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[30px] text-[#3d3d3d]">
          정보글
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-20 px-20 pb-32 pt-16"
        showsVerticalScrollIndicator={false}
      >
        {/* 본문 카드 */}
        <View className="gap-15 rounded-xl border border-border-strong/30 bg-background p-18 shadow-sm">
          <View className="gap-[5px] pt-4">
            <Text weight="semibold" className="text-[20px] leading-[30px] text-text-strong">
              {ARTICLE.title}
            </Text>
            <View className="flex-row items-center gap-6">
              <Image source={calendarIcon} style={{ width: 8, height: 9 }} />
              <Text className="text-[10px] leading-[16px] text-[#595c7e]">{ARTICLE.updatedAt}</Text>
            </View>
          </View>

          {/* 핵심 안내 배너 */}
          <View className="flex-row items-center gap-6 rounded-md border border-primary-light/20 bg-primary-light/10 px-[23px] py-4">
            <Image source={infoCircleIcon} style={{ width: 11, height: 11 }} />
            <Text weight="medium" className="flex-1 text-[10px] leading-[20px] text-primary-dark">
              {ARTICLE.notice}
            </Text>
          </View>

          {/* 단계별 가이드 */}
          <View>
            {ARTICLE.steps.map((step, index) => {
              const isLast = index === ARTICLE.steps.length - 1;
              return (
                <View key={step.title} className="flex-row gap-16 pt-15">
                  <View className="items-center">
                    <View className="h-32 w-32 items-center justify-center rounded-full bg-primary shadow-sm">
                      <Text weight="bold" className="text-[12px] leading-[16px] text-white">
                        {index + 1}
                      </Text>
                    </View>
                    {!isLast ? <View className="w-[2px] flex-1 bg-[#dee4e0]" /> : null}
                  </View>
                  <View className="flex-1 gap-4 pb-4">
                    <Text weight="semibold" className="text-[14px] leading-[20px] text-text-strong">
                      {step.title}
                    </Text>
                    <Text weight="medium" className="text-[13px] leading-[20px] text-[#595c7e]">
                      {step.desc}
                    </Text>
                    {step.tags ? (
                      <View className="flex-row gap-8 pt-4">
                        {step.tags.map((tag) => (
                          <View key={tag} className="rounded-sm bg-background-muted px-8 py-[3px]">
                            <Text weight="medium" className="text-[11px] leading-[16.5px] text-[#595c7e]">
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 수수료 / 처리 기간 카드 */}
        <View className="flex-row gap-14">
          <View className="flex-1 gap-8 rounded-lg border border-border-strong/20 bg-background p-17 shadow-sm">
            <Image source={feeIcon} style={{ width: 22, height: 16 }} />
            <Text weight="semibold" className="text-[12px] leading-[16px] text-[#595c7e]">
              예상 수수료
            </Text>
            <Text weight="medium" className="text-[16px] leading-[24px] text-text-strong">
              {ARTICLE.fee}
            </Text>
          </View>
          <View className="flex-1 gap-8 rounded-lg border border-border-strong/20 bg-background p-17 shadow-sm">
            <Image source={durationIcon} style={{ width: 17, height: 20 }} />
            <Text weight="semibold" className="text-[12px] leading-[16px] text-[#595c7e]">
              처리 기간
            </Text>
            <Text weight="medium" className="text-[16px] leading-[24px] text-text-strong">
              {ARTICLE.duration}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 액션 버튼 */}
      <View className="flex-row gap-8 px-20 pb-20 pt-8">
        <Pressable
          className="h-56 flex-1 items-center justify-center rounded-lg border border-primary"
          onPress={() => router.push('/info/edit-request')}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-primary">
            정보 수정 요청하기
          </Text>
        </Pressable>
        <Pressable className="h-56 flex-[1.15] items-center justify-center rounded-lg bg-primary">
          <Text weight="semibold" className="text-[17px] leading-[22px] text-white">
            링크로 접속하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
