/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import * as Auth from 'aws-amplify/auth';
import NavBarGeneral from '../../components/NavBarGeneral';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {authSlice} from '../../store/AuthSlice';
import axios from 'axios';

const SignInEmailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPressed = async () => {
    if (loading) {
      Toast.show({
        type: 'error',
        text1: 'Please wait for current request to be processed!',
        text2: 'Pending request',
      });
      return;
    }
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Details!',
        text2: 'Ensure you have filled all details!',
      });
      return;
    }
    // validate user
    setLoading(true);
    try {
      const response = await Auth.signIn({username: email, password});
      console.log('Login response: ', response);
      const mongoResponse = await axios.get(
        `https://myicebreaker.vercel.app/api/users/${email.toLowerCase()}`,
      );
      if (response.isSignedIn) {
        // navigation.replace('Home', {Screen: 'Home'});
        dispatch(
          authSlice.actions.addLoggedInUser({
            user: {email: email, data: response},
            mongoUser: mongoResponse.data,
          }),
        );
        // console.log('user is signed in');
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Access has been Denied',
        text2: 'Invalid username or Password',
      });
    }

    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const goToRegister = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NavBarGeneral
        leftButton={{display: true}}
        leftText="Back"
        title={'Login to myIceBreaker'}
        rightButton={{display: true, action: goToRegister}}
        rightText="Register"
      />
      <Text style={styles.topText}>MEET ANYBODY ANYWHERE</Text>
      <LinearGradient
        colors={['#708090', '#D3D3D3', '#708090']}
        style={styles.gradientView}>
        <View style={styles.inputsView}>
          <Text style={styles.title}>USER LOGIN</Text>
          <CustomInput name="Email" placeholder="Email" setValue={setEmail} />
          <Text style={{fontSize: 20}}>Password:</Text>
          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            setValue={setPassword}
          />

          <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.button} onPress={onSignInPressed}>
              <Text style={{color: 'white'}}>
                {loading ? 'Loading...' : 'LOGIN'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'gray'}]}
              onPress={onForgotPasswordPressed}>
              <Text style={{color: 'white'}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <Text style={styles.topText}>LOGIN WITH</Text>
      <Text style={styles.bottomText}>or</Text>
      <Text style={styles.bottomText}>Register an account with</Text>
      <SocialSignInButtons />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  gradientView: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputsView: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: 'white',
    width: '80%',
  },
  topImage: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  topText: {
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: '400',
    color: 'white',
  },
  bottomText: {
    fontSize: 16,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: '400',
    color: 'white',
  },
});

export default SignInEmailScreen;
