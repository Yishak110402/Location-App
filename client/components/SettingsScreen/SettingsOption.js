import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function SettingsOption({ text = "Option", iconName = "mail", pressFunction=()=>{
    Alert.alert("Pressed")
} }) {
  return (
    <Pressable onPress={pressFunction} android_ripple={{color:"#262626"}} style={styles.container}>
        <Ionicons name={iconName} size={30} />
        <Text style={styles.optionText}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "45%",
    padding: 5,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    marginTop: 15,
  },
});
