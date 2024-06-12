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
import BackgroundImage from '../../assets/photos/party5.png';
import AvatarImage from '../../assets/photos/lady-avatar.png';
import CheckImage from '../../assets/logos/tick.png';
import CancelImage from '../../assets/logos/cancel.png';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import NavBarGeneral from '../../components/NavBarGeneral';
import IceBreakerHomeButtons from '../../components/ILinkupHomeButtons';

const WishListScreen = ({}) => {
  const navigation = useNavigation();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  const createAvatar = () => {
    navigation.navigate('edit-avatar');
  };
  return (
    <ImageBackground
      source={BackgroundImage}
      imageStyle={{opacity: 0.3}}
      style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="CANCEL"
        rightButton={{display: true, action: ''}}
        rightText={'SELECT'}
      />
      <View style={{paddingHorizontal: 40}}>
        <Text style={styles.topText}>YOUR CURRENT WISH LIST</Text>
        <View style={styles.topView}>
          <TouchableOpacity onPress={createAvatar} style={styles.rightView}>
            <View style={styles.iconView}>
              <Entypo name="edit" size={16} color="black" />
            </View>
            <View style={styles.historyView}>
              <Image source={AvatarImage} style={styles.avatar} />
              <View style={styles.itemView}>
                <View style={styles.singleView}>
                  <Text style={styles.text}>2 Hours Ago</Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text} numberOfLines={1}>
                    The Hood Lounge
                  </Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Checked In</Text>
                  <Image source={CancelImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Interested</Text>
                  <Image source={CheckImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Untill</Text>
                  <View style={[styles.dot, {backgroundColor: 'red'}]} />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={createAvatar} style={styles.rightView}>
            <View style={styles.iconView}>
              <Entypo name="edit" size={16} color="black" />
            </View>
            <View style={styles.historyView}>
              <Image source={AvatarImage} style={styles.avatar} />
              <View style={styles.itemView}>
                <View style={styles.singleView}>
                  <Text style={styles.text}>2 Hours Ago</Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text} numberOfLines={1}>
                    The Hood Lounge
                  </Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Checked In</Text>
                  <Image source={CancelImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Interested</Text>
                  <Image source={CheckImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Untill</Text>
                  <View style={[styles.dot, {backgroundColor: 'red'}]} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={createAvatar} style={styles.rightView}>
            <View style={styles.iconView}>
              <Entypo name="edit" size={16} color="black" />
            </View>
            <View style={styles.historyView}>
              <Image source={AvatarImage} style={styles.avatar} />
              <View style={styles.itemView}>
                <View style={styles.singleView}>
                  <Text style={styles.text}>2 Hours Ago</Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text} numberOfLines={1}>
                    The Hood Lounge
                  </Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Checked In</Text>
                  <Image source={CancelImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Interested</Text>
                  <Image source={CheckImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Untill</Text>
                  <View style={[styles.dot, {backgroundColor: 'red'}]} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={createAvatar} style={styles.rightView}>
            <View style={styles.iconView}>
              <Entypo name="edit" size={16} color="black" />
            </View>
            <View style={styles.historyView}>
              <Image source={AvatarImage} style={styles.avatar} />
              <View style={styles.itemView}>
                <View style={styles.singleView}>
                  <Text style={styles.text}>2 Hours Ago</Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text} numberOfLines={1}>
                    The Hood Lounge
                  </Text>
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Checked In</Text>
                  <Image source={CancelImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Interested</Text>
                  <Image source={CheckImage} style={styles.checkCancel} />
                </View>
                <View style={styles.singleView}>
                  <Text style={styles.text}>Untill</Text>
                  <View style={[styles.dot, {backgroundColor: 'lime'}]} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <IceBreakerHomeButtons />
    </ImageBackground>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 10,
    letterSpacing: 0,
    textAlign: 'center',
  },
  topView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    gap: 20,
    paddingRight: 20,
    borderRadius: 10,
    height: 120,
    width: '100%',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
  },
  createImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  avatar: {
    width: 50,
    height: 100,
    resizeMode: 'contain',
  },
  historyView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  singleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkCancel: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  dot: {
    width: 10,
    height: 10,
    marginRight: 8,
    borderRadius: 10,
  },
  iconView: {
    backgroundColor: 'silver',
    position: 'absolute',
    top: 2,
    right: 2,
    padding: 4,
    borderRadius: 20,
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    gap: 20,
    paddingRight: 20,
    borderRadius: 10,
    height: 120,
    width: '100%',
  },
  leftView: {
    backgroundColor: '#111925',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#3B3F47',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  rightView: {
    backgroundColor: '#111925',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderWidth: 1,
    borderColor: '#3B3F47',
  },
  itemView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
