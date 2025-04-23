import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { GeneralContext } from "../context/generalContext";
import GroupListItem from "../components/Groups/GroupListItem";
import CreateGroupModal from "../components/Groups/CreateGroupModal";

export default function HomeScreen() {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(true)
  const { fetchUserGroups, allGroups, loadingGroups } =
    useContext(GeneralContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserGroups();
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>Groups</Text>
        {!loadingGroups && allGroups.length === 0 && (
          <View style={styles.noGroupTextContainer}>
            <Text style={styles.noGroupText}>You are not in any groups!</Text>
          </View>
        )}
      </View>
      <Pressable onPress={()=>(setShowCreateGroupModal(true))}>
        <View style={styles.btnContainer}>
          <Text style={styles.btnText}>Create Group</Text>
        </View>
      </Pressable>
      <CreateGroupModal showModal={showCreateGroupModal} setShowModal={setShowCreateGroupModal} />
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
    fontFamily: "Montserrat-Regular",
    color: "#262626",
    textAlign: "center",
    marginBlock: 15,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  btnText: {
    color: "#f7f7f7",
    fontFamily: "Montserrat-Regular",
  },
  noGroupText: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  noGroupTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
