import {Button, StyleSheet, View} from 'react-native';
import {signOut} from 'aws-amplify/auth';
import React from 'react';
import {useAuthProvider} from '../../providers/AuthProvider';

const ProfileScreen = () => {
  const {setSession} = useAuthProvider();
  const handleLogout = async () => {
    await signOut();
    setSession(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.signOutButton}>
        <Button title="Sign Out" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  signOutButton: {
    alignSelf: 'center',
  },
});
