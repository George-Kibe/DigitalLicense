/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image} from 'react-native';
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
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function HomeBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
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
        name="Home"
        component={HomeScreen}
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
        component={HomeScreen}
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
        component={HomeScreen}
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
        component={HomeScreen}
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
