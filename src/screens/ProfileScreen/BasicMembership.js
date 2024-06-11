import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BasicImage from '../../assets/logos/standard-logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {authSlice} from '../../store/AuthSlice';
const {width} = Dimensions.get('window');

const BasicMemberShip = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  const body = {
    _id: mongoUser._id,
    membershipType: 'Basic',
  };
  // console.log(body);
  const editMembership = async () => {
    setLoading(true);
    console.log(body);
    try {
      const response = await axios.put(
        'https://myicebreaker.vercel.app/api/users',
        body,
      );
      console.log('Update response: ', response.data);
      dispatch(
        authSlice.actions.addLoggedInUser({
          user: user,
          mongoUser: response.data,
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'User Details have been updated successfully',
        text2: response.status,
      });
      navigation.navigate('LocationCheckIn');
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error updating your information!',
        text2: 'Please try again!',
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>A FREE MEMBERSHIP ALLOWS YOU TO:</Text>
      <ImageBackground
        source={BasicImage}
        imageStyle={styles.imageStyle}
        style={styles.basicFeatures}>
        <View style={styles.topRighButton}>
          <Text style={styles.topRighButtonText}>$ 0</Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>Create Your Own Avatar</Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>Check In at Your Location</Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>Create Avatars of people of interest</Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>Send expression of Interest</Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>Receive Notifications of a match</Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="cancel" size={28} color="red" />
          <Text style={styles.text}>Send and receive personal greetings</Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="cancel" size={28} color="red" />
          <Text style={styles.text}>
            Contact by voice call or text of your matches
          </Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="cancel" size={28} color="red" />
          <Text style={styles.text}>
            Be notified if someone is interested in you
          </Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="cancel" size={28} color="red" />
          <Text style={styles.text}>
            Keep your interest in non matches open
          </Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="cancel" size={28} color="red" />
          <Text style={styles.text}>
            Option to show or not show your avatar to non matches
          </Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="cancel" size={28} color="red" />
          <Text style={styles.text}>
            Keep your expression of interest open until a set time or evnt
          </Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.dollarText}>$0 for Life</Text>
          <TouchableOpacity onPress={editMembership} style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : 'Join'}
            </Text>
          </TouchableOpacity>
          <View />
        </View>
        <View style={styles.bottomRighButton}>
          <Text style={styles.bottomRighButtonText}>FREE</Text>
          <Text style={styles.bottomRighButtonText}>for</Text>
          <Text style={styles.bottomRighButtonText}>EVER</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BasicMemberShip;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginHorizontal: 0,
    flex: 1,
  },
  imageStyle: {
    opacity: 0.1,
  },
  basicFeatures: {
    backgroundColor: '#353935',
    flex: 1,
    padding: 20,
    marginBottom: 50,
  },
  feature: {
    display: 'flex',
    gap: 10,
    marginVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  topText: {
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: width > 600 ? 24 : 14,
    fontWeight: '700',
  },
  text: {
    color: 'white',
    fontSize: width > 600 ? 20 : 12,
  },
  dollarText: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 3,
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  topRighButton: {
    backgroundColor: '#E7E7E7',
    position: 'absolute',
    top: 10,
    borderRadius: 50,
    padding: 20,
    right: 10,
  },
  topRighButtonText: {
    fontSize: 20,
    transform: [{rotate: '20deg'}],
    color: 'black',
    fontWeight: '700',
  },
  bottomRighButton: {
    backgroundColor: '#353935',
    position: 'absolute',
    bottom: 10,
    borderRadius: 50,
    padding: 10,
    transform: [{rotate: '20deg'}],
    right: 10,
  },
  bottomRighButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 5,
  },
  button: {
    backgroundColor: '#E7E7E7',
    padding: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    letterSpacing: 5,
    fontWeight: '700',
  },
});
