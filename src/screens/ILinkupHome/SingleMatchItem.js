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
import AntDesign from 'react-native-vector-icons/AntDesign';
import IceBreakerLogo from '../../assets/home/iLogo.png';
import LinearGradient from 'react-native-linear-gradient';

const SingleMatchItem = ({match, setModalVisible}) => {
  const user = 'Katy';
  const viewMatch = () => {
    setModalVisible(true);
  };
  return (
    <TouchableOpacity onPress={viewMatch} style={styles.container}>
      <LinearGradient
        colors={match ? ['#C4478D', '#1B679C'] : ['black', 'black']}
        style={styles.profile}
        start={{x: 0.7, y: 0}}>
        <ImageBackground
          source={IceBreakerLogo}
          imageStyle={{
            height: 100,
            resizeMode: 'contain',
            opacity: match ? 0.5 : 0.0,
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
              style={[
                styles.avatar,
                {backgroundColor: match ? '#7BA5C7' : '#7E5898'},
              ]}
              source={require('../../assets/photos/lady-avatar.png')}
            />
          </View>
          <View style={styles.detailsView}>
            <Text style={[styles.nameText, {textAlign: 'center'}]}>
              CLOUDLAND
            </Text>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                }}>
                <Text style={[styles.text, {fontSize: 14}]}>AGE</Text>
                <Text style={[styles.text, {fontSize: 16}]}>23</Text>
              </View>
              <View style={{flexDirection: 'column', flex: 1}}>
                {match ? (
                  <View style={styles.matchView}>
                    <View style={{alignSelf: 'center'}}>
                      <Text style={styles.text}>Its A Match</Text>
                    </View>
                    <View style={styles.connectView}>
                      <Text style={styles.text}>CONNECT NOW</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.text}>InvitePending</Text>
                    <Text style={styles.text}>Match Until</Text>
                    <Text style={styles.text}>11:30 PM</Text>
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={styles.secondaryView}>
            <Text style={styles.normalText}>1 Hour Ago</Text>
            <Text style={styles.text}>0 Kms</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>CheckedIn</Text>
              <AntDesign name="checksquare" size={20} color="green" />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SingleMatchItem;

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
    //alignItems: 'center',
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
  matchView: {
    justifyContent: 'space-around',
    flex: 1,
  },
  connectView: {
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#1B679C',
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
    borderBlockColor: 'white',
    borderWidth: 1,
  },
});
