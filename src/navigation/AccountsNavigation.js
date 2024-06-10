import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// screens
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import IntroductionVideo from '../screens/Introduction/IntroductionVideo';
import AccountsGeneral from '../screens/AccountsGeneral';
import SignInEmailScreen from '../screens/SignInEmailScreen';
import TermsOfUse from '../screens/TermsOfUse';
import WelcomeAndExplanation from '../screens/Introduction/WelcomeAndExplanation';

const Stack = createStackNavigator();

const AccountsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: 'white',
      }}
      initialRouteName="Intro Video">
      <Stack.Screen name="Intro Video" component={IntroductionVideo} />
      <Stack.Screen name="Intro Info" component={WelcomeAndExplanation} />
      <Stack.Screen name="Accounts General" component={AccountsGeneral} />
      <Stack.Screen name="SignIn Email" component={SignInEmailScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Terms Of Use" component={TermsOfUse} />
      <Stack.Screen name="Confirm Email" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AccountsNavigation;
