import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
    const navigation = useNavigation()
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
