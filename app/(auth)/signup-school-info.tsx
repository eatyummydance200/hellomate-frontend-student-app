import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/Text';

const searchIcon = require('@/assets/icons/icon-search.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');

const GRADES = ['1학년', '2학년', '3학년', '4학년', '초과 학기', '대학원'];

export default function SignUpSchoolInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ major?: string }>();
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState(GRADES[0]);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    if (params.major) setMajor(params.major);
  }, [params.major]);

  const allAgreed = agreeTerms && agreePrivacy;
  const canVerify = agreeTerms && agreePrivacy;

  const toggleAll = () => {
    const next = !allAgreed;
    setAgreeTerms(next);
    setAgreePrivacy(next);
  };

  return (
    <View className="flex-1 bg-[#f6f8f8]">
      <View className="flex-1 px-24 pt-24">
        {/* 진행 단계 영역 */}
        <View className="gap-8">
          <Text weight="bold" className="text-[18px] leading-[24px] text-primary">
            3 / 3
          </Text>
          <View className="h-4 overflow-hidden rounded-[2px] bg-primary" />
        </View>

        {/* 안내 문구 영역 */}
        <View className="gap-8 pt-23">
          <Text weight="medium" className="text-[20px] leading-[30px] text-text-strong">
            학교 정보를 입력해 주세요.
          </Text>
          <Text weight="medium" className="text-[14px] leading-[20px] text-text">
            전공과 학년에 맞는 공지를 제공하는 데 사용됩니다.
          </Text>
        </View>

        {/* 전공/학년 입력 영역 */}
        <View className="gap-23 pt-23">
          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              전공
            </Text>
            <Pressable
              onPress={() => router.push('/(auth)/signup-major-search')}
              className="h-38 flex-row items-center justify-between rounded-md border border-border-strong bg-white px-13"
            >
              <Text weight="medium" className={`text-[14px] leading-[20px] ${major ? 'text-text-strong' : 'text-text'}`}>
                {major || '전공을 선택하거나 검색하세요'}
              </Text>
              <Image source={searchIcon} style={{ width: 16, height: 16 }} />
            </Pressable>
          </View>

          <View className="gap-8">
            <Text weight="medium" className="text-[14px] leading-[24px] text-text">
              학년
            </Text>
            <View className="flex-row flex-wrap gap-8">
              {GRADES.map((g) => {
                const selected = grade === g;
                return (
                  <Pressable
                    key={g}
                    onPress={() => setGrade(g)}
                    className={`h-31 items-center justify-center rounded-md border-2 px-16 ${
                      selected ? 'border-primary bg-primary-light/10' : 'border-border-strong bg-white'
                    }`}
                  >
                    <Text weight="medium" className={`text-[14px] leading-[16px] ${selected ? 'text-primary' : 'text-text'}`}>
                      {g}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* 약관 동의 영역 */}
        <View className="gap-16 px-4 pt-32">
          <Pressable onPress={toggleAll} className="flex-row items-center gap-12">
            <View
              className={`h-24 w-24 items-center justify-center rounded-md border-2 ${
                allAgreed ? 'border-primary bg-primary' : 'border-border-strong bg-white'
              }`}
            >
              {allAgreed && <Image source={checkIcon} style={{ width: 14, height: 14 }} />}
            </View>
            <Text weight="medium" className="text-[16px] leading-[24px] text-text-strong">
              전체 동의
            </Text>
          </Pressable>

          <View className="h-[1px] bg-border-strong/30" />

          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => setAgreeTerms((prev) => !prev)} className="flex-row items-center gap-12">
              <View
                className={`h-20 w-20 items-center justify-center rounded-[6px] border-2 ${
                  agreeTerms ? 'border-primary bg-primary' : 'border-border-strong bg-white'
                }`}
              >
                {agreeTerms && <Image source={checkIcon} style={{ width: 12, height: 12 }} />}
              </View>
              <Text weight="medium" className="text-[14px] leading-[20px] text-text">
                서비스 이용약관 동의(필수)
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(auth)/signup-terms')}>
              <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted underline">
                보기
              </Text>
            </Pressable>
          </View>

          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => setAgreePrivacy((prev) => !prev)} className="flex-row items-center gap-12">
              <View
                className={`h-20 w-20 items-center justify-center rounded-[6px] border-2 ${
                  agreePrivacy ? 'border-primary bg-primary' : 'border-border-strong bg-white'
                }`}
              >
                {agreePrivacy && <Image source={checkIcon} style={{ width: 12, height: 12 }} />}
              </View>
              <Text weight="medium" className="text-[14px] leading-[20px] text-text">
                개인정보 수집 및 이용 동의(필수)
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(auth)/signup-terms')}>
              <Text weight="medium" className="text-[12px] leading-[16px] text-text-muted underline">
                보기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* 이전/인증하기 버튼 영역 */}
      <View className="flex-row gap-17 px-21 pb-20 pt-8">
        <Pressable
          className="h-56 flex-1 items-center justify-center rounded-lg bg-border-strong"
          onPress={() => router.back()}
        >
          <Text weight="semibold" className="text-[17px] leading-[22px] text-text">
            이전
          </Text>
        </Pressable>
        <Pressable
          disabled={!canVerify}
          className={`h-56 flex-[1.4] items-center justify-center rounded-lg ${canVerify ? 'bg-primary' : 'bg-border-strong'}`}
          onPress={() => router.push('/(auth)/signup-verify')}
        >
          <Text weight="semibold" className={`text-[17px] leading-[22px] ${canVerify ? 'text-white' : 'text-text'}`}>
            인증하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
