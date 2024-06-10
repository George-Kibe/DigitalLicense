import 'react-native-gesture-handler';
import React from 'react';

import {Button, View, StyleSheet} from 'react-native';

import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react-native';
import MainNavigator from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PermissionsAndroid, Platform, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider as ReduxProvider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {requestNotifications} from 'react-native-permissions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const SignOutButton = () => {
  const {signOut} = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const App = () => {
  return (
    //   <NavigationContainer>
    //     <MainNavigator />
    // </NavigationContainer>
    <GestureHandlerRootView>
      <ReduxProvider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <NavigationContainer persistNavigationState={true}>
            <SafeAreaProvider>
              <MainNavigator />
              <Toast />
            </SafeAreaProvider>
          </NavigationContainer>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
};

export default App;
const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: 'flex-end',
  },
});
