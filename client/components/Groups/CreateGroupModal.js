import { Modal, View, Text, Pressable, TextInput, StyleSheet } from "react-native";

export default function CreateGroupModal({showModal, setShowModal}) {
  return (
    <Modal style={{flex: 1}} visible={showModal} onRequestClose={()=>(setShowModal(false))}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
            <View>
            <Text>Give your group a name</Text>
            <TextInput autoCapitalize='words' autoCorrect={false} />
            </View>
            <Pressable>
                <View>
                    <Text>Create</Text>
                </View>
            </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    outerContainer:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    },
    innerContainer:{
        backgroundColor:"#f7f7f7",
        width:"100%"
    }
})