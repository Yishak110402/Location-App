import { View } from "react-native";
import SettingsOption from "./SettingsOption";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function SettingsOptionsContainer(){
    const {logOut} = useContext(AuthContext)
    return(
        <View style={styles.container}>
            <SettingsOption iconName="create" text="Change Name"/>
            <SettingsOption iconName="mail" text={"Change Email"}/>
            <SettingsOption iconName="key" text={"Change Password"}/>
            <SettingsOption pressFunction={logOut} iconName="log-out" text="Log Out"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingBlock: 15,
        paddingInline: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        justifyContent:'center',
        gap: 10
    }
})