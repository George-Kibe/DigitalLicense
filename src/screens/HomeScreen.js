import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
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
