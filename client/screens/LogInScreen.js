import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../context/authContext";
import ErrorDisplay from "../components/SignUpScreen/ErrorDisplay";

export default function LogInScreen() {
  const navigation = useNavigation();
  const { logIn, setLoginData, showError, error, logInData, loggingIn } =
    useContext(AuthContext);
  const goToSignUp = () => {
    navigation.navigate("Sign Up");
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {showError && (
        <View style={styles.errorsContainer}>
          {error.map((err) => (
            <ErrorDisplay err={err} />
          ))}
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.shade}></View>
          <Image
            style={styles.headerImage}
            source={require("./../assets/images/green scenery.jpg")}
          />
          <Text style={styles.headerText}>CircleTrack</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.logIn}>Log In</Text>
          <Text style={styles.create}>Hop back in to your account</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Email</Text>
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
            <Text style={styles.formLabel}>Password</Text>
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
          <Pressable style={styles.registerBtnContainer} onPress={logIn}>
            <View>
              <Text style={styles.registerBtnText}>{loggingIn ? "Logging In..." : "Log In"}</Text>
            </View>
          </Pressable>
            <View style={styles.navOptionsContainer}>
              <Text style={styles.dontHaveText}>I don't have an account.</Text>
              <Pressable onPress={goToSignUp}>
                <Text style={styles.signUpText}>Sign Up?</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    flexDirection: "row",
  },
  headerImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1000,
    resizeMode: "cover",
  },
  headerText: {
    fontSize: 25,
    fontFamily: "M-Black",
    marginTop: 120,
    fontSize: 50,
    color: "#b8c8b7",
  },
  shade: {
    backgroundColor: "#25300C",
    opacity: 0.45,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -5,
  },
  main: {
    alignItems: "center",
  },
  logIn: {
    fontSize: 40,
    fontFamily: "M-ExtraBold",
    color: "#25300C",
  },
  create: {
    fontSize: 13,
    fontFamily: "M-Regular",
    marginTop: -10,
    color: "#25300C",
  },
  formContainer: {
    // flex: 1,
    justifyContent: "center",
    paddingInline: 10,
    paddingBottom: 60,
    marginTop: 30
    // paddingTop: 10,
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: "M-Regular",
    color: "#25300C",
    marginBottom: 0,
  },
  input: {
    fontSize: 11,
    borderWidth: 2,
    width: "100%",
    borderRadius: 5,
    height: 40,
    borderColor: "#25300C",
    marginBottom: 5,
    backgroundColor: "#B8C8B7",
    paddingBlock: 5,
  },
  modalContainer: {
    backgroundColor: "rgba(37, 48, 12,0.45)",
    justifyContent: "flex-end",
    display: "flex",
    flex: 1,
  },
  modal: {
    width: "100%",
    backgroundColor: "#25300c",
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    marginBottom: 15,
    color: "#f7f7f7",
  },
  selectContainer: {
    flexDirection: "row",
    gap: 40,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  selectedOptionContainer: {
    backgroundColor: "#25300C",
    paddingInline: 10,
    paddingBlock: 5,
    borderRadius: 5,
    width: 87,
  },
  selectedOptionText: {
    color: "white",
    fontFamily: "M-SemiBold",
    textAlign: "center",
    fontSize: 13,
    color: "#B8C8B7",
  },
  errorsContainer: {
    position: "absolute",
    right: 5,
    top: 45,
    zIndex: 10000,
  },
  registerBtnContainer: {
    width: "100%",
    backgroundColor: "#25300C",
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 10,
  },
  registerBtnText: {
    fontSize: 18,
    fontFamily: "M-SemiBold",
    color: "#B8C8B7",
  },
  navOptionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
  },
  dontHaveText: {
    color: "#25300C",
    fontSize: 15,
    fontFamily: "M-Regular",
  },
  signUpText: {
    fontFamily: "M-SemiBold",
    borderBottomWidth: 3,
    borderBottomColor: "#25300C",
  },
});
