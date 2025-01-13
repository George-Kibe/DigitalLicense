import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React from 'react';
import { images } from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
const { height, width } = Dimensions.get("screen");

const LicenseDetails = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topView}>
        <View style={styles.topViews} >
          <View style={styles.backView}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </View>
          <View style={styles.rightView}>
            <Image style={styles.qLogo} source={images.QLDWatermark} />
              <View style={styles.queenTextView}>
                <Text style={styles.qtext}>Queensland</Text>
                <Text style={styles.qtext}>Government</Text>
              </View>
          </View>
        </View>
       <View>
        <Text>Driver license</Text>
       </View>
      </SafeAreaView>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Animatable.Image
            animation="pulse" // Replace with desired animation
            iterationCount="infinite"
            duration={1500}
            source={images.QLDWatermark}
            style={styles.bouncingImage}
            resizeMode="cover"
          />
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>

          <Text style={styles.text}>Driver License</Text>

          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text>
          <Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text><Text style={styles.text}>Driver License</Text>
        </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareDLText}>
            SHARE DRIVER LICENSE
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
    backgroundColor: "whitesmoke",
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    backgroundColor: "#F2A553",
    width,
    paddingBottom: 20
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
    fontSize: 18,
    fontWeight: "bold",
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
  qtext: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  scrollView: {
    padding: 20,
    width: width * 0.9
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bouncingImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    position: "absolute",
    opacity: 0.1,
    alignSelf: 'center',
    top: height * 0.12
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  bottomView: {
    bottom: 0,
    width,
    alignItems: "center",
    justifyContent: "center",
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
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

})