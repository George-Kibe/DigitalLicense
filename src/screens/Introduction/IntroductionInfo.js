/* eslint-disable react-native/no-inline-styles */
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Logo from '../../assets/logos/i-logo.png';
import Logo1 from '../../assets/logos/i-logo-name.png';
import EnjoyLogo from '../../assets/intro/enjoy-logo.png';
import Video from 'react-native-video';
import videoTutorial from '../../assets/videos/revised_tutorial.mp4';

import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
console.log('Width:', width);
//console.log('Height:', height);

import Animated, {
  FadeIn,
  FadeOut,
  BounceInRight,
  SlideOutLeft,
  BounceOutLeft,
  SlideInRight,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import NavBarGeneral from '../../components/NavBarGeneral';
import Toast from 'react-native-toast-message';

const onboardingSteps = [
  {
    icon: 'snowflake',
    image: Logo,
    title: 'Welcome to myIceBreaker',
    description:
      'With myIceBreaker you will be able to connect discreetly with people around youwithout the need of knowing their contact details or approcahing them personally. \n' +
      'You will also know if they are interested in meeting you or not in advance \n' +
      'All from your mobile device will remain private and unknown to anybody but yourself \n' +
      'IN 3 SIMPLE STEPS \n\n',
  },
  {
    icon: 'people-arrows',
    image: Logo1,
    title: 'Using myIceBreaker',
    description:
      '1. Create an avatar of yourself \n' +
      '2. Check in at your current venue or location \n' +
      '3. Create an avatar of the person you are interested in meeting \n' +
      'Its just as simple as that!!! \n' +
      'Leave the rest to us \n\n',
  },
  {
    icon: 'book-reader',
    image: Logo1,
    title: 'Explanation continued...',
    description:
      'If the person you are interested to meet is interested in meeting you and had already made an avatar of you before, then you have a match and both can text or call in the app \n' +
      'Otherwise, you can decide to keep your interest open in case that person makes an avatar of you at alater stageor you can withdraw your interest immediately. \n\n',
  },
  {
    icon: 'book-reader',
    image: Logo,
    title: 'Explanation continued...',
    description:
      ' Also you can choose to withdraw your interest at a set time or upon leaving the venue (Only Premium members can do this) \n' +
      'Premium members can also choose to send an anonymous notification to the person of interest saying that someone is interested in them and invite them to create avatars of other people and find out who that person might be \n\n',
  },
  {
    icon: 'book-reader',
    index: 'video',
    // image: Logo,
    title: 'Usage Tutorial',
  },
  {
    icon: 'book-reader',
    index: 'last',
    image: EnjoyLogo,
    title: '',
  },
];
const Stack = createStackNavigator();

const IntroductionInfo = () => {
  const navigation = useNavigation();
  const videoPlayer = useRef(null);
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];
  const handlePlayEnd = () => {
    Toast.show({
      type: 'info',
      text1: 'Thank you for going through the tutorial',
      text2: 'All the best!',
    });
    videoPlayer.current.seek(0);
  };

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };
  const onPrevious = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      return;
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    // setScreenIndex(0);
    navigation.replace('Accounts General');
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{headerShown: false}} />
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {backgroundColor: index === screenIndex ? 'black' : 'black'},
            ]}
          />
        ))}
      </View>
      <NavBarGeneral
        leftButton={{display: true, action: onPrevious}}
        leftText="BACK"
        title={'Welcome to myIceBreaker'}
        rightButton={{display: true, action: onContinue}}
        rightText="NEXT"
      />

      <GestureDetector gesture={swipes}>
        <ScrollView style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {data.index !== 'video' && (
              <Animated.Image
                entering={BounceInRight}
                exiting={BounceOutLeft}
                style={[
                  styles.image,
                  width > 600 && {width: 100, height: 100},
                  data.index === 'last' && {
                    width,
                    height: height * 0.7,
                    alignSelf: 'center',
                  },
                ]}
                source={data.image}
              />
            )}
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}>
              {data.title}
            </Animated.Text>
            {data.index === 'video' && (
              <View style={styles.videoContainer}>
                <Video
                  ref={videoPlayer}
                  source={videoTutorial}
                  style={styles.video}
                  resizeMode="contain"
                  onEnd={handlePlayEnd}
                />
              </View>
            )}
          </Animated.View>
          <Animated.Text
            entering={SlideInRight.delay(50)}
            exiting={SlideOutLeft}
            style={[styles.description, width > 600 && {fontSize: 30}]}>
            {data.description}
          </Animated.Text>

          {/* <Pressable onPress={onContinue} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable> */}
        </ScrollView>
      </GestureDetector>
      <View style={styles.button}>
        <Text
          onPress={endOnboarding}
          style={[styles.buttonText, width > 600 && {fontSize: 30}]}>
          Skip
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default IntroductionInfo;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#15141A',
  },
  pageContent: {
    // padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  title: {
    color: '#FDFDFD',
    fontSize: 36,
    textAlign: 'center',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    color: '#FDFDFD',
    fontSize: 16,
    lineHeight: 28,
  },
  buttonsRow: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    borderRadius: 50,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#302E38',
    position: 'absolute',
    bottom: 10,
    left: 5,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'flex-start',
    // flex: 1,
  },
  topButton: {
    backgroundColor: '#302E38',
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,

    padding: 15,
    paddingHorizontal: 25,
  },

  // steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  videoContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  video: {
    width,
    height: height,
    marginTop: 0,
    alignSelf: 'center',
  },
});
