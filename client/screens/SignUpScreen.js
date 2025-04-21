import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SelectOption from "../components/SignUpScreen/SelectOption";

export default function SignUpScreen() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const goToLogIn = () => {
    navigation.navigate("Log In");
  };
  const options = ["male", "female"];
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Create Account</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text>Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput style={styles.input} keyboardType="email-address" />
          </View>
          <View style={styles.inputContainer}>
            <Text>Username</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} />
          </View>
          <Pressable>
            <View>
              <Text>Sign Up</Text>
            </View>
          </Pressable>
          <Pressable onPress={goToLogIn}>
            <View>
              <Text>I have an account</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Modal visible={true}>
        <View style={styles.modal}>
          <Text>Select Gender</Text>
          <View>
            {
                options.map((opt, index)=>(
                    <SelectOption option={opt} index={index} />
                ))
            }
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 5,
    paddingBlock: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: "Montserrat-Regular",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingInline: 5,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    marginBottom: 5,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: "75%",
    borderRadius: 5,
  },
  modalContainer:{
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 2
  },
  modal:{
    // position: 'absolute',
    // zIndex: 100,
    // bottom: -100,
    // right: 0,
    marginTop: 100
  }
});
