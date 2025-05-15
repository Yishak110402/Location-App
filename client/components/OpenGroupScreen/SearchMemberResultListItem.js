import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";

export default function SearchMemberResultListItem() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("./../../assets/profile pic.jpg")}
      />
      <View>
        <Text style={styles.name}>Yishak</Text>
        <Text style={styles.indicator}>Online</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 73,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 15,
    backgroundColor:"#25300c"
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 999,
  },
  name: {
    fontSize: 16,
    fontFamily: "M-Medium",
    color:"white"
  },
  indicator: {
    fontFamily: "M-SemiBold",
    fontSize: 11,
    color: "#56D15E",
  },
});
