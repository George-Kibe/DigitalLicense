/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Logo1 from '../../assets/logos/iLogo.png';
import Video from 'react-native-video';
import videoTutorial from '../../assets/videos/revised_tutorial.mp4';
import NavBarGeneral from '../../components/NavBarGeneral';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const WelcomeAndExplanation = () => {
  const navigation = useNavigation();
  const [showVideo, setShowVideo] = useState(false);
  const videoPlayer = useRef(null);
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const goToLogin = () => {
    navigation.replace('Accounts General');
  };
  const handlePlayEnd = () => {
    Toast.show({
      type: 'info',
      text1: 'Thank you for going through the tutorial',
      text2: 'All the best!',
    });
    videoPlayer.current.seek(0);
  };
  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: toggleVideo}}
        leftText={showVideo ? 'SHOW TEXT' : 'VIEW VIDEO'}
        title={'Welcome to iLinkup'}
        rightButton={{display: true, action: goToLogin}}
        rightText="NEXT"
      />
      <View>
        <Image
          style={[styles.image, width > 600 && {width: 100, height: 100}]}
          source={Logo1}
        />
      </View>
      {showVideo ? (
        <View>
          <Text style={styles.topText}>Usage Tutorial</Text>
          <View style={styles.videoContainer}>
            <Video
              source={videoTutorial}
              style={styles.video}
              ref={videoPlayer}
              resizeMode="contain"
              onEnd={handlePlayEnd}
            />
          </View>
        </View>
      ) : (
        <ScrollView style={styles.textView}>
          <Text style={styles.topText}>Welcome to iLinkup</Text>
          <Text style={styles.text}>
            With iLinkup you will be able to connect discreetly with people
            around you without the need of knowing their contact details or
            approcahing them personally.
          </Text>
          <Text style={styles.text}>
            You will also know if they are interested in meeting you or not in
            advance All from your mobile device will remain private and unknown
            to anybody but yourself IN 3 SIMPLE STEPS:
          </Text>
          <Text style={styles.text}>
            1. Create an avatar of yourself{'\n'}2. Check in at your current
            venue or venue or location{'\n'}3. Create an avatar of the person
            you are interested in meeting Its just as simple as that!!!{'\n'}
            Leave the rest to us
          </Text>
          <Text style={styles.text}>
            If the person you are interested to meet is interested in meeting
            you and had already made an avatar of you before, then you have a
            match and both can text or call in the app.{'\n'}Otherwise, you can
            decide to keep your interest open in case that person makes an
            avatar of you at alater stageor you can withdraw your interest
            immediately.
          </Text>
          <Text style={styles.text}>
            Also you can choose to withdraw your interest at a set time or upon
            leaving the venue (Only Premium members can do this){'\n'}Premium
            members can also choose to send an anonymous notification to the
            person of interest saying that someone is interested in them and
            invite them to create avatars of other people and find out who that
            person might be
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default WelcomeAndExplanation;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
  },
  topText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  textView: {
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'justify',
    marginVertical: 5,
  },
  videoContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: width,
    height: height * 0.9,
    marginTop: 0,
    alignSelf: 'center',
  },
});
