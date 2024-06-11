import {StyleSheet, Image, View, Text} from 'react-native';
import React from 'react';

const GifLoading = ({additionalText}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/gifs/loading.gif')}
      />
      <Text style={styles.text}>Loading...</Text>
      {additionalText && <Text style={styles.text}>{additionalText}</Text>}
    </View>
  );
};

export default GifLoading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
});
