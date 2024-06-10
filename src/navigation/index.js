import React, {useEffect} from 'react';
import StackNavigator from './StackNavigator';
import {getCurrentUser} from 'aws-amplify/auth';

export default function MainNavigator() {
  const getUserDetails = async () => {
    const {username, userId, signInDetails} = await getCurrentUser();
    console.log('username', username);
    console.log('user id', userId);
    console.log('sign-in details', signInDetails);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return <StackNavigator />;
}
