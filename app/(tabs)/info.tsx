import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function InfoScreen() {
  return (
    <View>
      <Text>정보</Text>
      <Link href="/notifications">알림 화면으로 이동 (임시)</Link>
    </View>
  );
}
