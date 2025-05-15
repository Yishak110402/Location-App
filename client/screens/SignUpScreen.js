import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SelectOption from "../components/SignUpScreen/SelectOption";
import { AuthContext } from "../context/authContext";
import ErrorDisplay from "../components/SignUpScreen/ErrorDisplay";
import EmailVerificationCodeModal from "../components/SignUpScreen/EmailVerificationCodeModal";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function SignUpScreen() {
  const [showModal, setShowModal] = useState(false);
  const {
    signUpData,
    setSignUpData,
    error,
    showError,
    signUp,
    signingUp,
    verifyEmailAddress,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const transform = useSharedValue(1000);
  const modalTransformStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transform.value }],
    };
  }, []);
  const openModalAnimation = () => {
    transform.value = withTiming(0, { duration: 500, easing: Easing.ease });
  };
  const openGenderModal = () => {
    setShowModal(true);
    setTimeout(() => {
      openModalAnimation();
    }, 10);
  };
  const goToLogIn = () => {
    navigation.navigate("Log In");
  };

  useEffect(() => {
    const backHandler = () => {
      console.log("No going back");
      return true;
    };
    const backPress = BackHandler.addEventListener(
      "hardwareBackPress",
      backHandler
    );
    return () => backPress.remove();
  }, []);

  const options = ["male", "female"];
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled">
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
          <Text style={styles.signUp}>Sign Up</Text>
          <Text style={styles.create}>Create your account</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setSignUpData((form) => ({ ...form, name: text }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Email</Text>
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
            <Text style={styles.formLabel}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setSignUpData((form) => ({ ...form, username: String(text) }))
              }
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Password</Text>
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
            <Text style={styles.formLabel}>Gender</Text>
            <Pressable onPress={openGenderModal}>
              <View style={styles.selectedOptionContainer}>
                <Text style={styles.selectedOptionText}>
                  {signUpData.gender === ""
                    ? "Select"
                    : signUpData.gender.toUpperCase()}
                </Text>
              </View>
            </Pressable>
          </View>
          <Pressable
            style={styles.registerBtnContainer}
            disabled={signingUp}
            onPress={verifyEmailAddress}>
            <View>
              <Text style={styles.registerBtnText}>
                {signingUp ? "Registering..." : "Register"}
              </Text>
            </View>
          </Pressable>
          <View style={styles.navOptionsContainer}>
            <Text style={styles.alreadyGotText}>Already got an account?</Text>
            <Pressable onPress={goToLogIn}>
              <Text style={[styles.alreadyGotText, styles.goToLogInText]}>
                Log In?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Modal visible={showModal} animationType="fade" transparent>
        <Pressable
          onPress={() => setShowModal(false)}
          style={styles.modalContainer}>
          <Animated.View style={[modalTransformStyle, styles.modal]}>
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
          </Animated.View>
        </Pressable>
      </Modal>
      <EmailVerificationCodeModal />
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
  signUp: {
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
    flex: 1,
    justifyContent: "center",
    paddingInline: 10,
    paddingBottom: 60,
    paddingTop: 10,
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
    fontSize: 13,
    borderWidth: 2,
    width: "100%",
    borderRadius: 5,
    height: 40,
    borderColor: "#25300C",
    marginBottom: 5,
    backgroundColor: "#B8C8B7",
    paddingBlock: 5,
    fontFamily:"M-Regular",
    paddingHorizontal:10
  },
  modalContainer: {
    backgroundColor: "rgba(37, 48, 12,0.25)",
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
    color:"#f7f7f7"
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
    gap: 2,
    marginTop: 10,
  },
  alreadyGotText: {
    color: "#25300C",
    fontSize: 15,
    fontFamily: "M-Regular",
  },
  goToLogInText: {
    fontFamily: "M-SemiBold",
    borderBottomWidth: 3,
    borderBottomColor: "#25300C",
  },
});
