import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BasicImage from '../../assets/logos/premium-logo2.png';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const PremiumUserMembership = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>YOUR MEMBERSHIP IS PREMIUM</Text>
      <ImageBackground
        source={BasicImage}
        imageStyle={styles.imageStyle}
        style={styles.premiumFeatures}>
        <View>
          <Text style={styles.text}>
            Thank you for being a loyal PREMIUM Member
          </Text>
          <Text style={styles.text}>
            At myIceBreaker we value our members and reward them for supporting
            us.
          </Text>
          <Text style={styles.text}>
            For each new Standard or Premium member that you introduce or refer
            to us and have registered for one year in advance they receive 2 or
            3 months of free PREMIUM membership. {'\n'}This is 2 Months if they
            register for Standard and 3 months if they register for Premium
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PremiumUserMembership;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginHorizontal: 0,
    flex: 1,
    padding: 20,
  },
  imageStyle: {
    opacity: 0.2,
    backgroundColor: 'yellow',
    borderRadius: 40,
  },
  premiumFeatures: {
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
    marginVertical: 10,
    fontSize: width > 600 ? 30 : 18,
  },
  text: {
    color: 'white',
    fontSize: width > 600 ? 30 : 16,
    letterSpacing: 2,
    marginBottom: 20,
  },
  text1: {
    color: 'black',
    fontSize: 12,
    lineHeight: 12,
  },
  dollarText: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 1,
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    gap: 40,
  },
});
