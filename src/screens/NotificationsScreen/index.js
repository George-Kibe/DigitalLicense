import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationsScreen from './Notifications';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="All-Notifications">
      <Stack.Screen name="All-Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
