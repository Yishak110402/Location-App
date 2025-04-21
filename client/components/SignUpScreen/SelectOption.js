import { Text, View } from "react-native";
import { Pressable } from "react-native";

export default function SelectOption({option, index}){
    return(
        <Pressable>
            <View>
                <Text>{option}</Text>
            </View>
        </Pressable>
    )
}