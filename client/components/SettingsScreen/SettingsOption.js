import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function SettingsOption({
  text = "Option",
  iconName = "mail",
  pressFunction = () => {
    Alert.alert("Pressed");
  },
}) {
  return (
    <Pressable
      onPress={pressFunction}
      android_ripple={{ color: "#262626" }}
      style={styles.container}>
      <Ionicons color={"#25300c"} name={iconName} size={30} />
      <Text style={styles.optionText}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: "45%",
    padding: 5,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B8C8B7",
    borderRadius: 12,
    marginVertical: 5
  },
  optionText: {
    fontFamily: "M-Medium",
    fontSize: 15,
    marginTop: 10,
  },
});
