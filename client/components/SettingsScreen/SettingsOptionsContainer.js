import { View } from "react-native";
import SettingsOption from "./SettingsOption";
import { StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import ChangeNameModal from "./ChangeNameModal";
import ChangeEmailModal from "./ChangeEmailModal";
import { GeneralContext } from "../../context/generalContext";
import ChangePasswordModal from "./ChangePasswordModal";

export default function SettingsOptionsContainer() {
  const { logOut } = useContext(AuthContext);
  const {currentUser} = useContext(GeneralContext)
  const [showNameChangeModal, setShowChangeNameModal] = useState(false)
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const openNameChangeModal = ()=>{
    setShowChangeNameModal(true)
  }
  const openEmailChangeModal = ()=>{
    setShowChangeEmailModal(true)
  }
  const openChangePasswordModal = ()=>{
    setShowChangePasswordModal(true)
  }
  return (
    <>
      <View style={styles.container}>
        <SettingsOption iconName="create" text="Change Name"  pressFunction={openNameChangeModal}/>
        <SettingsOption iconName="mail" text={"Change Email"} pressFunction={openEmailChangeModal} />
        <SettingsOption iconName="key" text={"Change Password"} pressFunction={openChangePasswordModal} />
        <SettingsOption
          pressFunction={logOut}
          iconName="log-out"
          text="Log Out"
        />
      </View>
      <ChangeNameModal showNameChangeModal={showNameChangeModal} setShowChangeNameModal={setShowChangeNameModal} />
      <ChangeEmailModal showChangeEmailModal={showChangeEmailModal} setShowChangeEmailModal={setShowChangeEmailModal} value={currentUser.email} />
      <ChangePasswordModal showChangePasswordModal={showChangePasswordModal} setShowChangePasswordModal={setShowChangePasswordModal}/>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBlock: 15,
    paddingInline: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
