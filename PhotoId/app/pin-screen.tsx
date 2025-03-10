import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { OtpInput } from "react-native-otp-entry";
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from "axios";
import userSlice from '@/store/userSlice';

const BACKEND_URL ="https://myicebreaker.com.au"
const CELL_COUNT = 6;

const PinScreen = () => {
  const [otpInput, setOtpInput] = useState<string>('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false)
  const [userCode, setUserCode] = useState('');
  const dispatch = useDispatch();
  const showCodeBox = useSelector((state: RootState) => state.currentUser.showCodeBox);

  // console.log("Show Code Box: ", showCodeBox)
  // console.log("Current User: ", currentUser)
  useEffect(() => {
    if (otpInput.length === 6) {
      router.push("/(tabs)")
    }
  }, [otpInput])
  console.log("New OTP: ", value)
  
  const verifyUserCode = async() => {
    console.log("User Code: ", userCode)
    setLoading(true);
    const code = "126D6C1XRE"
    try {
      const response = await axios.get(`${BACKEND_URL}/dl-users/${userCode}`);
      console.log("Response: ", response.data)
       dispatch(userSlice.actions.addCurrentUser({
        user: response.data
      }))
    } catch (error) {
      console.log("Error: ", error)
    }
    setLoading(false)
  }

  // if(showCodeBox) {
  //   return (
  //     <SafeAreaView>
  //       <KeyboardAvoidingView
  //         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  //         style={styles.container}
  //       >
  //         <View style={styles.topView}>
  //           <Text style={styles.topText}>Enter your Unique Code</Text>
  //           <TextInput 
  //             style={styles.codeInput}
  //             value={userCode}
  //             onChangeText={setUserCode}
  //           />
  //         </View>
  //         <TouchableOpacity onPress={verifyUserCode} style={styles.button}>
  //           <Text style={styles.buttonText}>
  //             {loading ? "Verifying..." : "Verify Code"}
  //           </Text>
  //         </TouchableOpacity>
  //       </KeyboardAvoidingView>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <MaterialIcons name="lock-outline" size={44} color="#7F082E" />
        <Text style={styles.topText}>Enter your 6 digit PIN</Text>
      </View>
      <OtpInput 
        numberOfDigits={6} 
        onTextChange={(text) => setOtpInput(text)} 
        // focusColor="green"
        autoFocus={false}
        hideStick={true}
        // placeholder="******"
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={true}
        focusStickBlinkingDuration={500}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
        onFilled={(text) => console.log(`OTP is ${text}`)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.container,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          placeholderTextStyle: styles.placeholderText,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
        }}
      />
       {/* <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({ android: 'sms-otp', default: 'oneTimeCode' })}
        testID="my-code-input"
        // renderCell={({index, symbol, isFocused}) => (
        //   <Text
        //     key={index}
        //     style={[styles.cell, isFocused && styles.focusCell]}
        //     onLayout={getCellOnLayoutHandler(index)}>
        //     {symbol || (isFocused ? <Cursor/> : null)}
        //   </Text>
        // )}
        renderCell={renderCell}
      /> */}
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>
          Forgot your PIN?
          <Text style={styles.resetText}>
            {" "}RESET
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default PinScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  codeInput: {
    height: 40,
    borderColor: "#7F082E",
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 10,
    width: 200,
  },
  button: {
    backgroundColor: "#7F082E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  topView: {
    alignItems: "center",
    marginVertical: 30,
    gap: 20,
  },
  topText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7F082E",
  },
  bottomText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  bottomView: {
    alignItems: "center",
    marginTop: 30,
    gap: 2,
  },
  resetText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7F082E",
    marginLeft: 2,
  },
  pinCodeContainer: {
    borderColor: "#7F082E",
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
  },
  pinCodeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  focusStick: {
    backgroundColor: "black",
  },
  activePinCodeContainer: {
    borderColor: "green",
    borderWidth: 2,
  },
  placeholderText: {
    color: "gray",
  },
  filledPinCodeContainer: {
    borderWidth: 0,
  },
  disabledPinCodeContainer: {
    backgroundColor: "lightgray",
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
})