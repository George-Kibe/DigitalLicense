/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function NavBarGeneral({
  leftButton = {display: true, action: null},
  leftText = 'BACK',
  rightButton = {display: true, action: null},
  rightText = 'Done',
}) {
  const navigation = useNavigation();
  const onExit = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() =>
            leftButton.action ? leftButton.action() : navigation.goBack()
          }>
          {leftButton.display && (
            <View style={styles.leftButton}>
              <Text style={[styles.leftText, width > 600 && {fontSize: 30}]}>
                {leftText}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() =>
            rightButton.action ? rightButton.action() : onExit()
          }>
          {rightButton.display && (
            <Text style={[styles.rightText, width > 600 && {fontSize: 28}]}>
              {rightText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  leftButton: {
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  leftText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 14,
  },
  rightButton: {
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  rightText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 14,
  },
});
