import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmailVerificationCodeModal() {
  const {
    showVerificationCodeModal,
    setShowVerificationCodeModal,
    setVerificationCode,
    verificationCode,
    verifyEmailAddress,
    signUp
  } = useContext(AuthContext);
  const [seconds, setSeconds] = useState(5);
  const [disabled, setDisabled] = useState(true);
  const closeModal = () => {
    setShowVerificationCodeModal(false);
  };
  useEffect(() => {
    if (seconds <= 0) {
      setDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setSeconds((sec) => sec - 1);
    }, 1000);

    return () => {
      return clearInterval(timer);
    };
  }, [seconds]);

  useEffect(() => {
    const checkCode = async () => {
      const stringCode = await AsyncStorage.getItem(
        "circletrack-verificationcode"
      );
      if (!stringCode) {
        console.log("No code found yet");
        return;
      }
      const savedCode = JSON.parse(stringCode);
      if (verificationCode.length < 6) {
        console.log(verificationCode.length);
        return;
      }
      if (Number(verificationCode) !== savedCode) {
        Alert.alert("Error", "Incorrect code");
        setVerificationCode("");
        Keyboard.dismiss();
        return;
      }
      console.log("Correct");
      closeModal()      
      await signUp()
      // await verifyEmailAddress();
    };

    checkCode();
  }, [verificationCode]);
  return (
    <Modal
      transparent
      onRequestClose={closeModal}
      visible={showVerificationCodeModal}>
      <Pressable style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>
            Enter the code we sent to your email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            onChangeText={(text) => setVerificationCode(text)}
            maxLength={6}
            keyboardType="number-pad"
            value={verificationCode}
            placeholderTextColor={"#f7f7f7"}
          />
          <Pressable
            style={[styles.verifyBtnContainer, disabled && styles.disabledBtn]}>
            <Text style={styles.verifyBtnText}>
              {disabled ? `Resend in ${seconds} seconds` : "Resend"}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "rgba(37, 48, 12,0.25)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "#25300c",
    width: "100%",
    paddingBottom: 20,
    paddingInline: 10,
  },
  header: {
    fontSize: 17,
    fontFamily: "M-SemiBold",
    marginBlock: 10,
    color:"#f7f7f7"
  },
  input: {
    borderWidth: 2,
    marginTop: 8,
    borderRadius: 8,
    fontSize: 18,
    letterSpacing: 5,
    borderColor:"#f7f7f7",
    color:"#f7f7f7",
  },
  verifyBtnContainer: {
    backgroundColor: "#f7f7f7",
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    paddingBlock: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  verifyBtnText: {
    color: "#25300c",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
  disabledBtn: {
    opacity: 0.8,
  },
});
