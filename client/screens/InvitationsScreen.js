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
        <FlatList
          renderItem={({ item }) => {
            return <InvitationListItem invitation={item} />;
          }}
          keyExtractor={(item) => {
            return item._id;
          }}
          data={allInvitations}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>You have no invitations yet</Text>
            </View>
          }
        />
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
    fontFamily: "M-SemiBold",
    color: "#25300c",
    textAlign: "center",
    marginBlock: 15,
    fontSize: 25,
    textDecorationLine: "underline",
  },
  invitationsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "M-Regular",
    color: "#25300c",
    marginTop: 25,
  },
});
