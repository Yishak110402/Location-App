import { useContext } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { GroupContext } from "../../context/groupContext";

export default function CreateGroupModal({ showModal, setShowModal }) {
  const {
    showCreateGroupModal,
    setShowCreateGroupModal,
    setNewGroupName,
    newGroupName,
    createGroup
  } = useContext(GroupContext);
  return (
    <Modal
      animationType="fade"
      style={{ flex: 1 }}
      transparent
      visible={showCreateGroupModal}
      onRequestClose={() => setShowCreateGroupModal(false)}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.headerText}>Give your group a name</Text>
            <TextInput
              placeholder="Group Name"
              style={styles.nameInput}
              autoCapitalize="words"
              autoCorrect={false}
              value={newGroupName}
              onChangeText={(text) => setNewGroupName(text)}
            />
          </View>
          <Pressable onPress={createGroup}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnTexts}>Create</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  innerContainer: {
    backgroundColor: "#f7f7f7",
    width: "100%",
    paddingBlock: 15,
    paddingInline: 10,
  },
  btnContainer: {
    backgroundColor: "#262626",
    borderRadius: 5,
    padding: 4,
    width: 100,
  },
  btnTexts: {
    fontSize: 14,
    fontfamily: "Montserrat-Regular",
    color: "#f7f7f7",
    textAlign: "center",
  },
  nameInput: {
    borderWidth: 1,
    color: "#262626",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBlock: 10,
    paddingLeft: 5,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
});
