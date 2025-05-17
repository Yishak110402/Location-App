import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { GroupContext } from "../../context/groupContext";

export default function SearchMemberResultListItem({ memberId }) {
  const [memberData, setmemberData] = useState({ shortName: "Loading..." });
  const { fetchUser, availableMembersIds } = useContext(GroupContext);

  useEffect(() => {
    const loadUserDetails = async () => {
      const data = await fetchUser(memberId);
      setmemberData(data);
      const name = data.name;
      const shortName = data.name.length <= 8 ? name : name.slice(0, 9) + "...";
      const isOnline = availableMembersIds.includes(data._id);
      setmemberData((prev) => ({ ...prev, shortName, isOnline }));
    };
    loadUserDetails();
  }, []);

  return (
    <Pressable style={styles.container}>
      <Image
        style={styles.image}
        source={require("./../../assets/profile pic.jpg")}
      />
      <View>
        <Text style={styles.name}>{memberData.shortName}</Text>
        <Text style={[styles.indicator, memberData.isOnline ? styles.onlineIndicator : styles.offlineIndicator]}>
          {memberData.isOnline ? "Online" : "Offline"}
        </Text>
      </View>
    </Pressable>
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
    backgroundColor: "#25300c",
    marginRight: 20,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 999,
  },
  name: {
    fontSize: 12,
    fontFamily: "M-Medium",
    color: "white",
  },
  indicator: {
    fontFamily: "M-SemiBold",
    fontSize: 11,
  },
  onlineIndicator: {
    color: "#56D15E",
  },
  offlineIndicator:{
    color:"#D25734"
  }
});
