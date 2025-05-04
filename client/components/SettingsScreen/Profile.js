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
        <View>
          <Pressable onPress={changeProfilePicture}>
            <Image style={styles.image} source={{ uri: imageURL }} />
            <View style={styles.editProfile}>
              <Ionicons name="pencil" color={"white"} size={25} />
            </View>
          </Pressable>
        </View>
        <Text style={styles.nameText}>Hello {currentUser.name}!</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: "20%",
    paddingTop: 15,
    paddingInline: 10,
  },
  nameAndImageContainer: {
    flexDirection: "row",
    gap: 25,
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 999,
    objectFit: "cover",
  },
  nameText: {
    fontSize: 20,
    fontFamily: "Montserrat-Regular",
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
