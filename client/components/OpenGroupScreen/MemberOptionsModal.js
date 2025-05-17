import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MemberOptionsButtons from "./MemberOptionsButtons";

export default function MemberOptionsModal(){
    return(
        <Modal transparent>
            <Pressable style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.memberName}>John Doe</Text>  
                    <MemberOptionsButtons />                  
                </View>
            </Pressable>
        </Modal>
    )
}
const styles = StyleSheet.create({
    outerContainer:{
        backgroundColor: "rgba(37, 48, 12,0.25)",
        flex: 1,
        justifyContent:'flex-end'
    },
    innerContainer:{
        height: 200,
        backgroundColor:"#f7f7f7"
    },
    memberName:{
        fontFamily:"M-SemiBold",
        fontSize: 25,
        textAlign:'center',
        color:"#25300c",
        marginTop: 15
    }
})
