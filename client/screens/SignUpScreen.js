import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { BackHandler, Modal, Pressable, StyleSheet } from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SelectOption from "../components/SignUpScreen/SelectOption";
import { AuthContext } from "../context/authContext";
import ErrorDisplay from "../components/SignUpScreen/ErrorDisplay";

export default function SignUpScreen() {
  const [showModal, setShowModal] = useState(false);
  const { signUpData, setSignUpData, error, showError, signUp } =
    useContext(AuthContext);
  const navigation = useNavigation();
  const goToLogIn = () => {
    navigation.navigate("Log In");
  };

  useEffect(() => {
    const backHandler = () => {
      return true;
    };
    const backPress = BackHandler.addEventListener(
      "hardwareBackPress",
      backHandler
    );
    return () => backPress.remove()
  }, []);

  const options = ["male", "female"];
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {showError && (
        <View style={styles.errorsContainer}>
          {error.map((err) => (
            <ErrorDisplay err={err} />
          ))}
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.headerText}>Create Account</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setSignUpData((form) => ({ ...form, name: text }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) =>
                setSignUpData((form) => ({ ...form, email: text }))
              }
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setSignUpData((form) => ({ ...form, username: text }))
              }
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) =>
                setSignUpData((form) => ({ ...form, password: text }))
              }
              autoCapitalize="none"
            />
          </View>
          <View style={styles.selectContainer}>
            <Text>Gender</Text>
            <Pressable onPress={() => setShowModal(true)}>
              <View style={styles.selectedOptionContainer}>
                <Text style={styles.selectedOptionText}>
                  {signUpData.gender === ""
                    ? "Select"
                    : signUpData.gender.toUpperCase()}
                </Text>
              </View>
            </Pressable>
          </View>
          <Pressable onPress={signUp}>
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
      <Modal visible={showModal} animationType="fade" transparent>
        {/* <Pressable onPress={()=>(setShowModal(false))}> */}
        <Pressable onPress={()=>(setShowModal(false))} style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalHeader}>Select Gender</Text>
            <View>
              {options.map((opt, index) => (
                <SelectOption
                  option={opt}
                  index={index}
                  setShowModal={setShowModal}
                />
              ))}
            </View>
          </View>
        </Pressable>
        {/* </Pressable> */}
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
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
    display: "flex",
    flex: 1,
  },
  modal: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 25,
  },
  modalHeader: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    marginBottom: 15,
  },
  selectContainer: {
    flexDirection: "row",
    gap: 40,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  selectedOptionContainer: {
    backgroundColor: "#262626",
    paddingInline: 10,
    paddingBlock: 5,
    borderRadius: 5,
    width: 150,
  },
  selectedOptionText: {
    color: "white",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
  errorsContainer: {
    position: "absolute",
    right: 5,
    top: 45,
  },
});
