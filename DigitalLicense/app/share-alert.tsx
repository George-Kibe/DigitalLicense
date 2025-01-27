import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity, SafeAreaView } from "react-native";

const ServiceUnavailable = () => {
  return (
    <View style={styles.container}>
      {/* Placeholder for the image. Replace the source with your reference. */}
      <SafeAreaView style={styles.topView}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backView}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.queenView}>
          <Image style={styles.qLogo} source={images.QLDWatermark} />
          <View style={styles.queenTextView}>
            <Text style={styles.queenText}>Queensland</Text>
            <Text style={styles.govText}>Government</Text>
          </View>
        </View>
      </SafeAreaView>
      <Text style={styles.depText}>Department of Transport and Main Roads</Text>

      <View style={styles.bottomView}>
        <Text style={styles.title}>Queensland Government - this service is currently unavailable</Text>

        <Text style={styles.text}>We are currently undergoing system maintenance</Text>
        <Text style={styles.text}>We apologise for any inconvenience</Text>
        <Text style={styles.text}>
          To find out when our service will be online please visit our website 
          <Text 
            style={styles.link} 
            onPress={() => Linking.openURL("https://www.tmr.qld.gov.au/")}
          >
            {" "}https://www.tmr.qld.gov.au/
          </Text>
        </Text>

        <Text style={styles.text}>
          If you need to speak to a customer service representative contact us on 
          <Text style={styles.phone}>13 23 80</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  topView: {
    flexDirection: "column",
    gap: 0,
  },
  queenView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 20,
  },
  backView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  qLogo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  queenTextView: {
    // flexDirection: "column",
    // alignItems: "center",
  },
  queenText: {
    color: "black",
    fontSize: 24,
    fontWeight: "800",
  },
  govText: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  depText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 20,
    color: "#0A4C70"
  },
  bottomView: {
    borderColor: "#C6523B",
    borderLeftWidth: 2,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C6523B",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  link: {
    color: "#007bff",
  },
  phone: {
    fontWeight: "bold",
  },
});

export default ServiceUnavailable;
