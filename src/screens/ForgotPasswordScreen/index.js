import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import * as Auth from 'aws-amplify/auth';
import Toast from 'react-native-toast-message';
import NavBarGeneral from '../../components/NavBarGeneral';

const ForgotPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const onSendPressed = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.resetPassword({username: email});
      navigation.navigate('NewPassword', {username: email});
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Sign Up Error!',
        text2: e.message,
      });
    }
    setLoading(false);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn Email');
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
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="Email"
          control={control}
          setValue={setEmail}
          placeholder="Email"
          rules={{
            required: 'Email is required',
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Send Reset Code'}
          onPress={handleSubmit(onSendPressed)}
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

export default ForgotPasswordScreen;
