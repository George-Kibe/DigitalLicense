import React, {useRef, useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity, Text, ScrollView, View, StyleSheet, Image} from 'react-native';
import {SignatureView} from 'react-native-signature-capture-view';

interface SignaturePadProps{
  signatureImage: string,
  setSignatureImage: React.Dispatch<React.SetStateAction<string>>
}
const SignaturePad = ({
  signatureImage,
  setSignatureImage
}: SignaturePadProps) => {
  const signatureRef = useRef( null);
  return (
    <View>
      <SignatureView
      style={{
        borderWidth:1,
        height: 100,
        borderRadius: 2,
      }}
      
        ref={signatureRef}
        onSave={(val: React.SetStateAction<string>) => {
          console.log('saved signature')
          // console.log(val);
          setSignatureImage(val)
          
        }}
        onClear={() => {
          console.log('cleared signature')
          setSignatureImage('')
        }}
      />
      <View style={{flexDirection: 'row', justifyContent:'center', height: 50}}>
      <TouchableOpacity
      style={{ justifyContent:'center',alignItems:'center', flex:1}}
        onPress={() => {
          signatureRef.current.clearSignature();
        }}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent:'center',alignItems:'center', flex:1}}
        onPress={() => {
          signatureRef.current.saveSignature();
        }}>
        <Text>Save</Text>
      </TouchableOpacity>
      </View>
      <Image
        source={{ uri: signatureImage }}
        style={styles.image}
        resizeMode="contain"
      />
      
      {/* <ScrollView style={{flex:1,margin: 20}}>
        <Text numberOfLines={10} ellipsizeMode='tail'>{text}</Text>
      </ScrollView> */}
    </View>
  );
};

export default SignaturePad;

const styles = StyleSheet.create({
  image: {
    width: 200, // Adjust as needed
    height: 50, // Adjust as needed
    resizeMode: "cover"
  },
})




