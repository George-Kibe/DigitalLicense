import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import {fetchAuthSession, getCurrentUser} from 'aws-amplify/auth';
import {useDispatch} from 'react-redux';
import {authSlice} from '../../store/AuthSlice';
import {ActivityIndicator} from 'react-native-paper';

const checkInSteps = [
  {name: 'Primary Screen'},
  {name: 'Avatar Screen'},
  {name: 'Location Screen'},
  {name: 'Greeting Screen'},
];
const {height} = Dimensions.get('window');
const Stack = createStackNavigator();

const LocationCheckIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mongoUser, setMongoUser] = useState(null);
  const [checkIn, setCheckIn] = useState('');

  const [screenIndex, setScreenIndex] = useState(0);

  const data = checkInSteps[screenIndex];
  const isLastScreen = screenIndex === checkInSteps.length - 1;

  const getOrCreateUser = async () => {
    console.log('Getting or creating user');
    const user = await getCurrentUser();
    // const session = await fetchAuthSession();
    // console.log('session: ', session);
    console.log('user: ', user);
    const {loginId: email} = user.signInDetails;
    console.log('email: ', email);
    if (!email) {
      return;
    }
    try {
      const response = await axios.get(
        `https://www.myicebreaker.com.au/api/users/${email}`,
      );
      if (response.status === 404) {
        // create user
        console.log('creating a new user');
        const body = {email: email.toLowerCase(), password: 'password'};
        const signUpResponse = await axios.post(
          'https://www.myicebreaker.com.au/api/users',
          body,
        );
        console.log('Sign up response: ', signUpResponse.data);
        dispatch(
          authSlice.actions.addLoggedInUser({
            user: user,
            mongoUser: signUpResponse.data,
          }),
        );
      } else {
        setMongoUser(response.data);
        dispatch(
          authSlice.actions.addLoggedInUser({
            user: user,
            mongoUser: response.data,
          }),
        );
      }
      console.log('Get response: ', response.data);
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  useEffect(() => {
    getOrCreateUser();
  }, []);

  const membershipType = mongoUser?.membershipType;
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
  if (!mongoUser) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{headerShown: false}} />
      <View style={styles.stepIndicatorContainer} />

      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {data.name === 'Primary Screen' && (
              <PrimaryScreen
                mongoUser={mongoUser}
                setScreenIndex={setScreenIndex}
              />
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

          <View style={styles.footer}>
            <AvaLocGreeting
              activeScreen={data.name}
              setScreenIndex={setScreenIndex}
            />
            <View style={styles.dotsView}>
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
    minHeight: height,
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
    gap: 10,
    marginTop: 'auto',
    marginBottom: 10,
    width: '100%',
    display: 'flex',
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
