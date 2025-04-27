import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import GroupOptionsButton from "./GroupOptionsButton";

export default function GroupOptions({
  showModal,
  currentGroup,
  setShowModal,
}) {
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <GroupOptionsButton text="Delete Group" />
          <GroupOptionsButton text="Leave Group" />
          <GroupOptionsButton text="Rename Group" />          
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: "#f7f7f7",
    width: "70%",
    paddingBlock: 25,
    borderRadius: 6
  },
});
