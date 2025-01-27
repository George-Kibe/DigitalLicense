import React from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, ScrollView, View, Dimensions, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get("screen");
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { images } from '@/constants/images';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function HomeScreen() {
  const currentUser = useSelector((state: RootState) => state.currentUser.user) as User | null;
  const [showActivity, setShowActivity] = useState(true);
  const [updating, setUpdating] = useState(true);
  console.log("Current User: ", currentUser)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowActivity(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []); // Hide activity after 2 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdating(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []); // Hide updating after 4 seconds
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topView}>
      </View>
      <View style={styles.bottomView}>
        {
          showActivity ? (
            <View>
              <Text style={styles.fetchText}>
                Fetching your digital wallet
              </Text>
              <ActivityIndicator size={'large'}/>
            </View>
          ): (
            <View style={styles.mainBottomView}>
              <View style={styles.topQueenView}>
                <Image style={styles.qLogo} source={images.QLDWatermark} />
                <View style={styles.queenTextView}>
                  <Text style={styles.qtext}>Queensland</Text>
                  <Text style={styles.qtext}>Government</Text>
                </View>
              </View>

              <View style={styles.userDetails}>
                <Image style={styles.passport} source={{uri: currentUser?.passportImage}}/>
                <Text style={styles.nameText}>{currentUser?.fullName}</Text>
              </View>
              <View style={styles.credentialsView}>
                <Text>Credentials</Text>
                {
                  updating && (
                    <View style={styles.updatingView}>
                      <ActivityIndicator />
                      <Text>Updating</Text>
                    </View>
                  )
                }
              </View>         

              <View>
                <TouchableOpacity onPress={() => router.push("/license-details")} style={styles.optionButton}>
                  {/* <Image /> */}
                  <FontAwesome5 name="car-side" size={24} color="black" />
                  <Text>Driver Licence</Text>
                  <Feather style={styles.rightIcon} name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton}>
                  {/* <Image /> */}
                  <FontAwesome5 name="car-side" size={24} color="black" />
                  <Text>Marine Licence</Text>
                  <Feather style={styles.rightIcon} name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "whitesmoke"
  },
  topView: {
    backgroundColor: "#7F082E",
    height: height,
    width
  },
  fetchText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 100,
  },
  bottomView: {
    borderRadius: 20,
    marginTop: height * 0.15,
    position: "absolute",
    backgroundColor: "whitesmoke",
    height: height * 0.85,
    width,
    alignItems: "center",
  },
  mainBottomView: {
    width: width* 0.9,
  },
  qLogo: {
    height: 40,
    width: 40,
    tintColor: "white"
  },
  qtext: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  topQueenView: {
    position: "absolute",
    top: -50,
    gap: 10,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    zIndex: 10,
  },
  queenTextView: {
    flexDirection: "column",
    // alignItems: "center",
  },
  userDetails: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  passport: {
    height: 120,
    width: 100,
    borderRadius: 4,
    marginTop: -40,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    flexWrap: 'wrap',
    width: 300
  },
  credentialsView: {
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
  },
  updatingView: {
    flexDirection: "row",
    gap: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  },
  rightIcon: {
    marginLeft: "auto"
  }
});
