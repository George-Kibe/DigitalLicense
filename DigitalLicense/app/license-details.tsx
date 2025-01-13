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

const LicenseDetails = () => {
  const [date, setDate] = useState<Date>();
  const [updating, setUpdating] = useState<Boolean>(true);
  
  useEffect(() => {
    const newDate = new Date();
    console.log("Date: ", date)
    setDate(newDate)
  }, [])
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topView}>
        <View style={styles.topViews} >
          <TouchableOpacity onPress={() => router.back()} style={styles.backView}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.rightView}>
            <Image style={styles.qLogo} source={images.QLDWatermark} />
              <View style={styles.queenTextView}>
                <Text style={styles.qtext}>Queensland</Text>
                <Text style={styles.qtext}>Government</Text>
              </View>
          </View>
        </View>
       <View style={styles.licenseTextView}>
        <Text style={styles.licenseText}>Driver Licence</Text>
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
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.userDetailsView}>
            <Image style={styles.passport} source={images.GeorgePassport}/>
            <View style={styles.rightDetails}>
              <Text style={styles.nameText}>FRANCESCO ANTONIO CORTESE</Text>
              <Text style={styles.dobText}>DoB</Text>
              <Text>05 Oct 1967</Text>
              <Text style={styles.dobText}>License No.</Text>
              <Text>123456789</Text>
            </View>
          </View>

          <View>
            <Text style={styles.text}>This information was refreshed online</Text>
            <Text style={styles.dateTimeText}>{moment(date).format("DD MMM YYYY hh:mm a")}</Text>
          </View>
           <View style={styles.credentialsView}>
            <View style={styles.updatingView}>
              <ActivityIndicator />
              <Text>Updating</Text>
            </View>
            <View style={styles.line} />
          </View>
          
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
              <Ionicons name="checkmark-circle" size={24} color="#0D6C4D" />
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
              <Text style={styles.text}>
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
              <Text style={styles.text}>
                (O) Open
              </Text>
            </View>
          </View>

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Expiry</Text>
            </View>
            <View style={styles.ageDetailView}>
              <Text style={styles.text}>
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
              <Text style={styles.text}>
                19 CARBEEN STREET BULIMBA
              </Text>
              <Text style={styles.text}>
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
            <Text style={styles.text}>
              C3D6A34DA6
            </Text>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Issuing Country</Text>
            </View>
            <Text style={styles.text}>
              AU
            </Text>
          </View>
          <View style={styles.line} />

          <View style={styles.singleDetailView}>
            <View style={styles.leftDetailView}>
              <Text style={styles.text}>Issuing Authority</Text>
            </View>
            <View>
            <Text style={styles.text}>
              Queensland Government,
            </Text>
            <Text style={styles.text}>
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
    backgroundColor: "#F2A553",
  },
  topView: {
    backgroundColor: "#F2A553",
    width,
  },
  topViews: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    height: 2,
    backgroundColor: "lightgray",
    marginVertical: 6,
    width: width * 0.9
  },
  rightView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qLogo: {
    height: 40,
    width: 40,
  },
  queenTextView: {
    // flexDirection: "column",
    // alignItems: "center",
  },
   userDetailsView: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  rightDetails: {
    justifyContent: 'space-between'
  },
  nameText: {
    color: "black",
    fontSize: 20,
    flexWrap: 'wrap',
    width: 250,
    fontWeight: "800",
  },
  dobText: {
    color: "black",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  passport: {
    height: 140,
    width: 120,
    borderRadius: 2,
  },
  qtext: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  licenseTextView: {
    padding: 20,
  },
  licenseText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    padding: 20,
    width: width ,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: 'whitesmoke'
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
    color: 'black',
    fontWeight: "600"
  },
  dateTimeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: "800",
    marginTop: 4,
  },
  credentialsView: {
    flexDirection: "column",
    marginTop: 10,
  },
  updatingView: {
    flexDirection: "row",
    gap: 10,
  },
  singleDetailView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  leftDetailView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontWeight: "bold"
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
    color: "black",
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
    fontWeight: "800",
  },

})