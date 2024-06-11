/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {deleteUser, signOut} from 'aws-amplify/auth';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {authSlice} from '../../store/AuthSlice';

const CloseAccountModal = ({loading, modalVisible, setModalVisible}) => {
  const dispatch = useDispatch();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  // console.log('mongoUser ID', mongoUser._id);
  const userId = mongoUser._id;
  const confirmCloseAccount = async () => {
    // closing account logic here
    try {
      await deleteUser();
      await axios.delete(
        `https://myicebreaker.vercel.app/api/users/delete/${userId}`,
      );
      await signOut();
      dispatch(authSlice.actions.logOutUser());
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'User deletion Failed. Try again',
        text2: 'User deletion Failed. Try again',
      });
    }
    setModalVisible(!modalVisible);
    console.log('closing account');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
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
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.modalText}>Are You sure you want </Text>
            <Text style={styles.modalText}>to close your account?</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.modalbutton,
              {paddingHorizontal: 20, backgroundColor: 'green'},
            ]}
            onPress={confirmCloseAccount}>
            <Text style={styles.textStyle}>
              {loading ? 'Loading...' : 'YES'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CloseAccountModal;

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
    flexDirection: 'column',
    justifyContent: 'space-between',
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
