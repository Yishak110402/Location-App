import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function GroupListItem({ group }) {
  const navigation = useNavigation();
  const goToSelectedGroup = () => {
    navigation.navigate("Open Group Screen", {
      group,
    });
  };

  return (
    <Pressable onPress={goToSelectedGroup}>
      <View style={styles.itemContainer}>
        <View>
          <Image style={styles.groupProfileImage} alt="Group profile picture" source={require("./../../assets/group profile.png")} />
        </View>
        <View>
          <Text style={styles.itemText}>{group.name}</Text>
          <Text style={styles.itemSubText}>
            {group.members.length} member{group.members.length > 1 ? "s" : ""}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
    paddingInline: 5,
    paddingBlock: 10,
    flexDirection:'row',
    backgroundColor:"#25300c",
    alignItems:'center',
    height: 92
  },
  itemText: {
    fontSize: 24,
    fontFamily: "M-SemiBold",
    color:"white",
    marginBottom: -5
  },
  itemSubText: {
    fontSize: 15,
    fontFamily: "M-Regular",
    color:"#B8C8B7"
  },
  groupProfileImage:{
    height: 55,
    width:55,
    marginRight: 30,
    borderRadius: 999
  }
});
