import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MemberOptionsButtons(){
    return(
        <View style={styles.container}>
            <Pressable style={[styles.btnContainer, styles.nudgeBtn]}>
                <Text style={styles.btnText}>Nudge</Text>
            </Pressable>
            <Pressable style={[styles.btnContainer, styles.kickBtn]}>
                <Text style={styles.btnText}>Kick Member</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:50,
        marginTop: 10
    },
    btnContainer:{
        marginBottom: 20,
        paddingVertical: 10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    },
    btnText:{
        fontSize: 15,
        fontFamily:'M-Bold',
        color:"white"
    },
    nudgeBtn:{
        backgroundColor:"#25300c"
    },
    kickBtn:{
        backgroundColor:"#D15432"
    }
})