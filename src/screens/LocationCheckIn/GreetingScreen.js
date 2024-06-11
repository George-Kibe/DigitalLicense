/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch, useSelector} from 'react-redux';
import NavBarGeneral from '../../components/NavBarGeneral';
import axios from 'axios';
import {authSlice} from '../../store/AuthSlice';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const {height} = Dimensions.get('window');

const GreetingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);

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

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(mongoUser.name || '');
  const [age, setAge] = useState(mongoUser.age?.toString() || '');
  const [gender, setGender] = useState(mongoUser.gender || '');
  const [status, setStatus] = useState(mongoUser.status || '');
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

  const editMyDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        'https://myicebreaker.vercel.app/api/users',
        body,
      );
      // console.log(response.data);
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
      Toast.show({
        type: 'error',
        text1: 'Error updating your information!',
        text2: 'Please try again!',
      });
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: editMyDetails}}
        leftText={loading ? 'LOADING...' : 'CHANGE'}
        title={'My Greeting'}
        rightButton={{
          display: true,
          action: () => navigation.replace('home-stack'),
        }}
        rightText={loading ? 'LOADING...' : 'CONFIRM'}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.topText}>Create your greeting message</Text>
        <Text style={styles.topText}>Visible to your matches.</Text>

        <View style={styles.profileView}>
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
                  inputStyles={{color: 'black'}}
                  dropdownTextStyles={{color: 'black'}}
                />
              </View>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileText}>Children</Text>
              <TextInput
                value={children}
                onChangeText={setChildren}
                style={[styles.textInput, {marginLeft: 10}]}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileText}>Living With Me</Text>
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
                  inputStyles={{color: 'black'}}
                  dropdownTextStyles={{color: 'black'}}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.greetingView}>
        <Text style={styles.topText}>YOUR GREETING MESSAGE</Text>
        <View style={styles.messageView}>
          <Text style={{color: '#FFFFFF', margin: 10}}>
            Hello, its {name}, I am a {age} year old {gender}. I am {status}{' '}
            with {children} children{' '}
            {parseFloat(children) > 0 && livingWithMe
              ? 'that live with me'
              : ''}
            {parseFloat(children) > 0 && !livingWithMe
              ? 'that do not live with me'
              : ''}
            . I am interested in a {lookingFor} with a {interestedIn}.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GreetingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
  },
  topText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    width: '90%',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profileView: {
    position: 'relative',
    width: '100%',
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
    fontSize: 14,
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
    position: 'absolute',
    right: 2,
    top: 2,
    paddingHorizontal: 15,
    backgroundColor: 'silver',
    borderRadius: 10,
  },
  editText: {
    padding: 5,
    fontWeight: '800',
    color: '#000000',
  },
  // profileData: {
  //   alignSelf: 'flex-start',
  //   marginTop: 10,
  // },
  greetingView: {
    width: '80%',
    alignSelf: 'center',
  },
  messageView: {
    backgroundColor: 'gray',
    borderRadius: 5,
    width: '100%',
  },
  readyButton: {
    display: 'flex',
    padding: 15,
    paddingHorizontal: 15,
    backgroundColor: '#818589',
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  iconView: {
    backgroundColor: 'silver',
    padding: 5,
    borderRadius: 20,
  },
  readyText: {
    fontWeight: '800',
    color: 'white',
    fontSize: 20,
  },
  profileExtra: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  profileExtraText: {
    color: '#6495ED',
    fontWeight: '800',
    fontSize: 16,
  },
  flatList: {
    height: height * 0.35,
    paddingHorizontal: 5,
  },
  matchesList: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },
  matchesListTitle: {
    alignSelf: 'flex-end',
    marginTop: 10,
    display: 'flex',
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchesListText: {
    color: 'blue',
    fontWeight: '800',
  },
  logoView: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});
