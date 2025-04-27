import { Pressable, View, Text, StyleSheet } from "react-native";

export default function GroupOptionsButton({text = "button", pressFunction}){
    return(
        <Pressable>
            <View style={styles.container}>
                <Text style={styles.btnText}>{text}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#262626",
        paddingInline: 10,
        paddingBlock: 5,
        marginBlock: 5,
        marginInline: 15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 8,
    },
    btnText:{
        color:"#f7f7f7",
        fontFamily:"Montserrat-Regular",
        fontSize: 18
    }
})