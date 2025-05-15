import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../utils/socket";

export default function BackButton() {
  const navigation = useNavigation();
  const handleBackPress = () => {
    socket.disconnect()
    console.log(navigation.canGoBack());
    navigation.goBack();
  };
  return (
    <Pressable onPress={handleBackPress}>
      <View style={styles.btnContainer}>
        <Ionicons name="arrow-back" color={"#25300c"} size={35} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#B8C8B7",
    zIndex: 50000,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
});
