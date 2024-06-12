import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useRef, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';

const client = StreamChat.getInstance('67crtw84yr65');

const NotificationsProvider = ({children}) => {
  const loggedUser = useSelector(state => state?.user?.loggedUser) || null;
  const unsubscribeTokenRefreshListenerRef = useRef();
  const [isReady, setIsReady] = useState(false);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    const {mongoUser} = loggedUser;
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      unsubscribeTokenRefreshListenerRef.current?.();
      const token = await messaging().getToken();
      const push_provider = 'firebase';
      const push_provider_name = 'Firebase'; // name an alias for your push provider (optional)
      client.addDevice(token, push_provider, mongoUser._id, push_provider_name);
      client.setLocalDevice({
        id: token,
        push_provider,
        // push_provider_name is meant for optional multiple providers support
        push_provider_name,
      });
      await AsyncStorage.setItem('@current_push_token', token);

      const removeOldToken = async () => {
        const oldToken = await AsyncStorage.getItem('@current_push_token');
        if (oldToken !== null) {
          await client.removeDevice(oldToken);
        }
      };

      unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(
        async newToken => {
          await Promise.all([
            removeOldToken(),
            client.addDevice(
              newToken,
              push_provider,
              mongoUser._id,
              push_provider_name,
            ),
            AsyncStorage.setItem('@current_push_token', newToken),
          ]);
        },
      );
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();

      setIsReady(true);
    };

    init();
  }, [loggedUser]);

  if (!isReady) {
    return <Text>Loading Notifications</Text>; // Return null until the registration process completes
  }

  return <>{children}</>;
};

export default NotificationsProvider;
