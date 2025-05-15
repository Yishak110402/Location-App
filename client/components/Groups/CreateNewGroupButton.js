import { Pressable, View } from "react-native";
import {Ionicons} from "@expo/vector-icons"
import { StyleSheet } from "react-native";

export default function CreateNewGroupButton({pressFunction}){
    return(
        <Pressable style={styles.container} onPress={pressFunction}>
            <View>
                <Ionicons name='add' color={"#b8c8b7"} size={45} />
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom: 20,
        right: 20,
        backgroundColor:"#25300c",
        borderRadius:999,
        height: 50,
        width: 50,
        alignItems:"center",
        justifyContent:'center',
        elevation: 3
    }
})