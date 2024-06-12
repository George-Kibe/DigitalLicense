import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import iLinkupHome from './iLinkupHome';
import SendIceBreaker from './SendIceBreaker';
import WishListScreen from './WishScreen';
import MyActivities from './MyActivities';
import GenerateAvatar from './GenerateAvatar';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ilinkup-home">
      <Stack.Screen name="ilinkup-home" component={iLinkupHome} />
      <Stack.Screen name="create-avatar" component={GenerateAvatar} />
      <Stack.Screen name="edit-avatar" component={GenerateAvatar} />
      <Stack.Screen name="send-icebreaker" component={SendIceBreaker} />
      <Stack.Screen name="my-wishes" component={WishListScreen} />
      <Stack.Screen name="my-activities" component={MyActivities} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
