import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeBottomTabs from './HomeBottomTabs';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home-stack" component={HomeBottomTabs} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
