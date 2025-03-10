import { images } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Homescreen() {
  useEffect(() => {
    // Set a timeout to call the function after 2 seconds
    const timer = setTimeout(() => {
      router.push("/pin-screen")
    }, 1000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []); 

  return (
    <ImageBackground 
      source={images.HomeLoader} 
      resizeMode="cover" 
      style={styles.image}
    >
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
})
