import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/src/components/Text';

const chevronLeftIcon = require('@/assets/icons/icon-chevron-left.svg');
const checkIcon = require('@/assets/icons/icon-check.svg');

const DEFINITIONS = [
  { term: '서비스', desc: '회사가 제공하는 HelloMate 어플리케이션 및 웹사이트를 통한 모든 기능' },
  { term: '이용자', desc: '본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원' },
  { term: '회원', desc: '회사에 개인정보를 제공하여 수집 동의를 거친 후 아이디를 부여받은 자' },
];

export default function SignUpTermsScreen() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 영역 */}
      <View className="flex-row items-center gap-10 border-b border-border bg-background px-20 py-20">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Image source={chevronLeftIcon} style={{ width: 9, height: 17 }} />
        </Pressable>
        <Text weight="semibold" className="text-[20px] leading-[1.5] text-[#3d3d3d]">
          서비스 이용약관
        </Text>
      </View>

      <ScrollView className="flex-1 px-20 pt-16">
        {/* 소개 영역 */}
        <View className="gap-16 rounded-md border border-border-strong/10 bg-white p-17 shadow-sm">
          <Text weight="medium" className="text-[15px] leading-[20px] text-text">
            HelloMate 서비스를 이용해 주셔서 감사합니다. 본 약관은 HelloMate가 제공하는 각종 서비스의 이용조건 및
            절차에 관한 기본적인 사항을 규정합니다.
          </Text>
          <View className="self-start rounded-[6px] bg-primary-light/10 px-8 py-4">
            <Text weight="medium" className="text-[10px] leading-[16px] text-primary">
              시행일: 2024년 5월 20일
            </Text>
          </View>
        </View>

        {/* 약관 조항 영역 */}
        <View className="gap-40 pt-24">
          <View className="gap-16">
            <View className="flex-row items-center gap-8">
              <View className="h-24 w-4 rounded-full bg-primary" />
              <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
                1. 목적
              </Text>
            </View>
            <Text weight="medium" className="text-[13px] leading-[22.75px] text-text">
              {'이 약관은 HelloMate(이하 "회사")가 운영하는 모바일 애플리케이션 및 관련 제반 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.'}
              {'\n\n'}
              HelloMate는 국제 학생들의 한국 생활 적응을 돕고 건강한 커뮤니티 형성을 지원하기 위해 최선을 다합니다.
            </Text>
          </View>

          <View className="gap-16">
            <View className="flex-row items-center gap-8">
              <View className="h-24 w-4 rounded-full bg-primary" />
              <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
                2. 용어의 정의
              </Text>
            </View>
            <View className="gap-16 rounded-md bg-background-subtle p-16">
              {DEFINITIONS.map(({ term, desc }) => (
                <View key={term} className="flex-row gap-8">
                  <Text weight="medium" className="w-80 text-[13px] leading-[20px] text-text-strong">
                    {term}
                  </Text>
                  <Text weight="medium" className="flex-1 text-[13px] leading-[20px] text-text">
                    {desc}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="gap-16">
            <View className="flex-row items-center gap-8">
              <View className="h-24 w-4 rounded-full bg-primary" />
              <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
                3. 약관의 게시와 개정
              </Text>
            </View>
            <Text weight="medium" className="text-[13px] leading-[20px] text-text">
              ① 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
              {'\n\n'}
              {'② 회사는 "콘텐츠산업 진흥법", "전자상거래 등에서의 소비자보호에 관한 법률", "약관의 규제에 관한 법률" 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.'}
              {'\n\n'}
              ③ 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 내에 그 적용일자 7일
              전부터 공지합니다.
            </Text>
          </View>

          <View className="gap-16">
            <View className="flex-row items-center gap-8">
              <View className="h-24 w-4 rounded-full bg-primary" />
              <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
                4. 서비스의 제공 및 변경
              </Text>
            </View>
            <View className="gap-16">
              <View className="gap-4 rounded-md border border-border-strong/30 bg-white p-17">
                <Text weight="medium" className="text-[15px] leading-[20px] text-text-strong">
                  공지사항 및 정보제공
                </Text>
                <Text weight="medium" className="text-[13px] leading-[20px] text-text">
                  생활 정보, 학사 일정 및 커뮤니티 업데이트 알림 서비스
                </Text>
              </View>
              <View className="gap-4 rounded-md border border-border-strong/30 bg-white p-17">
                <Text weight="medium" className="text-[15px] leading-[20px] text-text-strong">
                  커뮤니티 및 소모임
                </Text>
                <Text weight="medium" className="text-[13px] leading-[20px] text-text">
                  국제 학생 간의 교류를 위한 자유게시판 및 클럽 활동 지원
                </Text>
              </View>
              <Text weight="medium" className="px-4 text-[13px] leading-[20px] text-text">
                ※ 회사는 기술적 사양의 변경이나 운영상의 사유로 서비스의 내용을 변경하거나 중단할 수 있으며, 이 경우
                공지사항을 통해 사전 통지합니다.
              </Text>
            </View>
          </View>

          <View className="gap-16 pb-24">
            <View className="flex-row items-center gap-8">
              <View className="h-24 w-4 rounded-full bg-primary" />
              <Text weight="semibold" className="text-[17px] leading-[22px] text-text-strong">
                5. 이용계약의 성립
              </Text>
            </View>
            <Text weight="medium" className="text-[13px] leading-[20px] text-text">
              이용계약은 이용자가 약관의 내용에 대하여 동의를 하고 회원가입 신청을 한 후 회사가 이러한 신청에 대하여
              승낙함으로써 체결됩니다.
              {'\n\n'}
              회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
              {'\n\n'}
              {'· 실명이 아니거나 타인의 명의를 이용한 경우\n· 허위의 정보를 기재하거나 회사가 제시하는 내용을 기재하지 않은 경우\n· 이용자의 귀책사유로 인하여 승인이 불가능한 경우'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 동의 영역 */}
      <View className="gap-12 border-t border-border bg-white p-20">
        <Pressable onPress={() => setAgreed((prev) => !prev)} className="flex-row items-center gap-12">
          <View
            className={`h-20 w-20 items-center justify-center rounded-[4px] border ${
              agreed ? 'border-primary bg-primary' : 'border-border-strong bg-white'
            }`}
          >
            {agreed && <Image source={checkIcon} style={{ width: 12, height: 12 }} />}
          </View>
          <Text weight="medium" className="text-[14px] leading-[20px] text-text-strong">
            위 약관을 모두 읽었으며 이에 동의합니다.
          </Text>
        </Pressable>
        <Pressable
          disabled={!agreed}
          className={`h-52 items-center justify-center rounded-lg ${agreed ? 'bg-primary' : 'bg-border-strong'}`}
          onPress={() => router.back()}
        >
          <Text weight="medium" className={`text-[18px] leading-[24px] ${agreed ? 'text-white' : 'text-text'}`}>
            확인
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
