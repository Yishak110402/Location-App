import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  btnContainer:{
    padding: 5,
    backgroundColor:'black',
    borderRadius: 10
  },
  btnText:{
    fontFamily:'Montserrat-Regular',
    color:"#f7f7f7"
  }
})