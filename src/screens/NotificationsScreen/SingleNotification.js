/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import IceBreakerLogo from '../../assets/home/iLogo.png';
import LinearGradient from 'react-native-linear-gradient';

const SingleNotification = ({match}) => {
  const user = 'Katy';
  const viewMatch = () => {
    Toast.show({
      type: 'info',
      text1: `You Are about to View ${user}'s Profile`,
      text2: `You are about to view profile of ${user}`,
    });
    // navigation.navigate('My Matches');
  };
  return (
    <TouchableOpacity onPress={viewMatch} style={styles.container}>
      <LinearGradient
        colors={['#C4478D', '#1B679C']}
        style={styles.profile}
        start={{x: 0.7, y: 0}}>
        <ImageBackground
          source={IceBreakerLogo}
          imageStyle={{
            width: '100%',
            height: 100,
            resizeMode: 'contain',
            // backgroundColor: 'violet',
            opacity: 0.4,
          }}
          style={styles.profile}>
          <View style={styles.dot} />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 5,
              paddingLeft: 5,
            }}>
            <Image
              style={styles.avatar}
              source={require('../../assets/photos/lady-avatar.png')}
            />
          </View>
          <View style={{flex: 1, padding: 5}}>
            <View style={{alignSelf: 'flex-end'}}>
              <Text style={[styles.text, {fontWeight: '800'}]}>1 Hour Ago</Text>
            </View>
            <View>
              <Text style={styles.text}>
                Cluadia has accepted your icebreaker invitation sent 2 hours ago
                at Cloudland and is waiting for your next move.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SingleNotification;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000000',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 0,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'gray',
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    objectFit: 'contain',
    backgroundColor: 'gray',
    borderRadius: 50,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
  detailsView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  onlineText: {
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
  },
  onlineView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'lime',
    borderRadius: 5,
    alignSelf: 'center',
    marginLeft: 5,
  },
  secondaryView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  normalText: {
    fontWeight: '800',
    fontSize: 14,
    color: 'white',
  },
});
