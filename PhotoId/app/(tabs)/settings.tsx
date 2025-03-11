import SignPad from '@/components/SignPad';
import React, { useState } from 'react';
import CalendarPicker from "react-native-calendar-picker";
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { RootState } from '@/store';
import moment from "moment";

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
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '@/store/userSlice';
import { router } from 'expo-router';

const ProfileEditScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser.user) as User | null;
  console.log("CurrentUser: ", currentUser)
  const [profileImage, setProfileImage] = useState(currentUser?.passportImage || '');
  const [signatureImage, setSignatureImage] = useState(currentUser?.signatureImage || '');
  const [name, setName] = useState(currentUser?.fullName || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [dob, setDob] = useState(currentUser?.dateOfBirth);
  const [licenceNumber, setLicenceNumber] = useState(currentUser?.licenceNumber || '')
  const [classType, setClassType] = useState(currentUser?.class || '');
  const [cardNumber,  setCardNumber] = useState(currentUser?.cardNumber || '');
  const [type, setType] = useState(currentUser?.type || '');
  const [expiryDate, setExpiryDate] = useState(currentUser?.expiryDate);

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
    alert('Profile Updated');
    dispatch(userSlice.actions.addCurrentUser({
      user: {
        firstName: name.split(" ")[0],
        middleName: name.split(" ")[1],
        lastName: name.split(" ")[2],
        passportImage: profileImage,
        signatureImage: signatureImage || "",
        fullName: name,
        dateOfBirth: dob || new Date(),
        address: address,
        licenceNumber: licenceNumber,
        cardNumber: cardNumber,
        class: classType,
        type: type,
        expiryDate: expiryDate || new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
      }
    }))
  };

  const handleLogout = () => {
    dispatch(userSlice.actions.removeCurrentUser());
    router.push("/pin-screen")
  }

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
        <CalendarPicker onDateChange={setExpiryDate} /> 
        <SafeAreaView>
          <Text style={styles.label}>Add or Change  Sign</Text>
          <SignPad
            signatureImage={currentUser?.signatureImage || ""}
            setSignatureImage={setSignatureImage}
          />

          {/* Save Button */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
        
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
    marginTop: 16,
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
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: "#7F082E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileEditScreen;
