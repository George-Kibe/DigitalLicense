import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
const { height, width } = Dimensions.get("screen");
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import moment from "moment";
import {LinearGradient} from 'expo-linear-gradient';

const LicenseDetails = () => {
  const [date, setDate] = useState<Date>();
  const [updating, setUpdating] = useState<Boolean>(true);
  
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
      <SafeAreaView style={[styles.topView, styles.splitView]}>
      <View style={[styles.triangle, styles.bottomRight]} />
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
          <View style={styles.rightView}>
            <Image style={styles.qLogo} source={images.QLDWatermark} />
              <View style={styles.queenTextView}>
                <Text style={styles.q1text}>Queensland</Text>
                <Text style={styles.q2text}>Government</Text>
              </View>
          </View>
        </View>
      </SafeAreaView>

        <Animatable.Image
          animation="pulse" // Replace with desired animation
          iterationCount="infinite"
          duration={1500}
          source={images.QLDWatermark}
          style={styles.bouncingImage}
          resizeMode="cover"
        />
        
        <ScrollView bounces={false} style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <LinearGradient 
            start = {{x:0, y: 0}}
            end = {{x:1, y: 0}}
            colors={['#F2A553', '#FBCD7A',]} 
            style={styles.licenseTextView}
          >
            <Text style={styles.licenseText}>Driver Licence</Text>
          </LinearGradient>
          <View style={styles.userDetailsView}>
            <Image style={styles.passport} source={images.GeorgePassport}/>
            <View style={styles.rightDetails}>
              <Text style={styles.nameText}>FRANCESCO ANTONIO CORTESE</Text>
              <View>
                <Text style={styles.dobText}>DoB</Text>
                <Text style={styles.detailText}>05 Oct 1967</Text>
              </View>
              <View>
                <Text style={styles.dobText}>Licence No.</Text>
                <Text style={styles.detailText}>0893656178</Text>
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
              <Ionicons name="checkmark-circle" size={30} color="#0D6C4D" />
              <Text style={styles.greenText}>
                Over 18
              </Text>
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Class</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Text style={styles.backText}>
                (C) Car
              </Text>
              <FontAwesome6 name="car-side" size={24} color="black" />
            </View>
          </View>

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Type</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Text style={styles.blackText}>
                (O) Open
              </Text>
            </View>
          </View>

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Expiry</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Text style={styles.blackText}>
                31 Oct 2029
              </Text>
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Conditions</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Text style={styles.text}>
                -
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
              <Text style={styles.blackText}>
                19 CARBEEN STREET BULIMBA
              </Text>
              <Text style={styles.blackText}>
                QLD 4171 AU
              </Text>
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Signature</Text>
            </View>
            <View style={styles.ageDetailView}>
              {/* <Image style={styles.signature} source={images.signature} /> */}
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Card Number</Text>
            </View>
            <Text style={styles.blackText}>
              C3D6A34DA6
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
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareDLText}>
            SHARE DRIVER LICENCE
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
    color: "black",
    fontSize: 16,
    fontWeight: "700",
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
  },
  queenTextView: {
    // flexDirection: "column",
    // alignItems: "center",
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
    backgroundColor: "whitesmoke",
  },
  rightDetails: {
    justifyContent: 'space-between'
  },
  infoView: {
    paddingHorizontal: 20,
  },
  nameText: {
    color: "black",
    fontSize: 20,
    flexWrap: 'wrap',
    width: 250,
    fontWeight: "700",
  },
  detailText: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  dobText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "800",
  },
  passport: {
    height: 140,
    width: 120,
    borderRadius: 2,
    marginBottom: 10
  },
  q1text: {
    color: "black",
    fontSize: 16,
    fontWeight: "800",
  },
  q2text: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  licenseTextView: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor:'#F2A553',
    width
  },
  licenseText: {
    color: "black",
    fontSize: 18,
    fontWeight: "800",
  },
  scrollView: {
    width: width ,
    backgroundColor: "whitesmoke",
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bouncingImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    position: "absolute",
    opacity: 0.1,
    alignSelf: 'center',
    top: height * 0.36,
    zIndex: 2
  },
  text: {
    fontSize: 14,
    color: "#807E81",
    fontWeight: "600"
  },
  blackText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700"
  },
  darkText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700"
  },
  dateTimeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: "700",
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
    paddingVertical: 12,
    backgroundColor: "whitesmoke",
  },
  leftDetailView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: width * 0.4
  },
  currentView: {
    backgroundColor: "#0D6C4D",
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
    color: "#0D6C4D",
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
  },
  shareButton: {
    backgroundColor: "#F2A553",
    padding: 10,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  shareDLText: {
    color: "black",
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
})