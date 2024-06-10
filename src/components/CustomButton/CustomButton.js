/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const CustomButton = ({
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  image,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.1}
      onPress={onPress}
      style={[
        styles.container,
        !image && {padding: 15},
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      {image && <Image source={image} style={{width: 40, height: 40}} />}
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          !image && {fontSize: 20},
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '70%',
    padding: 5,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
