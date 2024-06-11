/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const AvaLocGreeting = ({activeScreen, setScreenIndex}) => {
  const goToMyAvatars = () => {
    setScreenIndex(1);
  };
  const goToLocation = () => {
    setScreenIndex(2);
  };

  const goToGreeting = () => {
    setScreenIndex(3);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goToMyAvatars}
        style={[
          styles.readyButton,
          activeScreen === 'Avatar Screen' && {backgroundColor: 'silver'},
        ]}>
        <Text style={styles.readyText}>My Avatars</Text>
        <View style={styles.iconView}>
          <Feather name="edit-2" size={20} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToLocation}
        style={[
          styles.readyButton,
          activeScreen === 'Location Screen' && {backgroundColor: 'silver'},
        ]}>
        <Text style={styles.readyText}>My Location</Text>
        <View style={styles.iconView}>
          <Feather name="edit-2" size={20} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToGreeting}
        style={[
          styles.readyButton,
          activeScreen === 'Greeting Screen' && {backgroundColor: 'silver'},
        ]}>
        <Text style={styles.readyText}>My Greeting</Text>
        <View style={styles.iconView}>
          <Feather name="edit-2" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AvaLocGreeting;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 20,
  },
  readyButton: {
    display: 'flex',
    padding: 15,
    paddingHorizontal: 15,
    backgroundColor: '#323232',
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  iconView: {
    backgroundColor: 'silver',
    padding: 5,
    borderRadius: 20,
  },
  readyText: {
    fontWeight: '800',
    color: 'white',
    fontSize: 20,
  },
});
