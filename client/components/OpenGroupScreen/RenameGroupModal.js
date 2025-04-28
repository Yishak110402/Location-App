import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RenameGroupModal({ showModal, setShowModal }) {
  return (
    <Modal transparent visible={showModal}>
      <Pressable
        onPress={() => setShowModal(false)}
        style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.labelText}>New Group Name</Text>
          <TextInput
            style={styles.input}
            placeholder="New Name"
            autoCapitalize="sentences"
          />
          <Pressable style={styles.btnContainer}>
            <View>
              <Text style={styles.btnText}>Edit Name</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    backgroundColor: "#f7f7f7",
    width: "100%",
    paddingInline: 5,
    paddingBottom: 15,
  },
  labelText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    marginBlock: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
  },
  btnContainer: {
    backgroundColor: "#262626",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    marginTop: 15,
    borderRadius: 8,
  },
  btnText: {
    color: "#f7f7f7",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
});
