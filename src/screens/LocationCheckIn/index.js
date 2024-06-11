import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AvatarScreen from './AvatarScreen';

import {
  GestureDetector,
  Gesture,
  Directions,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AvaLocGreeting from '../../components/AvaLocGreeting';
import LocationCheckInScreen from './Location';
import PrimaryScreen from './PrimaryScreen';
import GreetingScreen from './GreetingScreen';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const checkInSteps = [
  {name: 'Primary Screen'},
  {name: 'Avatar Screen'},
  {name: 'Location Screen'},
  {name: 'Greeting Screen'},
];

const Stack = createStackNavigator();

const LocationCheckIn = () => {
  const navigation = useNavigation();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  // console.log('user membership: ', mongoUser.membership);
  // console.log('Mongo user: ', mongoUser);
  const membershipType = mongoUser.membershipType;

  const [checkIn, setCheckIn] = useState('');

  const [screenIndex, setScreenIndex] = useState(0);

  const data = checkInSteps[screenIndex];
  const isLastScreen = screenIndex === checkInSteps.length - 1;

  const onContinue = () => {
    if (isLastScreen) {
      console.log('Last Screen');
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
      return;
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );

  if (!membershipType) {
    navigation.navigate('membership');
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{headerShown: false}} />
      <View style={styles.stepIndicatorContainer} />

      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {data.name === 'Primary Screen' && (
              <PrimaryScreen setScreenIndex={setScreenIndex} />
            )}
            {data.name === 'Avatar Screen' && <AvatarScreen />}
            {data.name === 'Location Screen' && (
              <LocationCheckInScreen
                checkIn={checkIn}
                setCheckIn={setCheckIn}
              />
            )}
            {data.name === 'Greeting Screen' && <GreetingScreen />}
          </Animated.View>

          <AvaLocGreeting
            activeScreen={data.name}
            setScreenIndex={setScreenIndex}
          />
          <View style={styles.footer}>
            <Pressable
              onPress={() => setScreenIndex(0)}
              style={screenIndex === 0 ? styles.activeDot : ''}>
              <View style={styles.dot} />
            </Pressable>
            <Pressable
              onPress={() => setScreenIndex(1)}
              style={screenIndex === 1 ? styles.activeDot : ''}>
              <View style={styles.dot} />
            </Pressable>
            <Pressable
              onPress={() => setScreenIndex(2)}
              style={screenIndex === 2 ? styles.activeDot : ''}>
              <View style={styles.dot} />
            </Pressable>
            <Pressable
              onPress={() => setScreenIndex(3)}
              style={screenIndex === 3 ? styles.activeDot : ''}>
              <View style={styles.dot} />
            </Pressable>
          </View>
        </View>
      </GestureDetector>
    </ScrollView>
  );
};

export default LocationCheckIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  pageContent: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 70,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  title: {
    color: '#FDFDFD',
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    color: '#FDFDFD',
    fontSize: 20,
    lineHeight: 28,
  },
  footer: {
    marginTop: 'auto',
    gap: 10,
    marginBottom: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'white',
    height: 12,
    width: 12,
    padding: 5,
    borderRadius: 8,
  },
  activeDot: {
    padding: 2,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonsRow: {
    backgroundColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    borderRadius: 50,
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#302E38',
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
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
});
