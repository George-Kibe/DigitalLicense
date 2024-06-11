import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AvatarImage from '../../assets/photos/avatar.png';
import CreateImage from '../../assets/photos/create.png';
import NavBarGeneral from '../../components/NavBarGeneral';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const AvatarScreen = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('1');
  const navigation = useNavigation();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  // console.log(mongoUser.myAvatars);
  const selectAvatar = () => {
    console.warn('Avatar Clicked!');
  };
  const editAvatar = () => {
    navigation.navigate('EditAvatar');
  };
  const createAvatar = () => {
    navigation.navigate('create-avatar');
  };

  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="CHANGE"
        title="My Avatars"
        rightButton={{display: true, action: ''}}
        rightText={'CONFIRM'}
      />
      <Text style={styles.topText}>Choose Avatar or Create a new Avatar</Text>
      <View style={styles.avatarsView}>
        <TouchableOpacity onPress={createAvatar}>
          <Image source={CreateImage} style={styles.avatar} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedAvatar('0')}
          style={selectedAvatar === '0' ? styles.selectedAvatar : null}
          onLongPress={editAvatar}>
          <View style={styles.iconView}>
            <Feather name="edit-2" size={20} color="black" />
          </View>
          <Image source={{uri: mongoUser.myAvatars[0]}} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarsView}>
        <TouchableOpacity
          onPress={() => setSelectedAvatar('1')}
          style={selectedAvatar === '1' ? styles.selectedAvatar : null}
          onLongPress={editAvatar}>
          <View style={styles.iconView}>
            <Feather name="edit-2" size={20} color="black" />
          </View>
          <Image source={{uri: mongoUser.myAvatars[1]}} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedAvatar('2')}
          style={selectedAvatar === '2' ? styles.selectedAvatar : null}
          onLongPress={editAvatar}>
          <View style={styles.iconView}>
            <Feather name="edit-2" size={20} color="black" />
          </View>
          <Image source={{uri: mongoUser.myAvatars[2]}} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvatarScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  topText: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
    fontWeight: '700',
  },
  text: {
    color: 'white',
  },
  avatarsView: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: 'white',
  },
  iconView: {
    backgroundColor: 'silver',
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 10,
    borderRadius: 20,
  },
});
