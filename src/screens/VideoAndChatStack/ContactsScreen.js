/* eslint-disable react-native/no-inline-styles */
import {Text, FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStreamVideoClient} from '@stream-io/video-react-native-sdk';
import {generateRandomString} from '../../utils/generateRandomString';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useChatContext} from 'stream-chat-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactsScreen = () => {
  const navigation = useNavigation();
  const {mongoUser} = useSelector(state => state.user.loggedUser);
  const [profiles, setProfiles] = useState([
    {id: '66683f7a352df660f4988757', name: 'George Kibe'},
    {id: 'TestUser', name: 'Test User'},
  ]);
  const client = useStreamVideoClient();
  const {client: chatClient} = useChatContext();

  // creating a call with a random id
  const createVideoCall = user => {
    if (!client) {
      return;
    }
    const callId = generateRandomString(20);
    console.log('Creating a call with id: ', callId);

    try {
      client.call('default', callId).getOrCreate({
        ring: true,
        data: {
          members: [{user_id: mongoUser?._id}, {user_id: user.id}],
        },
      });
      navigation.navigate('call');
    } catch (error) {
      console.log('Failed to create a call', error.message);
    }
  };
  // creating a chat channel with a random id
  const createChatChannel = async user => {
    //start a chat with him
    const channel = chatClient.channel('messaging', {
      members: [mongoUser._id, user.id],
    });
    await channel.watch();
    navigation.navigate('single-chat', {channel: channel});
  };

  return (
    <FlatList
      data={profiles}
      contentContainerStyle={{backgroundColor: 'black', flex: 1}}
      renderItem={({item, index}) => (
        <View style={styles.singleContactView}>
          <Text
            style={{
              padding: 10,
              margin: 5,
              color: 'white',
              fontSize: 16,
            }}>
            {index + 1}. {item.name}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => createVideoCall(item)}
              style={[styles.iconView, {backgroundColor: '#6E2F9F'}]}>
              <View style={[styles.iconView, {backgroundColor: '#610294'}]}>
                <Ionicons name="videocam" size={30} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => createChatChannel(item)}
              style={[styles.iconView, {backgroundColor: '#00AA54'}]}>
              <View style={[styles.iconView, {backgroundColor: '#00D144'}]}>
                <Ionicons name="chatbox-ellipses" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  singleContactView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 20,
  },
  iconView: {
    //backgroundColor: '#6EB8F2',
    padding: 3,
    borderRadius: 50,
  },
});
