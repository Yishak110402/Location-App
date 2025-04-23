import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GroupListItem({ group }) {
    const navigation = useNavigation()
    const goToSelectedGroup = ()=>{
        navigation.navigate("Open Group Screen",{
            group
        })
    }

  return (
    <Pressable onPress={goToSelectedGroup}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{group.name}</Text>
        <Text style={styles.itemSubText}>
          {group.members.length} member{group.members.length > 1 ? "s" : ""}
        </Text>
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
  },
  itemText: {
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    marginBottom: 8,
  },
  itemSubText: {
    fontSize: 13,
    fontFamily: "Poppins",
  },
});
