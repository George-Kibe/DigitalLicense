import {Dimensions, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import React, {useRef} from 'react';
import MatchVideo from '../../assets/videos/match.mp4';
import TryAgainVideo from '../../assets/videos/try-again.mp4';

const LoadingVideo = ({type, setModalVisible, setLoading}) => {
  const videoPlayer = useRef(null);
  const handleEnd = () => {
    setModalVisible(true);
    setLoading(false);
    console.log('video ended');
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoPlayer}
        source={MatchVideo}
        style={styles.video}
        resizeMode="contain"
        onEnd={handleEnd}
        // Other video properties can be added here
      />
    </View>
  );
};

export default LoadingVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '80%',
    height: '100%',
  },
});
