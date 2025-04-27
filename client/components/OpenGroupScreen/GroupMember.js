import { useContext, useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { GeneralContext } from "../../context/generalContext";

export default function GroupMember({ member, availableMembersIds }) {
  const { localIp } = useContext(GeneralContext);
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
      <View style={[styles.indicator,availableMembersIds.includes(memberData._id)?{backgroundColor:"green"} : {backgroundColor:"red"}]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    marginInline: 10,
    justifyContent: "center",
    marginBlock: 15,
    paddingInline: 25,
    textAlign: "center",
    alignItems: "center",
    paddingBlock: 15,
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "contain",
    borderRadius: 999,
    textAlign: "center",
  },
  textStyle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    textAlign: "center",
    marginTop: 15,
  },
  indicator:{
    width: 10,
    height: 10,
    borderRadius: 999,
    // backgroundColor:'green'
  }
});
