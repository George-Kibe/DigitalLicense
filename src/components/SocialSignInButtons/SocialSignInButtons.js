import React from 'react';
import CustomButton from '../CustomButton';
import Toast from 'react-native-toast-message';
import {signInWithRedirect} from 'aws-amplify/auth';
import AppleLogo from '../../assets/logos/apple-logo-.png';
import EmailLogo from '../../assets/logos/email-icon.png';
import GoogleLogo from '../../assets/logos/google-logo.png';
import FaceBookLogo from '../../assets/logos/facebook.png';
import {useNavigation} from '@react-navigation/native';

const SocialSignInButtons = () => {
  const navigation = useNavigation();
  const onSignInFacebook = () => {
    // signInWithRedirect({provider: 'Facebook'});
    Toast.show({
      type: 'success',
      text1: 'Pending Approval: Coming Soon',
      text2: 'Unfortunately for now you will have to fill the form',
      visibilityTime: 5000,
    });
  };

  const onSignInGoogle = async () => {
    try {
      const response = await signInWithRedirect({provider: 'google'});
      console.log('Google Login Response: ', response);
    } catch (error) {
      console.log('error signing in with google: ', error);
    }
  };
  const onSignInEmail = () => {
    navigation.navigate('SignIn Email');
  };

  const onSignInApple = () => {
    signInWithRedirect({provider: 'signInWithApple'});
  };

  return (
    <>
      <CustomButton
        text="Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        image={AppleLogo}
      />
      <CustomButton
        text="Email"
        onPress={onSignInEmail}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        image={EmailLogo}
      />
      <CustomButton
        text="Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        image={GoogleLogo}
      />
      <CustomButton
        text="Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        image={FaceBookLogo}
      />
    </>
  );
};

export default SocialSignInButtons;
