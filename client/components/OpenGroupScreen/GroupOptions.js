import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import GroupOptionsButton from "./GroupOptionsButton";
import { useContext } from "react";
import { GeneralContext } from "../../context/generalContext";

export default function GroupOptions({
  showModal,
  currentGroup,
  setShowModal,
  setShowRenameGroupModal,
}) {
  const { currentUser } = useContext(GeneralContext);
  const handleRenameGroupModal = () => {
    setShowModal(false);
    setShowRenameGroupModal(true);
  };
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent>
      <Pressable
        onPress={() => setShowModal(false)}
        style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {currentUser._id === currentGroup.owner && (
            <>
              <GroupOptionsButton text="Delete Group" />
              <GroupOptionsButton
                text="Rename Group"
                pressFunction={handleRenameGroupModal}
              />
            </>
          )}
          <GroupOptionsButton text="Leave Group" />
        </View>
      </Pressable>
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
    borderRadius: 6,
  },
});
