import {StyleSheet, View} from 'react-native';
import React from 'react';
import SingleNotification from './SingleNotification';
import NavBarGeneral from '../../components/NavBarGeneral';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="RECENT"
        title={'Your Notifications'}
        rightButton={{display: true, action: ''}}
        rightText={'ALL'}
      />
      <SingleNotification />
      <SingleNotification />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    color: 'white',
  },
});
