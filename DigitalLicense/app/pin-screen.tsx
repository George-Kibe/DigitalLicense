import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PinScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PinScreen</Text>
    </View>
  )
}

export default PinScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})