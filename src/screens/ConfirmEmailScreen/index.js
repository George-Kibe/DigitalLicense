import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import * as Auth from 'aws-amplify/auth';
// import{confirmSignUp} from 'aws-amplify/auth';
import Toast from 'react-native-toast-message';
import NavBarGeneral from '../../components/NavBarGeneral';

const ConfirmEmailScreen = ({route}) => {
  const [email, setEmail] = useState(route?.params?.confirmEmail || '');
  const [code, setCode] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);
  const [resendLoading, setResendCodeLoading] = useState(false);

  const navigation = useNavigation();

  const onConfirmPressed = async () => {
    if (codeLoading) {
      return;
    }
    setCodeLoading(true);
    try {
      await Auth.confirmSignUp({username: email, confirmationCode: code});
      navigation.navigate('SignIn Email');
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Email Confirmation Error!',
        text2: `${e.message}`,
        visibilityTime: 5000,
      });
    }
    setCodeLoading(false);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn Email');
  };

  const onResendPress = async () => {
    if (resendLoading) {
      return;
    }
    setResendCodeLoading(true);
    try {
      const response = await Auth.resendSignUpCode(email);
      // console.log(response)
      Toast.show({
        type: 'success',
        text1: 'Code was resent to your email!',
        text2: 'Check your spam emails as well.',
        visibilityTime: 5000,
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Some Error occured!',
        text2: `${e.message}`,
        visibilityTime: 5000,
      });
    }
    setResendCodeLoading(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NavBarGeneral
        leftButton={{display: true}}
        leftText="Back"
        rightButton={{display: true, action: ''}}
        rightText="Login"
      />
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="Email"
          // control={control}
          placeholder="Email"
          value={email}
          setValue={setEmail}
          rules={{
            required: 'Email is required',
          }}
        />

        <CustomInput
          name="code"
          // control={control}
          setValue={setCode}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text={codeLoading ? 'Loading...' : 'Confirm'}
          onPress={onConfirmPressed}
        />

        <CustomButton
          text={resendLoading ? 'Loading...' : 'Resend code'}
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
});

export default ConfirmEmailScreen;
