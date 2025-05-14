import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function ErrorDisplay({err}){
    return(
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{err}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    errorContainer:{
        borderRadius: 5,
        backgroundColor: "#ff9892",
        marginTop: 5,
        padding: 5
    },
    errorText:{
        fontSize: 14,
        fontFamily:"M-SemiBold",
        color:"#262626"
    }
    
})