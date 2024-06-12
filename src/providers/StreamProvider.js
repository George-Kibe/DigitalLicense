import React, {useEffect} from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {useSelector} from 'react-redux';

const apiKey = '67crtw84yr65';
export const client = new StreamVideoClient({apiKey});

export const StreamClientProvider = ({children}) => {
  const loggedUser = useSelector(state => state?.user?.loggedUser) || null;

  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    const {mongoUser} = loggedUser || null;
    if (!mongoUser?._id) {
      return;
    }
    const fetchToken = async () => {
      try {
        const response = await fetch(
          `https://cm6ynw5bgj7vh4v3teiij4t6om0ggqct.lambda-url.ap-southeast-2.on.aws/?id=${mongoUser?._id}`,
        );
        if (response.status === 200) {
          const {token} = await response.json();
          // console.log('Token: ', token);
          client.disconnectUser();
          client.connectUser({id: mongoUser._id}, token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, [loggedUser]);

  return <StreamVideo client={client}>{children}</StreamVideo>;
};
