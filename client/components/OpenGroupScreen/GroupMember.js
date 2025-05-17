import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { GeneralContext } from "../../context/generalContext";
import { GroupContext } from "../../context/groupContext";

export default function GroupMember({
  member,
  currGroup,
  mapRef,
  availableMembersIds,
  locations
}) {
  const { localIp, currentUser } = useContext(GeneralContext);
  const { kickMemberFromGroup, fetchUser } = useContext(GroupContext);
  const [memberData, setMemberData] = useState({ name: "Loading..." });
  useEffect(() => {
    const loadUserDetails = async () => {
      const data = await fetchUser(member);
      console.log(data);
      setMemberData(data);
    };
    loadUserDetails()
  }, []);

  const handlePress = ()=>{
    const userIndex = availableMembersIds.indexOf(member)
    const userLocation = locations[userIndex]
    const locationData = {
      latitude: userLocation.location.latitude,
      longitude: userLocation.location.longitude,
    }
    mapRef.current.animateCamera({
      center: locationData,
      zoom: 20
    },{duration: 1000})
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        style={styles.image}
        source={require("./../../assets/group profile.png")}
      />
      <Text style={styles.textStyle}>
        {memberData.name ? memberData.name : ""}
      </Text>
      <Text style={styles.onlineText}>Online</Text>
    </Pressable>
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
    height: 105,
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
    marginTop: 5,
  },
  onlineText: {
    fontSize: 11,
    fontFamily: "M-SemiBold",
    color: "#3F8643",
  },
});
