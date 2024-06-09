import React from 'react';
import outputs from './amplify_outputs.json';
import {Button, View, StyleSheet, SafeAreaView} from 'react-native';
import {Amplify} from 'aws-amplify';
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react-native';

import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation';

Amplify.configure(outputs);

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
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView>
          {/* <SignOutButton /> */}
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: 'flex-end',
  },
});
