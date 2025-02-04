import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
         name="loan-options/add"
        options={{
          title: 'Add Record',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-circle-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
         name="history"
        options={{
          title: 'Records',
          tabBarIcon: ({ color }) => <Fontisto name="history" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
