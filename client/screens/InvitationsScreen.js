import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GroupContext } from "../context/groupContext";
import InvitationListItem from "../components/InvitationsScreen/InvitationListItem";

export default function InvitationsScreen() {
  const { loadAllInvitations, allInvitations } = useContext(GroupContext);
  useEffect(() => {
    loadAllInvitations();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Invitations</Text>
      <View style={styles.invitationsContainer}>
        <ScrollView>
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
            <InvitationListItem />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingInline: 8,
        paddingBlock: 12, 
        flex: 1       
    },
    header:{
        fontFamily: "Montserrat-Regular",
        color: "#262626",
        textAlign: "center",
        marginBlock: 15,
        fontSize: 20,
        textDecorationLine: "underline",
    },
    invitationsContainer:{
        flex:1,
    }
})