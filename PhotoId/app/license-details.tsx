import { ActivityIndicator, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from "moment";
import {LinearGradient} from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { signature } from '@/data/sign';

const { height, width } = Dimensions.get("screen");

const LicenseDetails = () => {
  const [date, setDate] = useState<Date>();
  const currentUser = useSelector((state: RootState) => state.currentUser.user) as User | null;
  const [updating, setUpdating] = useState<Boolean>(true);
  const age = moment().diff(currentUser?.dateOfBirth, 'years')
  console.log("Age: ", age)
  useEffect(() => {
    const newDate = new Date();
    setDate(newDate)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdating(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []); 
  
  return (
    <View style={styles.container}>
      <View style={[styles.topView, styles.splitView]}>
      <SafeAreaView
        style={Platform.OS === 'android'? {paddingTop: 50} : {}}
      >
        <View style={styles.topViews} >
          <TouchableOpacity onPress={() => router.back()} style={styles.backView}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      </View>

      <Animatable.Image
        animation="pulse" // Replace with desired animation
        iterationCount="infinite"
        duration={1500}
        source={images.QLDWatermark}
        style={styles.bouncingImage}
        resizeMode="contain"
      />
        
      <ScrollView bounces={false} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View  style={styles.licenseTextView} >
          <View style={styles.photoIdView}>
          <Text style={styles.licenseText}>Photo Identification</Text>
              <View style={styles.rightView}>
              <Image style={styles.qLogo} source={images.QLDWatermark} />
                <View style={styles.queenTextView}>
                  <Text style={styles.queenText}>Queensland</Text>
                  <Text style={styles.govText}>Government</Text>
                </View>
            </View>
          </View>
          </View>
          <View style={styles.userDetailsView}>
            <Image style={styles.passport} source={{uri: currentUser?.passportImage}}/>
            <View style={styles.rightDetails}>
              <Text style={styles.nameText}>{currentUser?.fullName}</Text>
              <View>
                <Text style={styles.dobText}>DoB</Text>
                <Text style={styles.detailText}>
                  {moment(currentUser?.dateOfBirth).format("DD MMM YYYY")}
                </Text>
              </View>
              <View>
                <Text style={styles.dobText}>Licence No.</Text>
                <Text style={styles.detailText}>{currentUser?.licenceNumber}</Text>
              </View>
            </View>
          </View>

          {/* <View style={styles.splitView}>
            <View style={[styles.triangle, styles.topLeft]} />
            <View style={[styles.triangle, styles.bottomRight]} />
          </View> */}

          <View style={styles.infoView}>
            <Text style={styles.text}>Information was refreshed online:</Text>
            <Text style={styles.dateTimeText}>{moment(date).format("DD MMM YYYY hh:mm a")}</Text>
          </View>
          <View style={styles.line} />

          {
            updating && (
              <View style={styles.credentialsView}>
                <View style={styles.updatingView}>
                  <ActivityIndicator />
                  <Text>Updating</Text>
                </View>
                <View style={styles.line} />
              </View>
            )
          }
          
          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Status</Text>
              <AntDesign name="infocirlceo" size={12} color="black" />
            </View>
            <View style={styles.currentView}>
              <Text style={styles.whiteText}>Current</Text>
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Age</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Ionicons name="checkmark-circle" size={30} color="#1C956E" />
              <Text style={styles.greenText}>
                Over 18
              </Text>
            </View>
          </View>
          <View style={styles.line} />


          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Expiry</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Text style={styles.blackText}>
                {moment(currentUser?.expiryDate).format("DD MMM YYYY")}
              </Text>
            </View>
          </View>
    
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <View>
                <Text style={styles.text}>Address</Text> 
                <Text style={styles.smallText}>Are your Details up to date?</Text>
              </View>
            </View>
            <View style={styles.addressDetailView}>
              <Text style={styles.blackTextUpper}>
                {currentUser?.address}
              </Text>
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Signature</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Image
                source={{ uri: currentUser?.signatureImage || signature }}
                style={styles.signature}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Card Number</Text>
            </View>
            <Text style={styles.blackTextUpper}>
              {currentUser?.cardNumber}
            </Text>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Issuing Country</Text>
            </View>
            <Text style={styles.blackText}>
              AU
            </Text>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Issuing Authority</Text>
            </View>
            <View>
            <Text style={styles.blackText}>
              Queensland Government,
            </Text>
            <Text style={styles.blackText}>
              Department of Transport
            </Text>
            </View>
          </View>
          <View style={styles.line} />

        </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <TouchableOpacity onPress={() => router.push('/alert-preview')} style={styles.shareButton}>
          <Text style={styles.shareDLText}>
            SHARE PHOTO ID
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default LicenseDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    width,
    backgroundColor: "#9C1D51",
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
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  line: {
    height: 2,
    backgroundColor: "lightgray",
    marginVertical: 8,
    width: width * 0.9,
    alignSelf: "center"
  },
  rightView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  qLogo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    tintColor: "whitesmoke"
  },
  queenTextView: {
    // flexDirection: "column",
    // alignItems: "center",
  },
  queenText: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
  },
  govText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  signature: {
    width: 200, // Adjust as needed
    height: 40, // Adjust as needed
    resizeMode: "cover"
  },
  userDetailsView: {
    flexDirection: "row",
    marginTop: -20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    gap: 16,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  rightDetails: {
    justifyContent: 'space-between'
  },
  infoView: {
    paddingHorizontal: 20,
  },
  photoIdView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  nameText: {
    color: "black",
    fontSize: 20,
    flexWrap: 'wrap',
    width: width * 0.4,
    fontWeight: "500",
    textTransform: 'uppercase'
  },
  detailText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  dobText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
  passport: {
    height: 140,
    width: 120,
    borderRadius: 2,
    marginBottom: 10
  },
  licenseTextView: {
    backgroundColor: "#9C1D51",
    paddingBottom: 40,
    width,
  },
  licenseText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  scrollView: {
    width: width ,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bouncingImage: {
    width: height * 0.25,
    height: height * 0.25,
    resizeMode: "contain",
    position: "absolute",
    opacity: 0.10,
    alignSelf: 'center',
    top: height * 0.5,
    zIndex: 2
  },
  text: {
    fontSize: 14,
    color: "#807E81",
    fontWeight: "500"
  },
  blackText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500"
  },
  blackTextUpper: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    textTransform: 'uppercase',
    width: 200
  },
  darkText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  dateTimeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: "400",
    marginTop: 4,
  },
  credentialsView: {
    flexDirection: "column",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  updatingView: {
    flexDirection: "row",
    gap: 10,
  },
  singleDetailView: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  leftDetailView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: width * 0.34
  },
  currentView: {
    backgroundColor: "#1C956E",
    padding: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  ageDetailView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: width * 0.4
  },
  greenText: {
    color: "#1C956E",
    fontWeight: "bold",
    fontSize: 18
  },
  whiteText: {
    color: "white",
    fontWeight: "bold"
  },
  addressDetailView: {
    flexDirection: "column",
    width: 200
  },
  smallText: {
    fontSize: 12,
    color: "#807E81",
    fontWeight: "bold",
  },
  bottomView: {
    bottom: 0,
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: "#9C1D51",
    padding: 10,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  shareDLText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  splitView: {
    width: width, // Adjust width to your preference
    height: 130, // Adjust height to your preference
    position: "relative",
    overflow: "hidden",
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
    borderTopColor: "#9C1D51",
    borderRightColor: "transparent",
  },
  bottomRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 130, // Matches the container height
    borderLeftWidth: width, // Matches the container width
    borderBottomColor:  "#9C1D51",
    borderLeftColor: "transparent",
  },
})