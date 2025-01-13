import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScanQRScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ScanQRScreen</Text>
    </View>
  )
}

export default ScanQRScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: 'center',
    justifyContent: 'center',
  },
})