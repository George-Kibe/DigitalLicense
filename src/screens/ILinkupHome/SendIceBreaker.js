/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import NavBarGeneral from '../../components/NavBarGeneral';
import AvatarImage from '../../assets/photos/lady-avatar.png';
import IceBreakerHomeButtons from '../../components/ILinkupHomeButtons';
import {RadioButton} from 'react-native-paper';
import SendingIceBreakerModal from './SendingIceBreakerModal';
import LoadingVideo from './LoadingVideo';

const SendIceBreaker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showGreeting, setShowGreeting] = useState(false);
  const [keepInvite, setKeepInvite] = useState(false);
  const [remove, setRemove] = useState(false);
  const [inviteCard, setInviteCard] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  // TODO
  // Function to handle loading and matching

  const goToWishesScreen = () => {
    setLoading(true);
  };

  return (
    <View style={[styles.container, modalVisible && {backgroundColor: 'gray'}]}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="CANCEL"
        title={'Confirm and Send Your IceBreaker'}
        rightButton={{display: true, action: goToWishesScreen}}
        rightText={'SEND'}
      />
      <SendingIceBreakerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {loading ? (
        <LoadingVideo
          setModalVisible={setModalVisible}
          setLoading={setLoading}
        />
      ) : (
        <View style={styles.topView}>
          <Text style={styles.topText}>CHOOSE THESE PREFERENCES</Text>
          <View style={styles.iceBreaker}>
            <Image source={AvatarImage} style={styles.avatar} />
            <View style={styles.detailsView}>
              <View style={styles.singleItem}>
                <Text style={styles.text}>Show Your Greeting</Text>
                <View style={styles.radioButtons}>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={showGreeting}
                      status={showGreeting ? 'checked' : 'unchecked'}
                      color={!showGreeting ? '' : 'lime'}
                      onPress={() => setShowGreeting(true)}
                    />
                    <Text style={styles.radioText}>YES</Text>
                  </View>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={showGreeting}
                      status={!showGreeting ? 'checked' : 'unchecked'}
                      color={showGreeting ? '' : 'red'}
                      onPress={() => setShowGreeting(false)}
                    />
                    <Text style={styles.radioText}>NO</Text>
                  </View>
                </View>
              </View>
              <View style={styles.singleItem}>
                <Text style={styles.text}>Keep Invite On</Text>
                <View style={styles.radioButtons}>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={keepInvite}
                      status={keepInvite ? 'checked' : 'unchecked'}
                      color={!keepInvite ? '' : 'lime'}
                      onPress={() => setKeepInvite(true)}
                    />
                    <Text style={styles.radioText}> YES </Text>
                  </View>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={keepInvite}
                      status={!keepInvite ? 'checked' : 'unchecked'}
                      color={keepInvite ? '' : 'red'}
                      onPress={() => setKeepInvite(false)}
                    />
                    <Text style={styles.radioText}> NO </Text>
                  </View>
                </View>
              </View>
              {/* <View style={styles.singleItem}>
              <Text style={styles.text}>Remove</Text>
              <View style={styles.radioButtons}>
                <View style={styles.singleButton}>
                  <RadioButton
                    value={remove}
                    status={remove ? 'checked' : 'unchecked'}
                    color={!remove ? '' : 'lime'}
                    onPress={() => setRemove(true)}
                  />
                  <Text style={styles.radioText}> YES </Text>
                </View>
                <View style={styles.singleButton}>
                  <RadioButton
                    value={remove}
                    status={!remove ? 'checked' : 'unchecked'}
                    color={remove ? '' : 'red'}
                    onPress={() => setRemove(false)}
                  />
                  <Text style={styles.radioText}> NO </Text>
                </View>
              </View>
            </View> */}
              <View style={styles.singleItem}>
                <Text style={styles.text}>Send Invite Card</Text>
                <View style={styles.radioButtons}>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={inviteCard}
                      status={inviteCard ? 'checked' : 'unchecked'}
                      color={!inviteCard ? '' : 'lime'}
                      onPress={() => setInviteCard(true)}
                    />
                    <Text style={styles.radioText}> YES </Text>
                  </View>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={inviteCard}
                      status={!inviteCard ? 'checked' : 'unchecked'}
                      color={inviteCard ? '' : 'red'}
                      onPress={() => setInviteCard(false)}
                    />
                    <Text style={styles.radioText}> NO </Text>
                  </View>
                </View>
              </View>
              <View style={styles.singleItem}>
                <Text style={styles.text}>Show Your Avatar</Text>
                <View style={styles.radioButtons}>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={showAvatar}
                      status={showAvatar ? 'checked' : 'unchecked'}
                      color={!showAvatar ? 'white' : 'lime'}
                      onPress={() => setShowAvatar(true)}
                    />
                    <Text style={styles.radioText}> YES </Text>
                  </View>
                  <View style={styles.singleButton}>
                    <RadioButton
                      value={showAvatar}
                      status={!showAvatar ? 'checked' : 'unchecked'}
                      color={showAvatar ? 'gray' : 'red'}
                      onPress={() => setShowAvatar(false)}
                    />
                    <Text style={styles.radioText}> NO </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      <IceBreakerHomeButtons modalVisible={modalVisible} />
    </View>
  );
};

export default SendIceBreaker;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  topView: {
    display: 'flex',
    backgroundColor: '#101E2A',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  topText: {
    color: 'white',
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 14,
  },
  iceBreaker: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#111925',
    borderRadius: 20,
    borderWidth: 2,
    paddingRight: 5,
    borderColor: '#47494C',
  },
  avatar: {
    width: 100,
    height: 200,
    resizeMode: 'contain',
  },
  detailsView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    gap: 2,
    marginLeft: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 0,
  },
  singleItem: {
    display: 'flex',
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButtons: {
    flexDirection: 'row',
  },
  radioText: {fontSize: 10, color: 'white'},
  singleButton: {flexDirection: 'row', alignItems: 'center', gap: 0},
});
