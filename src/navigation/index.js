import React, {useState} from 'react';
import StackNavigator from './StackNavigator';

import AccountsNavigation from './AccountsNavigation';
import {useSelector} from 'react-redux';
import {useAuthProvider} from '../providers/AuthProvider';

export default function MainNavigator() {
  const {session} = useAuthProvider();
  console.log('session', session?.userSub);

  if (!session?.userSub) {
    return <AccountsNavigation />;
  }
  return <StackNavigator />;
}
