import React from 'react';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, ScrollView, View, Dimensions, Text, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
const { height, width } = Dimensions.get("screen");
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { images } from '@/constants/images';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FontAwesome6 } from '@expo/vector-icons';

export default function HomeScreen() {
  const currentUser = useSelector((state: RootState) => state.currentUser.user) as User | null;
  const [showActivity, setShowActivity] = useState(true);
  const [updating, setUpdating] = useState(true);
  // console.log("Current User: ", currentUser)

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
        <View style={styles.topQueenView}>
          <Image style={styles.qLogo} source={images.QLDWatermark} />
          <View style={styles.queenTextView}>
            <Text style={styles.qtext}>Queensland</Text>
            <Text style={styles.qtext}>Government</Text>
          </View>
        </View>
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
              <View style={styles.userDetails}>
                <Image style={styles.passport} source={{uri: currentUser?.passportImage}}/>
                <Text style={styles.nameText}>{currentUser?.fullName}</Text>
              </View>
              <View style={styles.credentialsView}>
                <Text style={styles.grayText}>Credentials</Text>
                {
                  updating && (
                    <View style={styles.updatingView}>
                      <ActivityIndicator />
                      <Text>Updating</Text>
                    </View>
                  )
                }
              </View>         

              <TouchableOpacity 
                onPress={() => router.push("/license-details")} 
                style={styles.optionButton}
              >
                <View style={styles.carIconView}>
                  <FontAwesome6 name="user-large" size={24} color="white" />
                </View>
                <Text style={styles.text}>Photo ID</Text>
                <Feather style={styles.rightIcon} name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
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
    backgroundColor: "#FFFFFF"
  },
  topView: {
    backgroundColor:  "#9C1D51",
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
  text: {
    color: "black",
    fontSize: Platform.OS === "ios"? 16: 18,
    fontWeight: "bold",
  },
  grayText: {
    color: "#59585E",
    fontSize: Platform.OS === "ios"? 20: 24,
    fontWeight: "bold",
  },
  bottomView: {
    borderRadius: 20,
    marginTop: height * 0.15,
    position: "absolute",
    backgroundColor: "#E6E5EB",
    height: height * 0.85,
    width,
    alignItems: "center",
  },
  mainBottomView: {
    width: width* 0.9,
  },
  qLogo: {
    height: 60,
    width: 60,
    tintColor: "white",
    resizeMode: 'contain'
  },
  qtext: {
    color: "white",
    fontSize: Platform.OS === "ios"? 14: 16,
    fontWeight: "bold",
  },
  topQueenView: {
    marginTop: Platform.OS === "ios"? 60: 30,
    paddingLeft: 20,
    //gap: 10,
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: -30,
  },
  nameText: {
    fontSize: Platform.OS === "ios"? 14: 20,
    fontWeight: "bold",
    color: "black",
    flexWrap: 'wrap',
    width: 180,
    textTransform: "uppercase"
  },
  credentialsView: {
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
  },
  updatingView: {
    flexDirection: "row",
    gap: 10,
    padding: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  },
  rightIcon: {
    marginLeft: "auto"
  },
  carIconView: {
    // backgroundColor: "#903772",
    backgroundColor: "#9C1D51",
    height: "100%",
    padding: 12,
    borderRadius: 50,
  }
});
