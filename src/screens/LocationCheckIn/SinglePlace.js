/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const APIKEY = 'AIzaSyAZwwdSkH54eXB4s2fh7XOA6wBFjJo3GEg';
import React from 'react';

const SinglePlace = ({place, setCheckIn, checkIn}) => {
  return (
    <TouchableOpacity
      onPress={() => setCheckIn(place.name)}
      key={place.place_id}
      style={[
        styles.container,
        checkIn === place.name && {borderWidth: 2, borderColor: 'white'},
      ]}>
      <View>
        {place.photos && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${APIKEY}`,
            }}
            style={styles.photo}
          />
        )}
        <Text style={styles.normalText}>
          {place.name.length < 20
            ? place.name
            : place.name.substring(0, 20) + '...'}
        </Text>
        {place.rating && (
          <Text style={styles.normalText}>{place.rating} out of 5 stars</Text>
        )}
        {place.types?.length > 0 && (
          <Text style={styles.normalText}>{place.types[0]}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SinglePlace;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
    padding: 10,
  },
  normalText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
  },
  photo: {
    borderRadius: 5,
    width: 160,
    resizeMode: 'contain',
    height: 100,
  },
});
