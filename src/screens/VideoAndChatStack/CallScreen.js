/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StreamCall,
  useCalls,
  RingingCallContent,
  CallTopView,
} from '@stream-io/video-react-native-sdk';
import {useNavigation} from '@react-navigation/native';

const CallScreen = ({route}) => {
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);
  const calls = useCalls();
  const call = calls[0];

  useEffect(() => {
    if (!call && loaded) {
      navigation.goBack();
      return;
    }
    if (call && !loaded) {
      setLoaded(true);
    }
  }, [call]);

  if (!call) {
    // navigation.goBack();
    return;
  }

  return (
    <View style={styles.container}>
      <StreamCall call={call}>
        <RingingCallContent
          CallTopView={() => <CallTopView title={`ID: ${call.id}`} />}
        />
        {/* <CallContent call={call} /> */}
      </StreamCall>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});
