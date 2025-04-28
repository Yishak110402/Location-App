import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { GeneralContext } from "../../context/generalContext";
import { StyleSheet } from "react-native";
import SettingsOption from "./SettingsOption";

export default function Profile() {
  const { currentUser } = useContext(GeneralContext);
  console.log(currentUser.groups);
  
  return (
    <View style={styles.container}>
      <View style={styles.nameAndImageContainer}>
        <Image style={styles.image} source={require("./../../assets/profile pic.jpg")} />
        <Text style={styles.nameText}>Hello {currentUser.name}!</Text>
      </View>     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height:"20%",
    paddingTop: 15,
    paddingInline: 10
  },
  nameAndImageContainer:{
    flexDirection:"row",
    gap: 25,
    alignItems: 'center'
  },
  image:{
    height: 100,
    width: 100,
    borderRadius: 999,
    objectFit:'cover'
  },
  nameText:{
    fontSize: 20,
    fontFamily:"Montserrat-Regular"
  }
});
