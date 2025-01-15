import SignPad from '@/components/SignPad';
import React, { useState } from 'react';
import CalendarPicker from "react-native-calendar-picker";
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const ProfileEditScreen = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [licenceNumber, setLicenceNumber] = useState('')
  const [classType, setClassType] = useState('');
  const [cardNumber,  setCardNumber] = useState('');
  const [type, setType] = useState('');
  const [expiry, setExpiry] = useState('');

  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  console.log(
    "Name: ", name,
    "Address: ", address,
    "DOB: ", dob,
    "Licence Number: ", licenceNumber,
    "Class Type: ", classType,
    "Type: ", type,
    "Expiry: ", expiry
  )

  const typeOptions = [
    {"key":"(O)", "value": "Open"},
    {"key":"(P)", "value": "P-Red"},
    {"key":"(P)", "value": "P-Green"},
    {"key":"(L)", "value": "Learner"}
  ]
  const classOptions = [ 
    {"key":"(C)", "value": "Car"},
    {"key":"(M)", "value": "Motorcycle"},
    {"key":"(T)", "value": "Truck"},
  ]

  const handleSave = () => {
    // Handle saving data
    alert('Profile Updated');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image */}
        <SafeAreaView>
        <TouchableOpacity onPress={handleImageUpload} style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Upload Image</Text>
            </View>
          )}
        </TouchableOpacity>
        </SafeAreaView>

        {/* Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        {/* Date of Birth */}
        <Text style={styles.label}>Date of Birth</Text>
        <CalendarPicker onDateChange={setDob} />

        {/* Licence Number */}
        <Text style={styles.label}>Licence Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Licence Number"
          value={licenceNumber}
          onChangeText={setLicenceNumber}
        />

        {/* Card Number */}
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        {/* Class Dropdown */}
        <Text style={styles.label}>Class</Text>
        <Picker
          selectedValue={classType}
          onValueChange={(itemValue, itemIndex) =>
            setClassType(itemValue)
          }>
            {
              classOptions.map( (option, index) => (
                <Picker.Item 
                  key={index} 
                  label={option.key+" "+option.value} 
                  value={option.key+" "+option.value} 
                />
              ))
            }
        </Picker>
         {/* Type */}
         <Text style={styles.label}>Type</Text>
          <Picker    selectedValue={type} onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              {
                typeOptions.map( (option, index) => (
                  <Picker.Item
                    key={index}
                    label={option.key+" "+option.value}
                    value={option.key+" "+option.value}
                  />
                ))
              }
          </Picker>

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        {/* Expiry: Calendar */}
        <Text style={styles.label}>Expiry</Text>
        <CalendarPicker onDateChange={setExpiry} />
        <Text style={styles.label}>Sign</Text>
        <SignPad />

        {/* Save Button */}
        <Button title="Save Profile" onPress={handleSave} />
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 100
  },
  scrollContent: {
    padding: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 140,
    borderRadius: 4,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default ProfileEditScreen;
