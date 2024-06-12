/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
import axios from 'axios';
import GifLoading from '../../components/Loading';
import Toast from 'react-native-toast-message';
import SinglePlace from './SinglePlace';
import NavBarGeneral from '../../components/NavBarGeneral';
import {useDispatch, useSelector} from 'react-redux';
import generatePlaceId from '../../utils/generateID';
import {authSlice} from '../../store/AuthSlice';
const {width} = Dimensions.get('screen');
const APIKEY = 'AIzaSyAZwwdSkH54eXB4s2fh7XOA6wBFjJo3GEg';

const LocationCheckInScreen = () => {
  const dispatch = useDispatch();
  const {mongoUser, user} = useSelector(state => state.user.loggedUser);
  // console.log(mongoUser);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);

  const loadMore = () => {
    if (searchResults.length <= lastIndex) {
      Toast.show({
        type: 'success',
        text1: 'Cannot Load More venues Around',
        text2: 'if you did not find the place, type manually',
      });
      return;
    }
    setFirstIndex(lastIndex);
    setLastIndex(lastIndex + 4);
  };

  const fetchNearbyJoints = async location => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1000&key=${APIKEY}`,
      );

      if (response.data && response.data.results) {
        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };
  // console.log('Search results: ', searchResults);
  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }
    const location = `${latitude},${longitude}`;
    console.log('Location:', location);
    fetchNearbyJoints(location);
  }, [latitude, longitude]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      myposition => {
        // console.log('Current Position Coordinates:', myposition.coords);
        const {latitude: lat, longitude: lon} = myposition.coords;
        try {
          setLatitude(lat);
          setLongitude(lon);
        } catch (error) {
          console.log(error);
        }
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 10}, // set distance filter to 10 meters
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);
  const startCheckIn = () => {
    console.log(checkIn);
    if (!checkIn) {
      Toast.show({
        type: 'error',
        text1: 'You need to add your venue or checkin first',
        text2: 'You need to add your venue or checkin first',
      });
      return;
    } else {
      setModalVisible(true);
    }
  };
  const createCheckInAndAddUser = async () => {
    setLoading(true);
    let body = {};
    console.log('Checkin: ', checkIn);
    const selectedPlace =
      searchResults.find(item => item.name === checkIn) || null;
    if (selectedPlace) {
      const {
        geometry,
        name,
        icon,
        photos,
        place_id: placeId,
        vicinity,
        types,
        reference,
      } = selectedPlace;
      body = {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        type: types[0],
        photo_reference: photos[0].photo_reference,
        members: [mongoUser._id],
        createdBy: mongoUser._id,
        name: name,
        icon: icon,
        placeId: placeId,
        vicinity: vicinity,
        reference: reference,
      };
    } else {
      body = {
        latitude: latitude,
        longitude: longitude,
        type: 'Custom Event',
        photo_reference: '',
        members: [mongoUser._id],
        createdBy: mongoUser._id,
        name: checkIn,
        icon: '',
        placeId: generatePlaceId(),
        vicinity: '',
        reference: '',
      };
    }
    // console.log('Body: ', body);
    try {
      console.log('Working');
      const response = await axios.post(
        'https://myicebreaker.vercel.app/api/checkins',
        body,
      );
      if (response.status === 200 || response.status === 201) {
        const {_id: lastLocationId} = response.data;
        console.log('Last Location ID: ', lastLocationId);
        const updateUserBody = {
          _id: mongoUser._id,
          lastLocation: lastLocationId,
        };
        const updateUserResponse = await axios.put(
          'https://myicebreaker.vercel.app/api/users',
          updateUserBody,
        );
        console.log(updateUserResponse.data);
        dispatch(
          authSlice.actions.addLoggedInUser({
            user: user,
            mongoUser: updateUserResponse.data,
          }),
        );
        Toast.show({
          type: 'success',
          text1: 'Checkin Successful',
          text2: 'Checkin Successful',
        });
      }
      // Update user's last checkin, then update state/mongo
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Some Error Occured, You may need to try Again',
        text2: 'Some Error Occured, You may need to try Again',
      });
    }
    setModalVisible(false);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <NavBarGeneral
        leftButton={{display: true, action: ''}}
        leftText="CHANGE"
        title="My Location"
        rightButton={{display: true, action: startCheckIn}}
        rightText={'CONFIRM'}
      />
      <View style={styles.bottomView}>
        <View style={styles.checkInView}>
          <Text
            style={[
              styles.normalText,
              {alignSelf: 'center', fontSize: 20, marginTop: 0},
            ]}>
            Select Place To Check In
          </Text>
          {searchResults.length === 0 && (
            <View style={{height: 200}}>
              <GifLoading additionalText={'There may be no results found'} />
            </View>
          )}
          <FlatList
            data={searchResults.slice(firstIndex, lastIndex)}
            // horizontal
            numColumns={2}
            renderItem={({item}) => (
              <SinglePlace
                place={item}
                setCheckIn={setCheckIn}
                checkIn={checkIn}
              />
            )}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </View>
      <TouchableOpacity onPress={loadMore} style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>LOAD MORE VENUES</Text>
      </TouchableOpacity>
      <View style={styles.locationView}>
        <Text style={[styles.normalText, {color: 'white', marginBottom: 5}]}>
          OR Enter Name of Event Manually
        </Text>
        <TextInput
          style={styles.locationInput}
          value={checkIn?.name}
          onChangeText={text => setCheckIn(text)}
          placeholder="eg. Alex's Birthday"
          placeholderTextColor={'black'}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to check into {checkIn}
          </Text>
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
            <TouchableOpacity
              style={[
                styles.modalbutton,
                {paddingHorizontal: 20, backgroundColor: 'green'},
              ]}
              onPress={createCheckInAndAddUser}>
              <Text style={styles.textStyle}>
                {loading ? 'Loading...' : 'YES'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocationCheckInScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
  },
  flatListContainer: {
    alignItems: 'center',
    padding: 5,
  },
  titleText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 5,
  },
  bottomView: {
    display: 'flex',
  },
  matchesView: {
    display: 'flex',
    alignItems: 'center',
  },
  normalText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  checkInView: {
    display: 'flex',
  },
  locationView: {
    display: 'flex',
    alignSelf: 'center',
    height: 100,
    flexDirection: 'column',
  },
  locationInput: {
    borderRadius: 2,
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 20,
    width: width * 0.6,
    paddingVertical: 2,
  },
  loadMoreButton: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginRight: 20,
  },
  loadMoreText: {
    color: 'black',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    gap: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000000',
  },
  modalbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
  },
});
