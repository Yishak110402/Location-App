import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/authContext";
import { GeneralContext } from "../context/generalContext";
import Profile from "../components/SettingsScreen/Profile";
import SettingsOptionsContainer from "../components/SettingsScreen/SettingsOptionsContainer";

export default function Settings() {
  const { logOut } = useContext(AuthContext);
  const { currentUser } = useContext(GeneralContext);
  return (
    <View style={styles.container}>
      <Profile />
      <SettingsOptionsContainer/>
      {/* <Button title="Log Out" onPress={logOut} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
