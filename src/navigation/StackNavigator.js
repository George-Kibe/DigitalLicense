import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeBottomTabs from './HomeBottomTabs';
import LocationCheckIn from '../screens/LocationCheckIn';
import MembershipScreen from '../screens/ProfileScreen/Membership';
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="location-checkin">
      <Stack.Screen name="home-stack" component={HomeBottomTabs} />
      <Stack.Screen name="location-checkin" component={LocationCheckIn} />
      <Stack.Screen name="membership" component={MembershipScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
