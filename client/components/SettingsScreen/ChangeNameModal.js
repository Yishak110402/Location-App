import { useContext } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../../context/authContext";
import { GeneralContext } from "../../context/generalContext";

export default function ChangeNameModal({
  showNameChangeModal,
  setShowChangeNameModal,
}) {
  const {changeName, newName, setNewName} = useContext(AuthContext)
  const {currentUser, setCurrentUser} = useContext(GeneralContext)
  const closeModal = () => {
    setShowChangeNameModal(false);
  };
  return (
    <Modal
      visible={showNameChangeModal}
      onRequestClose={closeModal}
      transparent>
      <Pressable onPress={closeModal} style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Enter New Name</Text>
          <TextInput style={styles.textInput} value={newName} onChangeText={(text)=>(setNewName(text))} placeholder={currentUser.name} />
          <Pressable style={styles.btnContainer} android_ripple={{color:"white"}} onPress={changeName}>
            {/* <View style={styles.btnContainer}> */}
              <Text style={styles.btnText}>Change Name</Text>
            {/* </View> */}
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
    width: 129,
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
