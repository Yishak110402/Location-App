import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { AuthContext } from "../context/authContext";

export default function InitialLoadingScreen(){
    const {checkUser} = useContext(AuthContext)
    useEffect(()=>{
        checkUser()
    },[])
    return(
        <View style={styles.container}>
            <Text>Circle Track</Text>
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