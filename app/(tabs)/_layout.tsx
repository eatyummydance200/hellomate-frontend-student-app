import { Tabs } from 'expo-router';

// 화면마다 Figma의 커스텀 BottomNav(pill)를 직접 그리므로 네이티브 탭바는 숨긴다.
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" options={{ title: '공지사항' }} />
      <Tabs.Screen name="community" options={{ title: '커뮤니티' }} />
      <Tabs.Screen name="club" options={{ title: '클럽' }} />
      <Tabs.Screen name="info" options={{ title: '정보' }} />
      <Tabs.Screen name="mypage" options={{ title: '마이페이지' }} />
    </Tabs>
  );
}
