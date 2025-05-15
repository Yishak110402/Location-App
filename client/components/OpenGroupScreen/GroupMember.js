import { useContext, useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Image, Pressable } from "react-native";
import { GeneralContext } from "../../context/generalContext";
import { Ionicons } from "@expo/vector-icons";
import { GroupContext } from "../../context/groupContext";

export default function GroupMember({
  member,
  availableMembersIds,
  currGroup,
}) {
  const { localIp, currentUser } = useContext(GeneralContext);
  const { kickMemberFromGroup } = useContext(GroupContext);
  const [memberData, setMemberData] = useState({ name: "Loading..." });
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${localIp}/user/${member}`);
      if (!res.ok) {
        Alert.alert("Error", "Failed to connect to the server");
        return;
      }
      const data = await res.json();
      if (data.status === "fail") {
        Alert.alert("Error", data.message);
        return;
      }
      setMemberData(data.data.user);
    };
    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("./../../assets/group profile.png")}
      />
      <Text style={styles.textStyle}>
        {memberData.name ? memberData.name : ""}
      </Text>
      <Text style={styles.onlineText}>Online</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#b8c8b7",
    marginRight: 20,
    width: 120,
    height: 98,
    marginTop: 24,
    padding: 10,
  },
  image: {
    width: 61,
    height: 50,
    borderRadius: 8,
    textAlign: "center",
  },
  textStyle: {
    fontFamily: "M-Regular",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5
  },
  onlineText: {
    fontSize: 11,
    fontFamily: "M-SemiBold",
    color:"#3F8643"
  },
});
