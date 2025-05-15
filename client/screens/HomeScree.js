import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, View } from "react-native";
import { GeneralContext } from "../context/generalContext";
import GroupListItem from "../components/Groups/GroupListItem";
import CreateGroupModal from "../components/Groups/CreateGroupModal";
import { GroupContext } from "../context/groupContext";
import CreateNewGroupButton from "../components/Groups/CreateNewGroupButton";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { showCreateGroupModal, setShowCreateGroupModal } =
    useContext(GroupContext);
  const { fetchUserGroups, allGroups, loadingGroups } =
    useContext(GeneralContext);
  useEffect(() => {
    fetchUserGroups();
  }, []);
  useEffect(() => {
    const backPress = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backPress
    );
    return () => backHandler.remove();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserGroups();
    setRefreshing(false);
  };
  const openNewGroupModal = ()=>{
    setShowCreateGroupModal(true)
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>Groups</Text>
        <FlatList
          data={allGroups}
          renderItem={({ item }) => {
            return <GroupListItem group={item} />;
          }}
          keyExtractor={(item) => {
            return item._id;
          }}
          ListEmptyComponent={
            <View style={styles.noGroupTextContainer}>
              <Text style={styles.noGroupText}>You are not in any groups!</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
      <CreateNewGroupButton pressFunction={openNewGroupModal} />
      <CreateGroupModal
        showModal={showCreateGroupModal}
        setShowModal={setShowCreateGroupModal}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 10,
  },
  btnContainer: {
    padding: 5,
    backgroundColor: "black",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "M-SemiBold",
    color: "#25300c",
    textAlign: "center",
    marginBlock: 15,
    fontSize: 25,
    textDecorationLine: "underline",
  },
  btnText: {
    color: "#f7f7f7",
    fontFamily: "Montserrat-Regular",
  },
  noGroupText: {
    fontSize: 20,
    fontFamily: "M-Regular",
    color:"#25300c",
    marginTOp: 25
  },
  noGroupTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
