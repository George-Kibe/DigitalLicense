/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import NavBarGeneral from '../../components/NavBarGeneral';
import TopImage from '../../assets/photos/party5.png';
import BackgroundImage from '../../assets/photos/party5.png';
import IlogoHorizontal from '../../assets/logos/iLogoHorizontal.png';
import CustomButton from '../../components/CustomButton';

const {width} = Dimensions.get('window');

const AccountsGeneral = ({navigation}) => {
  const goToRegister = () => {
    navigation.navigate('SignUp');
  };

  const goToLogin = () => {
    navigation.replace('SignIn Email');
  };

  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true}}
        leftText="BACK"
        rightButton={{display: true, action: goToRegister}}
        rightText="REGISTER"
      />
      <View style={styles.topView}>
        <Text style={styles.topText}>MEET ANYBODY ANYWHERE</Text>
        <Image
          source={TopImage}
          style={[styles.topImage, width > 600 && {resizeMode: 'contain'}]}
        />
      </View>
      <ImageBackground
        source={BackgroundImage}
        imageStyle={styles.BackgroundImage}>
        <View style={styles.bottomView}>
          <Text style={styles.topText}>WELCOME TO</Text>
          <Image source={IlogoHorizontal} style={styles.logo} />
          <CustomButton
            text="Login"
            onPress={goToLogin}
            bgColor="#e3e3e3"
            fgColor="#363636"
          />
          <CustomButton
            text="Register"
            onPress={goToRegister}
            bgColor="#e3e3e3"
            fgColor="#363636"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
  },
  topView: {
    display: 'flex',
  },
  BackgroundImage: {
    display: 'flex',
    opacity: 0.4,
    flex: 1,
    height: '100%',
    // backgroundColor: 'red',
    marginBottom: 100,
  },
  topImage: {
    alignSelf: 'center',
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  topText: {
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: '400',
    color: 'white',
  },
  bottomView: {
    paddingBottom: 1000,
  },
  logo: {
    width: '50%',
    height: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  bottomText: {
    fontSize: 16,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: '400',
    color: 'white',
  },
});

export default AccountsGeneral;
