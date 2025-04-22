import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../context/authContext";
import ErrorDisplay from "../components/SignUpScreen/ErrorDisplay";

export default function LogInScreen() {
  const navigation = useNavigation();
  const { logIn, setLoginData, showError, error, logInData } = useContext(AuthContext);
  const goToSignUp = () => {
    navigation.navigate("Sign Up");
  };
  const goToMainScreen = () => {
    navigation.navigate("Main");
  };
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
        <Text style={styles.headerText}>Log In</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={logInData.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) =>
                setLoginData((form) => ({ ...form, email: text }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              value={logInData.password}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) =>
                setLoginData((form) => ({ ...form, password: text }))
              }
            />
          </View>
          <Pressable onPress={logIn}>
            <View>
              <Text>Log In</Text>
            </View>
          </Pressable>
          <Pressable onPress={goToSignUp}>
            <View>
              <Text>I don't have an account</Text>
            </View>
          </Pressable>
        </View>
      </View>
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
  errorsContainer: {
    position: "absolute",
    right: 5,
    top: 45,
  },
});
