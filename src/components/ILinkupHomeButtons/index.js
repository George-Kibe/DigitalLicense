/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const ILinkupHomeButtons = ({modalVisible}) => {
  const route = useRoute();
  const navigation = useNavigation();

  console.log('Route: ', route.name);
  const goToMyIceBreaker = () => {
    navigation.navigate('ilinkup-home');
  };
  const goToWishesScreen = () => {
    navigation.navigate('my-wishes');
  };

  const goToMyActivities = () => {
    navigation.navigate('my-activities');
  };

  return (
    <View style={[styles.container, modalVisible && {backgroundColor: 'gray'}]}>
      <TouchableOpacity
        onPress={goToMyIceBreaker}
        style={[
          styles.iceButton,
          // route?.name === 'IceBreaker-Home' && {backgroundColor: 'silver'},
          route?.name === 'create-avatar' && {backgroundColor: 'silver'},
          route?.name === 'edit-avatar' && {backgroundColor: 'silver'},
          route?.name === 'send-icebreaker' && {backgroundColor: 'silver'},
          modalVisible && {backgroundColor: 'gray'},
        ]}>
        {/* <Image
          source={IceBreakerLogo}
          style={{width: '100%', height: 50, resizeMode: 'contain'}}
        /> */}
        <Text
          style={[
            styles.readyText,
            route?.name === 'IceBreaker-Home' && {color: 'violet'},
          ]}>
          CREATE A NEW AVATAR_ _{'>'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToWishesScreen}
        style={[
          styles.iceButton,
          // route?.name === 'my-wishes' && {backgroundColor: 'silver'},
          modalVisible && {backgroundColor: 'gray'},
        ]}>
        <Text
          style={[
            styles.readyText,
            route?.name === 'my-wishes' && {color: 'violet'},
          ]}>
          MY WISHLIST_ _ _ _ _{'>'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToMyActivities}
        style={[
          styles.iceButton,
          // route?.name === 'my-activities' && {backgroundColor: 'silver'},
          modalVisible && {backgroundColor: 'gray'},
        ]}>
        <Text
          style={[
            styles.readyText,
            route?.name === 'my-activities' && {color: 'violet'},
          ]}>
          MY ACTIVITY_ _ _ _{'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ILinkupHomeButtons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 'auto',
    width: '100%',
    marginBottom: 20,
  },
  iceButton: {
    display: 'flex',
    padding: 5,
    paddingHorizontal: 15,
    // backgroundColor: '#363636',
    alignSelf: 'center',
    // width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    // marginVertical: 10,
    flexDirection: 'row',
    // gap: 20,
  },
  iconView: {
    backgroundColor: 'silver',
    padding: 5,
    borderRadius: 20,
  },
  readyText: {
    fontWeight: '800',
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
    letterSpacing: 1,
  },
});
