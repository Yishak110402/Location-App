import { useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { io } from "socket.io-client";

// const socket = io.connect("http://192.168.0.110:6969");

export default function TestSocketScreen() {
  const sendMessage = () => {
    socket.emit("sendMessage",{message:"Hello"})
  };

  useEffect(()=>{
    socket.on("receiveMessage",(data)=>{
        Alert.alert(data.message)
    })

  },[socket])

  return (
    <View>
      <Text>TEST SOCKET SCREEN</Text>
      <TextInput style={styles.input} />
      <Pressable onPress={sendMessage}>
        <View style={styles.btnContainer}>
          <Text>Send Message</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  btnContainer: {
    backgroundColor: "gray",
    marginTop: 10,
    padding: 5,
  },
});
