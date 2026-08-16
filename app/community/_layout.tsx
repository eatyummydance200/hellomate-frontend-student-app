import { Stack } from 'expo-router';

// 화면마다 Figma의 커스텀 헤더를 직접 그리므로 네이티브 헤더는 숨긴다.
export default function CommunityLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
