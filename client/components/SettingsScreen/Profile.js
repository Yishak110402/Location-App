import { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { GeneralContext } from "../../context/generalContext";
import { StyleSheet } from "react-native";
import SettingsOption from "./SettingsOption";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authContext";

export default function Profile() {
  const { currentUser, localIp } = useContext(GeneralContext);
  const { changeProfilePicture, imageURL } = useContext(AuthContext);
  console.log(currentUser.profilePicture);

  const selectImage = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });
    if (!file.assets) {
      console.log("No file selected");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameAndImageContainer}>
          <Pressable onPress={changeProfilePicture}>
            <Image resizeMode="cover" style={styles.image} source={{ uri: imageURL }} />
          </Pressable>
        <Text style={styles.nameText}>Hello {currentUser.name}!</Text>
        <Text style={styles.usernameText}>@{currentUser.username}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 208,
    paddingTop: 30,
    paddingInline: 10,
    backgroundColor:"#25300c"
  },
  nameAndImageContainer: {
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 999,
    resizeMode: "cover",
  },
  nameText: {
    fontSize: 29,
    fontFamily: "M-SemiBold",
    color:"white"
  },
  usernameText:{
    fontSize: 12,
    color:"#f7f7f7",
    fontFamily:"M-Regular"
  },
  editProfile: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
