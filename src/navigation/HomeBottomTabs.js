/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen/Profile';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// bottom icons
import SearchIcon from '../assets/home/Search.png';
import SearchIconBlack from '../assets/home/SearchBlack.png';
import MessageIcon from '../assets/home/Message.png';
import MessageIconBlack from '../assets/home/MessageBlack.png';
import NotificationIcon from '../assets/home/Notification.png';
import NotificationIconBlack from '../assets/home/NotificationBlack.png';
import ProfileIcon from '../assets/home/Profile.png';
import ProfileIconBlack from '../assets/home/ProfileBlack.png';
import ILogo from '../assets/home/iLogo.png';
import ILogoBlack from '../assets/home/iLogoBlack.png';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen/Notifications';
import Ilinkup from '../screens/ILinkup';
import ILinkupHome from '../screens/ILinkupHome';
import VideoAndChatStack from '../screens/VideoAndChatStack';

const Tab = createBottomTabNavigator();

function HomeBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="iLinkup-home"
      screenOptions={{
        tabBarActiveTintColor: '#FF10F0',
        tabBarInactiveTintColor: '#FFFFFF',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#000000',
          paddingBottom: 0,
          height: 40,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="iLinkup-home"
        component={ILinkupHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? SearchIcon : SearchIconBlack}
              color={color}
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="iLinkup"
        component={Ilinkup}
        options={{
          tabBarLabel: 'iLinkup',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? ILogo : ILogoBlack}
              color={color}
              style={{
                width: 40,
                height: 40,
                marginBottom: 6,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={VideoAndChatStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? MessageIcon : MessageIconBlack}
              color={color}
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? NotificationIcon : NotificationIconBlack}
              color={color}
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={focused ? ProfileIcon : ProfileIconBlack}
              color={color}
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeBottomTabs;
