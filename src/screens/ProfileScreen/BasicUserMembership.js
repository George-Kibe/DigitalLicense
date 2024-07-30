import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BasicImage from '../../assets/logos/standard-logo.png';
import StandardLogo from '../../assets/photos/standardLogo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const BasicUserMemberShip = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>YOUR MEMBERSHIP IS BASIC</Text>
      <ImageBackground
        source={BasicImage}
        imageStyle={styles.imageStyle}
        style={styles.basicFeatures}>
        <TouchableOpacity>
          <Image source={StandardLogo} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.blueText}>Upgrade NOW to STANDARD to access</Text>
        <Text style={styles.blueText}>myIceBreaker core features</Text>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>Send and receive personal greetings</Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>
            Contact by voice call or text of your matches
          </Text>
        </View>
        <View style={styles.feature}>
          <AntDesign name="checksquare" size={24} color="white" />
          <Text style={styles.text}>
            Be notified if someone is interested in you
          </Text>
        </View>
        <Text style={styles.blueText}>ONLY $10 a month paid in advance</Text>
        <Text style={styles.blueText}>(Pay $120 TODAY for one Year)</Text>
        <Text style={styles.blueText}>OR</Text>
        <Text style={styles.blueText}>Pay $12.5 each month ($150 a Year)</Text>
      </ImageBackground>
    </View>
  );
};

export default BasicUserMemberShip;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginHorizontal: 0,
    flex: 1,
  },
  imageStyle: {
    opacity: 0.05,
  },
  image: {width: '100%', height: 100, resizeMode: 'contain'},
  basicFeatures: {
    backgroundColor: 'black',
    flex: 1,
    padding: 20,
    marginBottom: 50,
  },
  feature: {
    display: 'flex',
    gap: 10,
    marginVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  topText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '800',
    marginVertical: 10,
    fontSize: width > 600 ? 30 : 18,
  },
  text: {
    color: 'white',
    fontSize: width > 600 ? 30 : 16,
  },
  blueText: {
    fontSize: width > 600 ? 30 : 16,
    color: '#007FFF',
    alignSelf: 'center',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
