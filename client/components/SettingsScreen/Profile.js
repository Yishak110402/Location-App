import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { GeneralContext } from "../../context/generalContext";
import { StyleSheet } from "react-native";
import SettingsOption from "./SettingsOption";
import * as DocumentPicker from "expo-document-picker";

export default function Profile() {
  const { currentUser } = useContext(GeneralContext);
  console.log(currentUser.groups);

  const selectImage = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });    
    if(!file.assets) {
      console.log("No file selected");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameAndImageContainer}>
        <View>
          <Pressable onPress={selectImage}>
            <Image
              style={styles.image}
              source={require("./../../assets/profile pic.jpg")}
            />
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
});
