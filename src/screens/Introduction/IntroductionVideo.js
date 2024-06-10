import {Dimensions, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import video from '../../assets/videos/intro-video.mp4';

const IntroductionVideo = () => {
  const videoPlayer = useRef(null);
  const navigation = useNavigation();

  const handleEnd = () => {
    navigation.replace('Intro Info');
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoPlayer}
        source={video}
        style={styles.video}
        resizeMode="contain"
        onEnd={handleEnd}
      />
    </View>
  );
};

export default IntroductionVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
