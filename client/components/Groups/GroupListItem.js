import { StyleSheet, Text, View } from "react-native";

export default function GroupListItem({group}){
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Name of the group</Text>
            <Text style={styles.itemSubText}>10 members</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 10,
        paddingInline: 5,
        paddingBlock: 10
    },
    itemText:{
        fontSize: 15,
        fontFamily:"Montserrat-Regular",
        marginBottom: 8
    },
    itemSubText:{
        fontSize: 13,
        fontFamily:"Poppins"
    }
})