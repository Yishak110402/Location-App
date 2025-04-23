import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Modal, Text, TextInput, View } from "react-native";
import UsernameSearchResult from "./UsernameSearchResult";
import { useContext } from "react";
import { GroupContext } from "../../context/groupContext";

export default function SearchUserModal({currentGroupId}) {
  const {
    showUsernameSearchModal,
    setShowUsernameSearchModal,
    usernameQuery,
    setUsernamequery,
    usernameSearchResults,
  } = useContext(GroupContext);
  return (
    <Modal
      transparent
      visible={showUsernameSearchModal}
      onRequestClose={() => setShowUsernameSearchModal(false)}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="username"
              style={styles.usernameInput}
              onChangeText={(text) => setUsernamequery(text)}
              value={usernameQuery}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.resultsContainer}>
            {usernameSearchResults.length !== 0 && (
              <FlatList
                data={usernameSearchResults}
                renderItem={({ item }) => {
                  return <UsernameSearchResult result={item} currentGroupId={currentGroupId} />;
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
  },
  innerContainer: {
    backgroundColor: "#f7f7f7",
    width: " 100%",
    height: "70%",
    padding: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
  usernameInput: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 15,
    color: "#262626",
    fontFamily: "Montserrat-Regular",
  },
  resultsContainer: {
    paddingBottom: 75,
  },
});
