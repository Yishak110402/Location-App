import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MemberOptionsButtons from "./MemberOptionsButtons";
import { useContext } from "react";
import { GroupContext } from "../../context/groupContext";

export default function MemberOptionsModal() {
  const { showMemberOptionsModal, setShowMemberOptionsModal, clickedMember } =
    useContext(GroupContext);
    const closeModal = ()=>{
        setShowMemberOptionsModal(false)
    }
  return (
    <Modal visible={showMemberOptionsModal} transparent onRequestClose={closeModal}>
      <Pressable onPress={closeModal} style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.memberName}>{clickedMember.name}</Text>
          <MemberOptionsButtons />
        </View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "rgba(37, 48, 12,0.25)",
    flex: 1,
    justifyContent: "flex-end",
  },
  innerContainer: {
    height: 200,
    backgroundColor: "#f7f7f7",
  },
  memberName: {
    fontFamily: "M-SemiBold",
    fontSize: 25,
    textAlign: "center",
    color: "#25300c",
    marginTop: 15,
  },
});
