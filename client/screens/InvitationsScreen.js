import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GroupContext } from "../context/groupContext";
import InvitationListItem from "../components/InvitationsScreen/InvitationListItem";

export default function InvitationsScreen() {
  const { loadAllInvitations, allInvitations } = useContext(GroupContext);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    loadAllInvitations();
  }, []);
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllInvitations();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Invitations</Text>
      <View style={styles.invitationsContainer}>
        {allInvitations.length === 0 && (
          <View>
            <Text>You have no invitations yet</Text>
          </View>
        )}
        {allInvitations.length !== 0 && (
          <FlatList
            renderItem={({ item }) => {
              return <InvitationListItem invitation={item} />;
            }}
            keyExtractor={(item) => {
              return item._id;
            }}
            data={allInvitations}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: 8,
    paddingBlock: 12,
    flex: 1,
  },
  header: {
    fontFamily: "Montserrat-Regular",
    color: "#262626",
    textAlign: "center",
    marginBlock: 15,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  invitationsContainer: {
    flex: 1,
  },
});
