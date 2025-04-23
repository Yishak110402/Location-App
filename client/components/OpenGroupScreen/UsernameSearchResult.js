import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { GroupContext } from "../../context/groupContext";

export default function UsernameSearchResult({ result, currentGroupId }) {
    const {sendInvitation} = useContext(GroupContext)
  return (
    <Pressable onPress={()=>(sendInvitation(result._id, currentGroupId))}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./../../assets/profile pic.jpg")}
        />
        <Text style={styles.usernameText}>{result.username}</Text>
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
    gap: 30,
    paddingInline: 10,
    paddingBlock: 8,
    backgroundColor: "#262626",
    borderRadius: 9,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 999,
  },
  usernameText: {
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    color: "#fff",
  },
});
