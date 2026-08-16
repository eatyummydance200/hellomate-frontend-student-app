import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function AuthScreen() {
  return (
    <View>
      <Text>인증</Text>
      <Link href="/(auth)/signup">회원가입으로 이동</Link>
      <Link href="/(tabs)">메인으로 이동 (임시)</Link>
    </View>
  );
}
