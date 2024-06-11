import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import LinearGradient from 'react-native-linear-gradient';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {signUp} from 'aws-amplify/auth';
import Toast from 'react-native-toast-message';
import NavBarGeneral from '../../components/NavBarGeneral';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

  const onRegisterPressed = async () => {
    console.log('Registering user');
    if (password !== password2) {
      Toast.show({
        type: 'error',
        text1: 'Passwords Do Not Match!',
        text2: 'Passwords Do Not Match!',
      });
      return;
    }
    if (!isChecked) {
      Toast.show({
        type: 'error',
        text1: 'You Need to Read Agree to our Terms and Conditions',
        text2: 'You Need to Read Agree to our Terms and Conditions',
      });
      return;
    }
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing email and/or password',
        text2: 'Missing email and/or password',
      });
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    const body = {email, password};
    try {
      const response = await axios.post(
        'https://myicebreaker.vercel.app/api/users',
        body,
      );
      // console.log('Response: ', response.data);
      if (response.status === 201) {
        const id = response.data._id.toString();
        const username = response.data.username;

        // console.log(username, password, email, id);
        await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              name: username,
              given_name: username,
              'custom:mongoID': id,
            },
          },
        });
        navigation.navigate('Confirm Email', {
          confirmEmail: email,
          id: id,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Sign Up Error!',
          text2: 'Some Error Occured! Try Again',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Sign Up Error!',
        text2: 'Some error occured or Email Already Exists!',
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const onTermsOfUsePressed = () => {
    navigation.navigate('Terms Of Use');
    // console.warn('onTermsOfUsePressed');
  };

  const goToLogin = () => {
    navigation.navigate('SignIn Email');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NavBarGeneral
        leftButton={{display: true}}
        leftText="Back"
        rightButton={{display: true, action: goToLogin}}
        rightText="Login"
      />
      <Text style={styles.topTitle}>MEET ANYBODY ANYWHERE</Text>
      <LinearGradient
        colors={['#708090', '#D3D3D3', '#708090']}
        style={styles.gradientView}>
        <View style={styles.inputsView}>
          <Text style={styles.title}>NEW USER REGISTRATION</Text>
          <CustomInput
            name="email"
            setValue={setEmail}
            control={control}
            keyboardType="email-address"
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is Invalid'},
            }}
          />

          <CustomInput
            name="password"
            setValue={setPassword}
            control={control}
            placeholder="Password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            setValue={setPassword2}
            control={control}
            placeholder="Repeat Password"
            secureTextEntry
          />
          <View style={styles.CheckBoxView}>
            <TouchableOpacity
              onPress={() => setChecked(!isChecked)}
              style={styles.checkview}>
              {isChecked ? (
                <FontAwesome name="check" size={20} color="black" />
              ) : null}
            </TouchableOpacity>
            <Text style={styles.text}>
              Accept Our Terms and Conditions{' '}
              <Text style={styles.link} onPress={onTermsOfUsePressed}>
                (Read)
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.registerView}
            onPress={handleSubmit(onRegisterPressed)}>
            <Text style={styles.registerText}>
              {loading ? 'Loading...' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Text style={styles.bottomTitle}>REGISTER WITH</Text>
      <Text style={styles.bottomText}>or</Text>
      <Text style={styles.bottomText}>Login to an account with</Text>

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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E7E7E7',
    margin: 10,
  },
  topTitle: {
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: '400',
    color: 'white',
  },
  inputsView: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    paddingVertical: 0,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderColor: 'white',
    width: '90%',
  },
  text: {
    color: 'black',
    marginVertical: 10,
    marginLeft: 10,
  },
  CheckBoxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkview: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerView: {
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 10,
  },
  registerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomTitle: {
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

export default SignUpScreen;
