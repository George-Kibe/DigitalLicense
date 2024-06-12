/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AvatarImage from '../../assets/photos/lady-avatar.png';
import FlowersImage from '../../assets/photos/flowers.png';
import ChocolateImage from '../../assets/photos/chocolate.png';
import KissesImage from '../../assets/photos/kiss.png';

const SendingIceBreakerModal = ({loading, modalVisible, setModalVisible}) => {
  const [callOrText, setCallOrText] = useState(false);
  const [otherOptions, setOtherOptions] = useState(false);
  const viewCallOrText = () => {
    setCallOrText(true);
  };
  const showOtherOptions = () => {
    setOtherOptions(true);
  };
  const decideLater = () => {
    setModalVisible(false);
    setCallOrText(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      {!callOrText && (
        <View style={styles.modalView}>
          <View style={styles.yesNoView}>
            <TouchableOpacity
              style={[
                styles.modalbutton,
                {paddingHorizontal: 20, backgroundColor: 'red'},
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>NO</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Is this your next Icebreaker?</Text>
            <TouchableOpacity
              style={[
                styles.modalbutton,
                {paddingHorizontal: 20, backgroundColor: 'green'},
              ]}
              onPress={viewCallOrText}>
              <Text style={styles.textStyle}>
                {loading ? 'Loading...' : 'YES'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomView}>
            <Image source={AvatarImage} style={styles.avatar} />
            <View style={styles.detailsView}>
              <View style={styles.singleView}>
                <Text style={styles.text}>When:</Text>
                <Text style={styles.textTwo}>2 Hours Ago</Text>
              </View>
              <View style={styles.singleView}>
                <Text style={styles.text}>At:</Text>
                <Text style={styles.textTwo}>Cloudiland</Text>
              </View>
              <View style={styles.singleView}>
                <Text style={styles.text}>Checkin:</Text>
                <Text style={styles.textTwo}>Yes</Text>
              </View>
            </View>
          </View>
          <View style={styles.greetingView}>
            <Text style={styles.text}>
              Hi, its Joanna, I am a 23 year old mum with two children.I am
              looking for a relationship with another female.
            </Text>
          </View>
        </View>
      )}
      {callOrText && !otherOptions && (
        <View style={styles.modalView}>
          <Text style={[styles.modalText, {marginBottom: 10}]}>
            DO YOU WANT TO CONNECT NOW?
          </Text>
          <TouchableOpacity
            style={[styles.itemView, {backgroundColor: '#3DA9D1'}]}>
            <Text style={styles.itemText}>AUDIO CALL</Text>
            <View style={styles.iconView}>
              <Ionicons name="call" size={30} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemView, {backgroundColor: '#6E2F9F'}]}>
            <Text style={styles.itemText}>VIDEO CALL</Text>
            <View style={[styles.iconView, {backgroundColor: '#610294'}]}>
              <Ionicons name="videocam" size={30} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemView, {backgroundColor: '#00AA54'}]}>
            <Text style={styles.itemText}>TEXT MESSAGE</Text>
            <View style={[styles.iconView, {backgroundColor: '#00D144'}]}>
              <Ionicons name="chatbox-ellipses" size={30} color="white" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 20,
              marginBottom: 4,
            }}>
            <TouchableOpacity onPress={showOtherOptions}>
              <Text style={styles.text}>OTHER OPTIONS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={decideLater}>
              <Text style={styles.text}>DECIDE LATER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {otherOptions && (
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              position: 'absolute',
              top: 20,
              left: 20,
            }}
            onPress={() => setOtherOptions(false)}>
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <Image
              source={FlowersImage}
              style={[styles.image, {resizeMode: 'contain', height: 100}]}
            />
            <TouchableOpacity style={styles.sendView}>
              <Text style={styles.text}>SEND VIRTUAL FLOWERS</Text>
              <View>
                <AntDesign name="rightcircle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Image source={ChocolateImage} style={styles.image} />
            <TouchableOpacity style={styles.sendView}>
              <Text style={styles.text}>SEND VIRTUAL CHOCOLATE</Text>
              <View>
                <AntDesign name="rightcircle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Image source={KissesImage} style={styles.image} />
            <TouchableOpacity style={styles.sendView}>
              <Text style={styles.text}>SEND VIRTUAL KISSES</Text>
              <View>
                <AntDesign name="rightcircle" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default SendingIceBreakerModal;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  modalView: {
    margin: 20,
    marginTop: 100,
    paddingTop: 20,
    backgroundColor: '#111925',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#111925',
    borderWidth: 1,
    borderColor: '#494B4D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  yesNoView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
  },
  modalbutton: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  avatar: {
    width: 60,
    height: 160,
    resizeMode: 'contain',
  },
  detailsView: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    height: 130,
  },
  singleView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  textTwo: {
    color: 'lime',
  },
  greetingView: {
    display: 'flex',
    padding: 10,
  },
  itemView: {
    width: '80%',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  itemText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  iconView: {
    backgroundColor: '#6EB8F2',
    padding: 5,
    borderRadius: 50,
  },
  image: {width: 200, height: 50, alignSelf: 'center', resizeMode: 'cover'},
  sendView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
});
