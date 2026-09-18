import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { Colors } from '../src/constants/theme';

export default function StartScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.bg }}>
        <ActivityIndicator color={Colors.volt} />
      </View>
    );
  }

  return <Redirect href={user ? '/(tabs)' : '/auth/sign-in'} />;
}
