/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    backgroundColor: '#282828',
    //paddingTop: 5,
    width: '100%',
  },
  topText: {
    color: '#FCFCFC',
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 2,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  textView: {
    backgroundColor: '#333333',
    paddingHorizontal: 10,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 10,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
    backgroundColor: 'black',
  },
  leftButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
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
    paddingVertical: 8,
    borderRadius: 5,
  },
  rightText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 14,
  },
});
