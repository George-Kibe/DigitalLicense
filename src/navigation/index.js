import React, {useState} from 'react';
import StackNavigator from './StackNavigator';

import AccountsNavigation from './AccountsNavigation';
import {useAuthProvider} from '../providers/AuthProvider';
import NotificationsProvider from '../providers/NotificationsProvider';
import ChatProvider from '../providers/ChatProvider';
import {StreamClientProvider} from '../providers/StreamProvider';
import {CallsProvider} from '../providers/Callsprovider';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function MainNavigator() {
  const {session} = useAuthProvider();
  console.log('session', session?.userSub);

  if (!session?.userSub) {
    return <AccountsNavigation />;
  }
  return (
    <>
      <ChatProvider>
        <StreamClientProvider>
          <CallsProvider>
            <SafeAreaView style={{flex: 1}}>
              <StackNavigator />
            </SafeAreaView>
          </CallsProvider>
        </StreamClientProvider>
      </ChatProvider>
    </>
  );
}
