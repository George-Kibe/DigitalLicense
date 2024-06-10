import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import * as Auth from 'aws-amplify/auth';
import Toast from 'react-native-toast-message';
import NavBarGeneral from '../../components/NavBarGeneral';

const NewPasswordScreen = ({route, navigation}) => {
  const {username} = route?.params || '';
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitPressed = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword: password,
      });
      console.log(response);
      navigation.navigate('SignIn Email');
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Invalid username/code or Password doesnt meet threshold!',
        text2: e.message,
      });
    }
    setLoading(false);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
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
          placeholder="Code"
          name="code"
          control={control}
          setValue={setCode}
          rules={{required: 'Code is required'}}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          setValue={setPassword}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'loading...' : 'Submit'}
          onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen;
