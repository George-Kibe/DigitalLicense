import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const ProfileLinks = () => {
  const navigation = useNavigation();
  const goToMemberShip = () => {
    navigation.navigate('Profile');
  };
  const goToSettings = () => {
    navigation.navigate('my-profile');
  };
  const goToUserDetails = () => {
    navigation.navigate('location-checkin');
  };
  const goToTutorial = () => {
    navigation.navigate('tutorial');
  };
  const goToAbout = () => {
    // handle navigation to about screen
  };
  const goToHelp = () => {
    navigation.navigate('tutorial');
  };
  const goToTermsAndConditions = () => {
    navigation.navigate('terms-of-use');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToMemberShip} style={styles.button}>
        <Text style={styles.text}>MEMBERSHIP</Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSettings} style={styles.button}>
        <Text style={styles.text}>SETTINGS</Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToTutorial} style={styles.button}>
        <Text style={styles.text}>TUTORIAL</Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToUserDetails} style={styles.button}>
        <Text style={styles.text}>USER DETAILS </Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToAbout} style={styles.button}>
        <Text style={styles.text}>ABOUT</Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToHelp} style={styles.button}>
        <Text style={styles.text}>HELP</Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToTermsAndConditions} style={styles.button}>
        <Text style={styles.text}>TERMS AND CONDITIONS</Text>
        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileLinks;

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    display: 'flex',
    backgroundColor: 'black',
    // alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 700,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 40,
  },
  text: {
    color: 'white',
    fontSize: width > 600 ? 30 : 12,
    fontWeight: 'bold',
  },
});
