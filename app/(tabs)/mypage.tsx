import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function MyPageScreen() {
  return (
    <View>
      <Text>마이페이지</Text>
      <Link href="/(auth)">인증 화면으로 이동 (임시)</Link>
    </View>
  );
}
