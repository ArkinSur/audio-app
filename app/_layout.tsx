import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AudioProvider } from '@/contexts/AudioContext';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <AudioProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </AudioProvider>
  );
}
