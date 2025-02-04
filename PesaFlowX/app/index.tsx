import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    // const timer = setTimeout(() => {
    //   router.replace("/auth");
    // }, 2000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <FontAwesome name="money" size={100} color="white" />
        <Text style={styles.appName}>PesaFlow</Text>

        <TouchableOpacity 
          onPress={() => router.push("/(tabs)")} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            <FontAwesome name="arrow-right" size={20} color="#4CAF50" /> Get Started
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  appName: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: "whitesmoke",
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
