import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ChangePasswordModal({
  showChangePasswordModal,
  setShowChangePasswordModal,
  value = ""
}) {
  const closeModal = () => {
    setShowChangePasswordModal(false);
  };
  return (
    <Modal
      visible={showChangePasswordModal}
      onRequestClose={closeModal}
      transparent>
      <Pressable onPress={closeModal} style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Enter Old Password</Text>
          <TextInput value={value} style={styles.textInput} />
          <Text style={styles.label}>Enter New Password</Text>
          <TextInput style={styles.textInput}/>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput style={styles.textInput}/>
          <Pressable>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Change Password</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "flex-end",
  },
  innerContainer: {
    backgroundColor: "#f7f7f7",
    paddingBottom: 10,
    paddingTop: 5,
    paddingInline: 8,
  },
  label: {
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    padding: 2,
    width: "90%",
    borderRadius: 8,
    marginBlock: 10,
  },
  btnContainer: {
    backgroundColor: "#262626",
    padding: 5,
    width: 139,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnText: {
    color: "#f7f7f7",
    fontFamily: "Montserrat-Regular",
    marginTop: 10,
  },
});
