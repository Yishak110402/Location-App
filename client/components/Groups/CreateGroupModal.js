import { useContext, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { GroupContext } from "../../context/groupContext";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function CreateGroupModal({ showModal, setShowModal }) {
  const transform = useSharedValue(100);
  const modalTransformStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transform.value }],
    };
  }, []);
  const {
    showCreateGroupModal,
    setShowCreateGroupModal,
    setNewGroupName,
    newGroupName,
    createGroup,
  } = useContext(GroupContext);

  const startModalAnimation = () => {
    transform.value = 100
    transform.value = withTiming(0, { duration: 100, easing: Easing.linear });
  };
  useEffect(() => {
    setTimeout(() => {
      startModalAnimation();
    }, 10);
  }, [showCreateGroupModal]);

  return (
    <Modal
      animationType="fade"
      style={{ flex: 1 }}
      transparent
      visible={showCreateGroupModal}
      onRequestClose={() => setShowCreateGroupModal(false)}>
      <Pressable
        onPress={() => setShowCreateGroupModal(false)}
        style={styles.outerContainer}>
        <Animated.View style={[modalTransformStyle, styles.innerContainer]}>
          <Text style={styles.headerText}>Enter New Group Name</Text>
          <TextInput
            style={styles.nameInput}
            autoCapitalize="words"
            autoCorrect={false}
            value={newGroupName}
            onChangeText={(text) => setNewGroupName(text)}
          />
          <Pressable onPress={createGroup}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnTexts}>Create Group</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "rgba(37, 48, 12,0.25)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  innerContainer: {
    backgroundColor: "#25300c",
    width: "100%",
    paddingBlock: 15,
    paddingInline: 10,
    alignItems: "center",
    paddingBottom:25,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  btnContainer: {
    backgroundColor: "#b8c8b7",
    borderRadius: 5,
    padding: 4,
    paddingVertical: 10,
    width: 150,
  },
  btnTexts: {
    fontSize: 14,
    fontFamily: "M-SemiBold",
    color: "#25300c",
    textAlign: "center",
  },
  nameInput: {
    borderWidth: 1,
    color: "#262626",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBlock: 10,
    paddingLeft: 15,
    width: "100%",
    fontFamily: "M-Regular",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "M-SemiBold",
    color: "#b8c8b7",
  },
});
