import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import SearchMemberResultListItem from "./SearchMemberResultListItem";

export default function AllMembersModal({ showAllMembers, setShowAllMembers }) {
    const closeModal = ()=>{
        setShowAllMembers(false)
    }
  return (
    <Modal visible={showAllMembers} transparent onRequestClose={closeModal}>
      <Pressable onPress={closeModal} style={styles.outerContainer}>
        <View style={styles.innerContainer}>
            <TextInput
              style={styles.membersNameInput}
              placeholder="Enter Member Name"
            />
            <View style={styles.membersContainer}>
                <SearchMemberResultListItem />
                <SearchMemberResultListItem />
                <SearchMemberResultListItem />
                <SearchMemberResultListItem />
                <SearchMemberResultListItem />
            </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "rgba(37, 48, 12,0.25)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  innerContainer: {
    backgroundColor: "#f7f7f7",
    minHeight: 450,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  membersNameInput: {
    backgroundColor: "#b8c8b7",
    width: "100%",
    height: 40,
    borderRadius: 6,
    fontFamily: "M-Light",
    fontSize: 12,
  },
  membersContainer:{
    flexDirection: 'row',
    flexWrap:'wrap',
    gap: 20,
    marginTop: 15
  }
});
