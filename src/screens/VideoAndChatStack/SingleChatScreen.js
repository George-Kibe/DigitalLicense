/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {generateRandomString} from '../../utils/generateRandomString';
import {useStreamVideoClient} from '@stream-io/video-react-native-sdk';

const SingleChatScreen = ({route}) => {
  const {mongoUser} = useSelector(state => state?.user?.loggedUser) || null;
  const navigation = useNavigation();
  const channel = route.params.channel;
  const dataList = Object.values(channel?.state?.members);
  const otherUser = dataList.find(user => user.user_id !== mongoUser?._id);
  const members = Object.values(channel?.state?.members).map(user => ({
    user_id: user.user_id,
  }));
  console.log('channel members: ', members);
  const client = useStreamVideoClient();
  const videoCallUser = async id => {
    const callId = generateRandomString(20);
    console.log('Creating a call with id: ', callId);

    try {
      client.call('default', callId).getOrCreate({
        ring: true,
        data: {
          members,
          // members: [{user_id: mongoUser?._id}, {user_id: otherUser.user_id}],
        },
      });
      navigation.navigate('call');
    } catch (error) {
      console.log('Failed to create a call', error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: otherUser?.user?.name ? otherUser.user.name : otherUser.user_id,
      headerRight: () => (
        <Ionicons
          onPress={videoCallUser}
          style={{marginRight: 20}}
          name="call"
          size={30}
          color={'black'}
        />
      ),
    });
  }, [navigation]);

  if (!channel) {
    return <ActivityIndicator />;
  }
  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={['bottom']}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
};

export default SingleChatScreen;
