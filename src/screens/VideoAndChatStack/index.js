import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatsScreen from './ChatsHomeScreen';
import SingleChatScreen from './SingleChatScreen';
import CallScreen from './CallScreen';

const Stack = createStackNavigator();

function VideoAndChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true}}
      initialRouteName="chats">
      <Stack.Screen
        name="chats"
        options={{headerShown: false}}
        component={ChatsScreen}
      />
      <Stack.Screen
        name="call"
        options={{headerShown: false}}
        component={CallScreen}
      />
      <Stack.Screen name="single-chat" component={SingleChatScreen} />
    </Stack.Navigator>
  );
}

export default VideoAndChatStack;
