import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IceBreakerHomeButtons from '../../components/ILinkupHomeButtons';
import NavBarGeneral from '../../components/NavBarGeneral';
import AvatarOne from '../../assets/photos/lady-avatar.png';
import AvatarTwo from '../../assets/photos/avatar.png';
import BackgroundImage from '../../assets/logos/half-logo.png';

const NonMatch = () => {
  return (
    <View style={styles.matchView}>
      <Image source={AvatarOne} style={styles.avatar} />
      <View style={styles.detailsView}>
        <Text style={styles.text}>3 Days Ago</Text>
        <Text style={styles.text}>Tiffany</Text>
        <Text style={styles.text}>Interested</Text>
      </View>
    </View>
  );
};

const Match = () => {
  return (
    <ImageBackground
      source={BackgroundImage}
      imageStyle={styles.backgroundImage}
      style={styles.matchView}>
      <Image source={AvatarTwo} style={styles.avatar} />
      <View style={styles.detailsView}>
        <Text style={styles.text}>3 Days Ago</Text>
        <Text style={styles.text}>Tiffany</Text>
        <Text style={styles.text}>Interested</Text>
      </View>
    </ImageBackground>
  );
};

const MyActivities = () => {
  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="CANCEL"
        rightButton={{display: true, action: ''}}
        rightText={'SELECT'}
      />
      <Text style={styles.topText}>YOUR PAST HIT AND MISS</Text>
      <View style={styles.horizontalView}>
        <NonMatch />
        <NonMatch />
      </View>
      <View style={styles.horizontalView}>
        <Match />
        <NonMatch />
      </View>
      <View style={styles.horizontalView}>
        <NonMatch />
        <NonMatch />
      </View>
      <View style={styles.horizontalView}>
        <Match />
        <NonMatch />
      </View>
      <IceBreakerHomeButtons />
    </View>
  );
};

export default MyActivities;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  topText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 4,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  backgroundImage: {
    backgroundColor: 'violet',
    opacity: 0.3,
  },
  avatar: {width: 40, height: 60, resizeMode: 'contain'},
  horizontalView: {
    diplay: 'flex',
    flexDirection: 'row',
    marginHorizontal: 40,
    gap: 10,
    marginVertical: 2,
    justifyContent: 'space-between',
  },
  matchView: {
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    flex: 1,
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#A9A9A9',
    borderRadius: 10,
  },
  detailsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
