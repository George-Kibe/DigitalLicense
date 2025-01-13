import { Image, StyleSheet, Platform, ScrollView, View, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("screen");

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topView}>

      </View>
      <View style={styles.bottomView}>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  topView: {
    backgroundColor: "#7F082E",
    height: height * 0.2,
    width
  },
  bottomView: {
    backgroundColor: "red",
    // height: height * 0.8,
    width
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
