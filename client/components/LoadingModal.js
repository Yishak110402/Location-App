import { Modal, StyleSheet, View } from "react-native";

export default function LoadingModal() {
  return (
    <Modal visible={true} transparent>
      <View style={styles.outerContainer}>
        <View></View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "rgba(37, 48, 12,0.45)",
    height: "100%",
    width: "100%",
  },
  innerSpinner: {
    borderWidth: 20,
    height: 50,
    width: 50,
    borderRadius: 999,
    borderTopWidth: 0,
    borderColor: "#b8c8b7",
  },
});
