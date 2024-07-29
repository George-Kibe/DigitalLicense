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
import BasicImage from '../../assets/logos/standard-logo.png';
import PremiumLogo from '../../assets/photos/premiumLogo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const StandardUserMembership = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>YOUR MEMBERSHIP IS STANDARD</Text>
      <ImageBackground
        source={BasicImage}
        imageStyle={styles.imageStyle}
        style={styles.basicFeatures}>
        <TouchableOpacity>
          <Image source={PremiumLogo} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.yellowText}>Upgrade NOW to PREMIUM to access</Text>
        <Text style={styles.yellowText}>
          myIceBreaker Dating ultimate features
        </Text>
        <View style={{marginVertical: 20}}>
          <View style={styles.feature}>
            <AntDesign name="checksquare" size={24} color="white" />
            <Text style={styles.text}>
              Choose to Keep your interest in non matches open
            </Text>
          </View>
          <View style={styles.feature}>
            <AntDesign name="checksquare" size={24} color="white" />
            <Text style={styles.text}>
              Decide to show or not your avatar to non matches
            </Text>
          </View>
          <View style={styles.feature}>
            <AntDesign name="checksquare" size={24} color="white" />
            <Text style={styles.text}>
              Withdraw interest at a set time or event
            </Text>
          </View>
        </View>
        <Text style={styles.yellowText}>ONLY $20 a month paid in advance</Text>
        <Text style={styles.yellowText}>(Pay $240 TODAY for one Year)</Text>
        <Text style={styles.yellowText}>OR</Text>
        <Text style={styles.yellowText}>Pay $25 each month ($300 a Year)</Text>
      </ImageBackground>
    </View>
  );
};

export default StandardUserMembership;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginHorizontal: 0,
  },
  imageStyle: {
    opacity: 0.05,
  },
  image: {width: '100%', height: 80, resizeMode: 'cover'},
  basicFeatures: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  feature: {
    display: 'flex',
    gap: 10,
    marginVertical: 2,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  topText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '800',
    marginVertical: 10,
    fontSize: width > 600 ? 28 : 16,
  },
  text: {
    color: 'white',
    fontSize: width > 600 ? 30 : 14,
    marginRight: 20,
  },
  yellowText: {
    fontSize: width > 600 ? 30 : 12,
    color: 'gold',
    alignSelf: 'center',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
