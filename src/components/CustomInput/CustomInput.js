import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'black'}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    color: 'black',
    padding: 5,
  },
});

export default CustomInput;
