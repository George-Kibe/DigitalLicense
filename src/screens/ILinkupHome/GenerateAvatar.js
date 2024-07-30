import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavBarGeneral from '../../components/NavBarGeneral';

const GenerateAvatar = () => {
  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="BACK"
        title={'Create or Edit Your Avatar'}
        rightButton={{display: true, action: () => {}}}
        rightText={'CREATE'}
      />
      <Text style={styles.text}>Under Construction</Text>
    </View>
  );
};

export default GenerateAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
