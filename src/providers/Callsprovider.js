/* eslint-disable react/react-in-jsx-scope */

/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {useCalls} from '@stream-io/video-react-native-sdk';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useEffect} from 'react';
import {Pressable, Text} from 'react-native';

export function CallsProvider({children}) {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const calls = useCalls();
  const call = calls[0];

  useEffect(() => {
    if (calls.length > 0) {
      navigation.navigate('video-and-chat', {screen: 'call'});
    }
  }, [calls]);
  const isOnCallScreen = false;

  return (
    <>
      {children}
      {call && !isOnCallScreen && (
        <Pressable
          onPress={() =>
            navigation.navigate('video-and-chat', {screen: 'call'})
          }
          style={{
            position: 'absolute',
            backgroundColor: 'lightgreen',
            top: top + 40,
            left: 0,
            right: 0,
            padding: 10,
          }}>
          <Text>
            Call: {call.id} ({call.state.callingState})
          </Text>
        </Pressable>
      )}
    </>
  );
}
