/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#006b55',
        light: '#49c9a7',
        dark: '#00503f',
      },
      text: {
        DEFAULT: '#3d4944', // 본문
        strong: '#171d1a', // 제목
        muted: '#6d7a74', // 날씨, 조회수, 플레이스홀더 등
        inverse: '#ffffff', // primary 배경 위 흰 글자
      },
      background: {
        DEFAULT: '#ffffff',
        subtle: '#eff5f1', // 섹션 구분용
        muted: '#e9efeb', // 비활성 배경
      },
      border: {
        DEFAULT: '#dfdfdf',
        strong: '#bccac3', // 강조
      },
      danger: '#f30707',
    },
    spacing: {
      0: '0px',
      4: '4px', // 아이콘↔라벨 등 최소 간격
      8: '8px', // 가장 많이 쓰는 간격. 카드 내부 요소 사이
      10: '10px', // 리스트 항목 사이
      12: '12px', // 카드 내부 섹션 사이
      16: '16px', // 카드 사이, 블록 사이
      20: '20px', // 카드 내부 패딩
      24: '24px', // 큰 섹션 사이 (
      32: '32px', // 화면 상·하단 여백

      screen: '20px', // Figma: screen/padding
    },

    borderRadius: {
      none: '0px',
      sm: '8px', // 뱃지, 태그, 작은 버튼 (26곳)
      md: '12px', // 기본값. 카드, 입력 필드, 일반 버튼 (119곳)
      lg: '16px', // 큰 카드, 바텀시트 상단 (108곳)
      xl: '20px', // 히어로 카드 등 강조 블록 (31곳)
      full: '9999px', // 아바타, 필 버튼, 상태 뱃지 (116곳)
      //                    정원이 필요하면 RN 에서는 height/2 가 더 안전합니다.
    },

    fontSize: {
      // [ fontSize, lineHeight ]
      micro: ['10px', '15px'], // 하단 탭 라벨. 이보다 작게 쓰지 말 것 (71곳)
      'caption-sm': ['11px', '16px'], // 멤버 수, 카운트 뱃지 (31곳)
      caption: ['12px', '18px'], // 날짜, 조회수, 보조 설명 (109곳)
      label: ['14px', '21px'], // 기본 UI 텍스트. 폼 라벨/버튼/리스트 (209곳, 최다)
      body: ['16px', '26px'], // 긴 본문. 게시글, 약관 (59곳, lineHeight 1.6)
      title: ['17px', '26px'], // 섹션·카드 제목 (67곳)
      display: ['20px', '30px'], // 화면 최상단 타이틀 (67곳)
    },

    fontFamily: {
      sans: ['Pretendard-Regular'],
      medium: ['Pretendard-Medium'],
      semibold: ['Pretendard-SemiBold'],
      bold: ['Pretendard-Bold'],
    },

    extend: {},
  },
  plugins: [],
};
