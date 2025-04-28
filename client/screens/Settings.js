import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/authContext";
import { GeneralContext } from "../context/generalContext";

export default function Settings(){
    const {logOut} = useContext(AuthContext)
    const {currentUser} = useContext(GeneralContext)
    return(
        <View style={styles.container}>
            
            <Button title="Log Out" onPress={logOut} />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
})