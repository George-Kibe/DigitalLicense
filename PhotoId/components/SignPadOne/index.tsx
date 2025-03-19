import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

interface SignPadOneProps {
  text: string;
  onOK: (signature: string) => void;

}

const SignPadOne = ({ text, onOK }: SignPadOneProps) => {
  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: string) => {
    console.log(signature);
    onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data: any) => {
    console.log(data);
  };

  return (
   <View style={styles.container}>
     <SignatureScreen
      ref={ref}
      onEnd={handleEnd}
      onOK={handleOK}
      onEmpty={handleEmpty}
      onClear={handleClear}
      onGetData={handleData}
      autoClear={true}
      descriptionText={text}
    />
   </View>
  );
};

export default SignPadOne;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 400,
    width: "100%",
    marginTop: 20
  },
})

