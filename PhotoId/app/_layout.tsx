import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from '@/store';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Text } from 'react-native';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="pin-screen" options={{ headerShown: false }} />
            <Stack.Screen name="license-details" options={{ headerShown: false }} />
            <Stack.Screen name="share-alert" options={{ headerShown: false }} />
            <Stack.Screen name="alert-preview" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
