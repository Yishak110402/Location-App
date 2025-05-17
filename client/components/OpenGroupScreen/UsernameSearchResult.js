import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { GroupContext } from "../../context/groupContext";

export default function UsernameSearchResult({ result, currentGroupId }) {
  const { sendInvitation } = useContext(GroupContext);
  return (
    <Pressable onPress={() => sendInvitation(result._id, currentGroupId)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./../../assets/profile pic.jpg")}
        />
        <View>
          <Text style={styles.nameText}>{result.name}</Text>
          <Text style={styles.usernameText}>@{result.username}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 5,
    alignItems: "center",
    gap: 15,
    height: 60,
    backgroundColor: "#25300c",
    borderRadius: 9,
    paddingHorizontal: 8
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 999,
  },
  usernameText: {
    fontSize: 11,
    fontFamily: "M-Light",
    color: "#fff",
  },
  nameText:{
    fontSize: 15,
    fontFamily:"M-Regular",
    color:"#fff"
  }
});
