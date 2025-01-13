import React, { useState } from 'react';
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
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [className, setClassName] = useState('');

  const handleImageUpload = () => {
    // Mock function for handling profile image update
    alert('Open Image Picker');
  };

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
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        {/* Date of Birth */}
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter date of birth (e.g., DD/MM/YYYY)"
          value={dob}
          onChangeText={setDob}
        />

        {/* Status */}
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your status"
          value={status}
          onChangeText={setStatus}
        />

        {/* Class */}
        <Text style={styles.label}>Class</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your class"
          value={className}
          onChangeText={setClassName}
        />

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
  },
  scrollContent: {
    padding: 16,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginBottom: 8,
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
