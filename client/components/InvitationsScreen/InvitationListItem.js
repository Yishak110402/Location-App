import { Pressable, StyleSheet, Text, View } from "react-native";

export default function InvitationListItem({invitation}){
    return(
        <View style={styles.container}>
            <Text>Invited by:- Yishak Hailu</Text>
            <Text>Invited to the group:- S20 Group</Text>
            <View style={styles.btnContainerView}>
                <Pressable>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Accept Invitation</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Reject Invitation</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        borderRadius: 8,
    },
    btnContainerView:{
        flexDirection:'row',
        gap: 50
    },
    btnContainer:{
        backgroundColor:"#262626",
        padding: 10,
        marginBlock: 15,
        borderRadius: 8
    },
    btnText:{
        color:"#f7f7f7",
        fontSize: 14,
        fontFamily:"Montserrat-Regular"
    }
})