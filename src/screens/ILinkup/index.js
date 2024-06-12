import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import YourIceBreakers from './YourIceBreakers';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ilinkup-home">
      <Stack.Screen name="ilinkup-home" component={YourIceBreakers} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
