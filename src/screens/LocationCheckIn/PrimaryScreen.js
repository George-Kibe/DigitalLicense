/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackgroundImage from '../../assets/photos/party5.png';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import NavBarGeneral from '../../components/NavBarGeneral';
import axios from 'axios';

const {height} = Dimensions.get('window');

const PrimaryScreen = ({setScreenIndex, mongoUser}) => {
  const [lastLocation, setLastlocation] = useState();
  const APIKEY = 'AIzaSyAZwwdSkH54eXB4s2fh7XOA6wBFjJo3GEg';
  console.log('Mongo User:', mongoUser);
  const navigation = useNavigation();
  const {
    name,
    age,
    gender,
    status,
    children,
    livingWithMe,
    lookingFor,
    interestedIn,
    myAvatars,
    lastLocation: lastLocationId,
  } = mongoUser;
  // const avatar = myAvatars?.length > 0 ? myAvatars[0] : null;
  console.log('Last location: ', lastLocationId);

  const goToMyAvatars = () => {
    setScreenIndex(1);
  };
  const goToLocation = () => {
    setScreenIndex(2);
  };

  const goToGreeting = () => {
    // navigation.navigate('MyProfile');
    setScreenIndex(3);
  };
  const fetchLastLocation = async () => {
    if (!mongoUser.lastLocation) {
      return;
    }
    try {
      const response = await axios.get(
        `https://www.myicebreaker.com.au/api/checkins/${mongoUser.lastLocation}`,
      );
      setLastlocation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLastLocation();
  }, [mongoUser?.lastLocation]);
  console.log('Last Location: ', lastLocation);

  return (
    <ImageBackground
      source={BackgroundImage}
      imageStyle={{opacity: 0.3}}
      style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="CHANGE"
        title="My Location and Details"
        rightButton={{
          display: true,
          action: () => navigation.replace('home-stack'),
        }}
        rightText={'CONFIRM'}
      />
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={goToLocation} style={styles.topView}>
          <View style={styles.iconView}>
            <Feather name="edit-2" size={20} color="black" />
          </View>
          {lastLocation ? (
            <View style={{paddingTop: 5}}>
              <Text style={{color: '#FFFFFF'}}>
                You were last Seen on {lastLocation.checkIn.updatedAt}
              </Text>
              <Text style={{color: '#FFFFFF'}}>
                at {lastLocation.checkIn.name}.
              </Text>
              <View style={styles.locationView}>
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lastLocation.checkIn.photo_reference}&key=${APIKEY}`,
                  }}
                  style={styles.avatar}
                />
                <View
                  style={{
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#FFFFFF'}} numberOfLines={1}>
                    {lastLocation.checkIn.name.substring(0, 20)}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>rated 4 of 5 Stars</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.text}>
              Check in at your {'\n'}Location or Venue Here
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={goToMyAvatars} style={styles.leftView}>
            <View style={styles.iconView}>
              <Feather name="edit-2" size={16} color="black" />
            </View>
            {mongoUser.myAvatars?.length > 0 ? (
              <Image
                source={{uri: mongoUser?.myAvatars[0]}}
                style={styles.avatar}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.text}>Create your {'\n'}First Avatar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGreeting} style={styles.rightView}>
            <View style={styles.iconView}>
              <Feather name="edit-2" size={16} color="black" />
            </View>
            {!age && !gender && !status && !children && !lookingFor ? (
              <Text style={styles.text}>Make your {'\n'}Greeting</Text>
            ) : (
              <Text style={{color: '#FFFFFF', margin: 10}}>
                Hello, its {name}, I am a {age} year old {gender}. I am {status}{' '}
                with {children} children{' '}
                {parseFloat(children) > 0 && livingWithMe
                  ? 'that live with me'
                  : ''}
                {parseFloat(children) > 0 && !livingWithMe
                  ? 'that do not live with me'
                  : ''}
                . I am interested in a {lookingFor} with a {interestedIn}.
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PrimaryScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
  },
  topView: {
    display: 'flex',
    backgroundColor: '#111925',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3B3F47',
    height: height * 0.3,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  iconView: {
    backgroundColor: 'silver',
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 10,
    borderRadius: 20,
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
    paddingRight: 20,
    borderRadius: 10,
    height: 200,
    width: '100%',
  },
  leftView: {
    backgroundColor: '#111925',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B3F47',
    justifyContent: 'center',
    width: '50%',
  },
  rightView: {
    backgroundColor: '#111925',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#3B3F47',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
});
