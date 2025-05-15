import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GroupContext } from "../../context/groupContext";

export default function InvitationListItem({ invitation }) {
  const { getGroupDetails, rejectInvitation, acceptInvitation } =
    useContext(GroupContext);
  const [details, setDetails] = useState({});
  useEffect(() => {
    if (!invitation) return;
    const fetchDetails = async () => {
      setDetails(await getGroupDetails(invitation.invitedToGroup));
    };
    fetchDetails();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.groupProfilePicture} source={require("./../../assets/group profile.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.groupName}>
          Invited to:- {details.name ? details.name : "Loading..."}
        </Text>
        <View style={styles.btnContainerView}>
          <Pressable onPress={() => acceptInvitation(invitation._id)}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Accept</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => rejectInvitation(invitation._id)}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Reject</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection:"row",
    alignItems:'center',
    backgroundColor:"#25300c",
    height: 100
  },
  btnContainerView: {
    flexDirection: "row",
    marginTop: 5
  },
  btnContainer: {
    backgroundColor: "#b8c8b7",
    height: 30,
    width: 85,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    marginRight: 55
  },
  btnText: {
    color: "#25300c",
    fontSize: 12,
    fontFamily: "M-Regular",
  },
  inviterText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
  groupName: {
    fontSize: 18,
    fontFamily: "M-SemiBold",
    color:"#f7f7f7"
  },
  groupProfilePicture:{
    width: 55,
    height: 55,
    borderRadius: 999,
    marginRight: 26
  }
});
