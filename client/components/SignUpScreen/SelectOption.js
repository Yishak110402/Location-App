import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { AuthContext } from "../../context/authContext";

export default function SelectOption({ option, index, setShowModal }) {
  const { signUpData, setSignUpData } = useContext(AuthContext);
  const handlePress = () => {
    console.log("Pressed");
    setSignUpData((form) => ({ ...form, gender: option }));
    setShowModal(false)
  };
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.btnContainer}>
        <View
          style={[
            styles.circleButton,
            signUpData.gender === option && styles.selectedCircle,
          ]}></View>
        <Text style={[styles.optionText]}>{option.toUpperCase()}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 1,
    marginTop: 8,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 10,
  },
  circleButton: {
    borderRadius: 999,
    width: 25,
    height: 25,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
  },
  selectedCircle: {
    backgroundColor: "black",
  },
});
