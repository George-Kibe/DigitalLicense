import React from 'react';
import CustomButton from '../CustomButton';
import Toast from 'react-native-toast-message';
import {signInWithRedirect} from 'aws-amplify/auth';
import {fetchAuthSession} from 'aws-amplify/auth';
import AppleLogo from '../../assets/logos/apple-logo-.png';
import EmailLogo from '../../assets/logos/email-icon.png';
import GoogleLogo from '../../assets/logos/google-logo.png';
import FaceBookLogo from '../../assets/logos/facebook.png';
import {useNavigation} from '@react-navigation/native';
import {useAuthProvider} from '../../providers/AuthProvider';

const SocialSignInButtons = () => {
  const navigation = useNavigation();
  const {setSession} = useAuthProvider();
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
      await signInWithRedirect({provider: 'google'});
      const authSession = await fetchAuthSession();
      Toast.show({
        type: 'success',
        text1: 'Successfully Logged In',
        text2: 'Welcome, you have successfully Logged In',
        visibilityTime: 5000,
      });
      // console.log('auth session: ', authSession);
      setSession(authSession);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Some Error occured. try Again',
        text2: 'Some Error occured. try Again',
        visibilityTime: 5000,
      });
      console.log('error signing in with google: ', error);
    }
  };
  const onSignInEmail = () => {
    navigation.navigate('SignIn Email');
  };

  const onSignInApple = async () => {
    try {
      await signInWithRedirect({provider: 'signInWithApple'});
      const authSession = await fetchAuthSession();
      console.log('auth session: ', authSession);
      setSession(authSession);
    } catch (error) {
      console.log('error signing in with Apple: ', error);
      Toast.show({
        type: 'error',
        text1: 'Some Error occured. try Again',
        text2: 'Some Error occured. try Again',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <>
      <CustomButton
        text="Apple"
        onPress={onSignInFacebook}
        bgColor="#e3e3e3"
        fgColor="#363636"
        image={AppleLogo}
      />
      {/* <CustomButton
        text="Email"
        onPress={onSignInEmail}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        image={EmailLogo}
      /> */}
      <CustomButton
        text="Google"
        onPress={onSignInFacebook}
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
