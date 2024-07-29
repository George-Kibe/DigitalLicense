import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StreamChat} from 'stream-chat';
import {Chat, OverlayProvider} from 'stream-chat-react-native';
// import type {DeepPartial, Theme} from 'stream-chat-react-native';
const client = StreamChat.getInstance('67crtw84yr65');

const theme = {
  colors: {black: 'black'},
  channel: {
    selectChannel: {color: 'red'},
  },
  messageSimple: {
    file: {
      container: {
        backgroundColor: 'red',
      },
    },
  },
  channelListSkeleton: {
    background: {backgroundColor: 'red'},
  },
  messageList: {
    container: {
      // backgroundColor: 'red',
    },
    // contentContainer: {backgroundColor: 'black'},
  },
};

export default function ChatProvider({children}) {
  const [isReady, setIsReady] = useState(false);

  const loggedUser = useSelector(state => state?.user?.loggedUser) || null;

  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    const {mongoUser} = loggedUser || null;
    if (!mongoUser._id) {
      return;
    }

    const connect = async () => {
      await client.connectUser(
        {
          id: mongoUser?._id,
          name: mongoUser?.username || 'No Name',
          image:
            mongoUser?.myAvatars[0] || 'https://i.ibb.co/MyddYHc/Watch.jpg',
        },
        client.devToken(mongoUser._id),
      );
      setIsReady(true);
    };
    connect();
    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [loggedUser]);

  //   if (!isReady) {
  //     return <ActivityIndicator />;
  //   }
  // value={{style: theme}}

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
