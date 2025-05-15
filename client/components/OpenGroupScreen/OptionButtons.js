import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";

export default function OptionButton({text="The text for option", pressFunction}){
    return(
        <Pressable onPress={pressFunction}>
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#25300c",
        width: 104,
        height: 46,
        marginHorizontal: 5,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:"#f7f7f7",
        textAlign:'center',
        fontFamily:"M-SemiBold"
    }
})