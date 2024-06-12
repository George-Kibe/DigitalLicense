import React, {useState} from 'react';

import {ChannelList} from 'stream-chat-react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ContactsScreen from './ContactsScreen';
import NavBarGeneral from '../../components/NavBarGeneral';

const ChatsHomeScreen = () => {
  const [showChats, setshowChats] = useState(true);
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  const navigation = useNavigation();

  return (
    <>
      <NavBarGeneral
        leftButton={{display: true, action: () => setshowChats(true)}}
        leftText="CHATS"
        rightButton={{display: true, action: () => setshowChats(false)}}
        rightText="CONTACTS"
      />
      {showChats ? (
        <ChannelList
          filters={{members: {$in: [mongoUser?._id]}}}
          onSelect={channel => {
            navigation.navigate('single-chat', {channel: channel});
          }}
        />
      ) : (
        <ContactsScreen />
      )}
    </>
  );
};

export default ChatsHomeScreen;
