import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image, Platform, Dimensions, Alert } from "react-native";
import { MaterialIcons, FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
const { height, width } = Dimensions.get("screen");

const options = [
  {
    title: "Share my Driver Licence",
    description: "Photo, Name, DoB, Licence No., Class/es, Type/s, Conditions, Status, Expiry date, Address, Signature, Card number, Digital document expiry date",
    icon: <FontAwesome5 name="id-card" size={24} color="#000" />,
  },
  {
    title: "Prove I'm over 18",
    description: "Photo, Proof you are over 18",
    icon: <Text style={{
        fontSize: 18,
        fontWeight: "600",
    }}>18+</Text>,
  },
  {
    title: "Share my identity",
    description: "Photo, Name, DoB, Licence No., Signature",
    icon: <FontAwesome5 name="user-alt" size={24} color="#000" />,
  },
  {
    title: "Share a printable copy",
    description: "Photo, Name, DoB, Licence No., Class/es, Type/s, Conditions, Status, Expiry date, Address, Signature, Card number",
    icon: <MaterialIcons name="picture-as-pdf" size={24} color="black" />,
  },
];

const ShareOptionsScreen = () => {

  const showAlert = () => {
    Alert.alert(
      "Consent required",
      "You are about to share your information with a third party that may retain it. Do you consent?",
      [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => router.push("/share-alert"),
      },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      
      <View style={[styles.topView, styles.splitView]}>
      <View style={[styles.triangle, styles.bottomRight]} />
      <SafeAreaView
        style={Platform.OS === 'android'? {paddingTop: 50} : {}}
      >
         
      <LinearGradient 
        start = {{x:0, y: 0}}
        end = {{x:1, y: 0}}
        colors={['#F2A553', '#FBCD7A',]}
        style={[styles.triangle, styles.topLeft]}
      />
        <View style={styles.topViews} >
          <TouchableOpacity onPress={() => router.back()} style={styles.backView}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
       </View>

      <View style={styles.bottomView}>
        <Text style={styles.heading}>What would you like to share?</Text>
        <FlatList
            data={options}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.option} onPress={showAlert}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                </View>
                <Entypo name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
            )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FBCD7A'",
  },
  topView: {
    width,
  },
  splitView: {
    width: width, // Adjust width to your preference
    height: 130, // Adjust height to your preference
    position: "relative",
    overflow: "hidden",
  },
  topViews: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backText: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
  bottomView: {
    marginTop: -10,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: "#FFF",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center"
  },
  option: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2A553",
    borderRadius: 25,
    padding: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 1.1,
    marginTop: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    position: "absolute",
    borderStyle: "solid",
  },
  topLeft: {
    borderTopWidth: 130, // Matches the container height
    borderRightWidth: width, // Matches the container width
    borderTopColor: "#F2A553",
    borderRightColor: "transparent",
  },
  bottomRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 130, // Matches the container height
    borderLeftWidth: width, // Matches the container width
    borderBottomColor: "#FBCD7A",
    borderLeftColor: "transparent",
  },
});

export default ShareOptionsScreen;
