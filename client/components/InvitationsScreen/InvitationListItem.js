import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GroupContext } from "../../context/groupContext";

export default function InvitationListItem({ invitation }) {
  const { getGroupDetails, rejectInvitation, acceptInvitation } = useContext(GroupContext);
  const [details, setDetails] = useState({});
  useEffect(() => {
    if (!invitation) return;
    const fetchDetails = async () => {
     setDetails(await getGroupDetails(invitation.invitedToGroup))
    };
    fetchDetails();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>Invited to the group:- {details.name ? details.name : "Loading..."}</Text>
      <View style={styles.btnContainerView}>
        <Pressable onPress={()=> acceptInvitation(invitation._id)}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Accept Invitation</Text>
          </View>
        </Pressable>
        <Pressable onPress={()=> rejectInvitation(invitation._id)}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Reject Invitation</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
  },
  btnContainerView: {
    flexDirection: "row",
    gap: 50,
  },
  btnContainer: {
    backgroundColor: "#262626",
    padding: 10,
    marginBlock: 15,
    borderRadius: 8,
  },
  btnText: {
    color: "#f7f7f7",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  inviterText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
  groupName: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
});
