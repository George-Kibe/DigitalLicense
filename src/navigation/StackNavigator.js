import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeBottomTabs from './HomeBottomTabs';
import LocationCheckIn from '../screens/LocationCheckIn';
import MembershipScreen from '../screens/ProfileScreen/Membership';
import Tutorial from '../screens/Tutorial';
import TermsOfUse from '../screens/TermsOfUse';
import VideoAndChatStack from '../screens/VideoAndChatStack';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="location-checkin">
      <Stack.Screen name="home-stack" component={HomeBottomTabs} />
      <Stack.Screen name="location-checkin" component={LocationCheckIn} />
      <Stack.Screen name="membership" component={MembershipScreen} />
      <Stack.Screen name="tutorial" component={Tutorial} />
      <Stack.Screen name="terms-of-use" component={TermsOfUse} />
      <Stack.Screen name="video-and-chat" component={VideoAndChatStack} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
