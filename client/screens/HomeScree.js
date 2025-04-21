import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function HomeScreen() {
    const navigation = useNavigation()
    const goToMap=()=>{
      navigation.navigate("Map Screen")
    }
  return (
    <View style={styles.container}>
      <Pressable onPress={goToMap} style={styles.btnContainer}>
        <View>
          <Text style={styles.btnText}>Go To Map</Text>
        </View>
      </Pressable>
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