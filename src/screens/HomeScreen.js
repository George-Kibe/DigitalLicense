import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {signInWithRedirect, signIn} from 'aws-amplify/auth';

const HomeScreen = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect({provider: 'signInWithApple'});
    } catch (error) {
      console.log('Error signing in with Apple: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
      <TouchableOpacity onPress={signInWithGoogle}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff',
  },
});
