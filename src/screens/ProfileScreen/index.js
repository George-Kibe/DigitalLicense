// const {setSession} = useAuthProvider();
//   const handleLogout = async () => {
//     await signOut();
//     setSession(null);
//   };
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch, useSelector} from 'react-redux';
import {authSlice} from '../../store/AuthSlice';
import Toast from 'react-native-toast-message';
import NavBarGeneral from '../../components/NavBarGeneral';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {signOut} from 'aws-amplify/auth';
import axios from 'axios';
import CloseAccountModal from './CloseAccountModal';

const ProfileScreen = () => {
  const lookingForData = [
    {key: '1', value: 'Relationship'},
    {key: '2', value: 'Friends With benefit'},
    {key: '3', value: 'One Night Stand'},
    {key: '4', value: 'Just Friends'},
    {key: '5', value: 'Just Chat'},
  ];
  const interestedInData = [
    {key: '1', value: 'Male'},
    {key: '2', value: 'Female'},
    {key: '3', value: 'TransGender'},
    {key: '4', value: 'Couple MF'},
    {key: '5', value: 'Couple MM'},
    {key: '6', value: 'Couple FF'},
  ];
  const statusData = [
    {key: '1', value: 'Single'},
    {key: '2', value: 'Married '},
    {key: '3', value: 'Divorced'},
  ];

  const dispatch = useDispatch();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(mongoUser.name || '');
  const [age, setAge] = useState(mongoUser.age?.toString() || '');
  const [gender, setGender] = useState(mongoUser.gender || '');
  const [status, setStatus] = useState(mongoUser.status || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [children, setChildren] = useState(
    mongoUser.children?.toString() || '',
  );
  const [livingWithMe, setLivingWithMe] = useState(
    mongoUser.livingWithMe || '',
  );
  const [lookingFor, setLookingFor] = useState(mongoUser.lookingFor || '');
  const [interestedIn, setInterestedIn] = useState(
    mongoUser.interestedIn || '',
  );

  const body = {
    _id: mongoUser._id,
    name,
    age: parseInt(age),
    gender,
    status,
    children: parseInt(children),
    livingWithMe,
    lookingFor,
    interestedIn,
  };
  // console.log(body);
  const editMyDetails = async () => {
    setLoading(true);
    console.log(body);
    try {
      const response = await axios.put(
        'https://myicebreaker.vercel.app/api/users',
        body,
      );
      console.log(response.data);
      dispatch(
        authSlice.actions.addLoggedInUser({
          user: user,
          mongoUser: response.data,
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'User Details have been updated successfully',
        text2: response,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error updating your information!',
        text2: 'Please try again!',
      });
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    try {
      await signOut();
      dispatch(authSlice.actions.logOutUser());
      Toast.show({
        type: 'success',
        text1: 'User Logged Out Successfully!',
        text2: 'You can login Again',
      });
    } catch (error) {}
  };
  const closeMyAccount = () => {
    setModalVisible(true);
  };

  if (!mongoUser) {
    return;
  }
  return (
    <ScrollView style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="BACK"
        rightButton={{display: true, action: editMyDetails}}
        rightText={loading ? 'Loading...' : 'EDIT'}
      />
      <CloseAccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.profileView}>
        <Text style={styles.profileTitle}>YOUR PROFILE</Text>
        <Text style={styles.profileComment}>
          (Only you and your matches can see it)
        </Text>
        <View style={styles.profileData}>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.textInput}
            />
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Age</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Gender</Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignSelf: 'flex-start',
                gap: 0,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="MALE"
                  status={gender === 'MALE' ? 'checked' : 'unchecked'}
                  color={'lime'}
                  onPress={() => setGender('MALE')}
                />
                <Text style={{fontSize: 10, color: 'black'}}>MALE</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="FEMALE"
                  status={gender === 'FEMALE' ? 'checked' : 'unchecked'}
                  color={'lime'}
                  onPress={() => setGender('FEMALE')}
                />
                <Text style={{fontSize: 10, color: 'black'}}>FEMALE</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="TRANS"
                  status={gender === 'TRANS' ? 'checked' : 'unchecked'}
                  color={'lime'}
                  onPress={() => setGender('TRANS')}
                />
                <Text style={{fontSize: 10, color: 'black'}}>TRANS </Text>
              </View>
            </View>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Status</Text>
            <View style={{alignSelf: 'flex-start', width: '55%'}}>
              <SelectList
                setSelected={val => setStatus(val)}
                data={statusData}
                boxStyles={{borderRadius: 0, backgroundColor: 'white'}}
                save="value"
                search={false}
                defaultOption={status}
                inputStyles={{color: 'black'}}
                dropdownTextStyles={{color: 'black'}}
              />
            </View>
          </View>
          <View style={[styles.profileRow]}>
            <Text style={styles.profileText}>Children</Text>
            <TextInput
              value={children}
              onChangeText={setChildren}
              style={[styles.textInput, {marginLeft: 10}]}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Living With me</Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignSelf: 'flex-start',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value={livingWithMe}
                  status={livingWithMe ? 'checked' : 'unchecked'}
                  color={'lime'}
                  onPress={() => setLivingWithMe(true)}
                />
                <Text> YES </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value={livingWithMe}
                  status={!livingWithMe ? 'checked' : 'unchecked'}
                  color={'red'}
                  onPress={() => setLivingWithMe(false)}
                />
                <Text> NO </Text>
              </View>
            </View>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Looking For</Text>
            <View style={{alignSelf: 'flex-start', width: '55%'}}>
              <SelectList
                setSelected={val => setLookingFor(val)}
                data={lookingForData}
                boxStyles={{borderRadius: 0, backgroundColor: 'white'}}
                save="value"
                search={false}
                inputStyles={{color: 'black'}}
                dropdownTextStyles={{color: 'black'}}
              />
            </View>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileText}>Interested In</Text>
            <View style={{alignSelf: 'flex-start', width: '55%'}}>
              <SelectList
                setSelected={val => setInterestedIn(val)}
                data={interestedInData}
                boxStyles={{borderRadius: 0, backgroundColor: 'white'}}
                save="value"
                search={false}
                defaultOption={interestedInData.filter(
                  option => option.value === interestedIn,
                )}
                inputStyles={{color: 'black'}}
                dropdownTextStyles={{color: 'black'}}
              />
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={editMyDetails}>
        <Text style={styles.editText}>{loading ? 'LOADING...' : 'EDIT'}</Text>
        <FontAwesome5 name="edit" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={logOutUser} style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOGOUT</Text>
        <AntDesign name="logout" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={closeMyAccount} style={styles.logoutButton}>
        <Text style={styles.logoutText}>CLOSE MY ACCOUNT</Text>
        <MaterialIcons name="cancel" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
  },
  topButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  topButton: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#6495ED',
  },
  topButtonText: {
    fontWeight: '800',
  },
  profileView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'silver',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  profileTitle: {
    fontWeight: '800',
    color: 'blue',
    fontSize: 16,
  },
  profileComment: {
    color: 'blue',
    fontWeight: '800',
    fontSize: 12,
  },
  profileRow: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  profileText: {
    color: '#000000',
    marginVertical: 2,
    marginLeft: 10,
    fontWeight: '800',
    fontSize: 16,
    paddingHorizontal: 5,
    width: '40%',
  },
  textInput: {
    color: '#000000',
    height: 30,
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 5,
    flex: 1,
    paddingVertical: 1,
    backgroundColor: 'white',
  },
  editButton: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    marginVertical: 20,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginLeft: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'gray',
  },
  editText: {
    fontWeight: '500',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#5F9EA0',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  logoutText: {
    color: 'white',
    marginHorizontal: 10,
    fontWeight: '500',
    fontSize: 18,
  },
});
