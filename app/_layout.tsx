import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '../src/constants/theme';
import { AuthProvider } from '../src/context/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => { SplashScreen.hideAsync(); }, []);
  return (
    <GestureHandlerRootView style={{flex:1,backgroundColor:Colors.bg}}>
      <AuthProvider>
      <StatusBar style="light" backgroundColor={Colors.bg} />
      <Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:Colors.bg},animation:'slide_from_right'}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/sign-in" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="legal/privacy" />
        <Stack.Screen name="legal/terms" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="station/[id]" />
        <Stack.Screen name="route/planner" />
        <Stack.Screen name="route/result" />
        <Stack.Screen name="report/[stationId]" />
      </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
