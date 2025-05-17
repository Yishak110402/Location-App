import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { Modal, Text, TextInput, View } from "react-native";
import UsernameSearchResult from "./UsernameSearchResult";
import { useContext } from "react";
import { GroupContext } from "../../context/groupContext";

export default function SearchUserModal({ currentGroupId }) {
  const {
    showUsernameSearchModal,
    setShowUsernameSearchModal,
    usernameQuery,
    setUsernamequery,
    usernameSearchResults,
  } = useContext(GroupContext);
  const doNothing = ()=>{
    return
  }
  return (
    <Modal
      transparent
      visible={showUsernameSearchModal}
      onRequestClose={() => setShowUsernameSearchModal(false)}>
      <Pressable
        onPress={() => setShowUsernameSearchModal(false)}
        style={styles.outerContainer}>
        <Pressable onPress={doNothing} style={styles.innerContainer}>
          <View>
            <TextInput
              placeholder="Enter Username"
              style={styles.usernameInput}
              onChangeText={(text) => setUsernamequery(text)}
              value={usernameQuery}
              autoCapitalize="none"
              placeholderTextColor={"#625D5D"}
            />
          </View>
          <View style={styles.resultsContainer}>
            {usernameQuery && (
              <FlatList
                data={usernameSearchResults}
                renderItem={({ item }) => {
                  return (
                    <UsernameSearchResult
                      result={item}
                      currentGroupId={currentGroupId}
                    />
                  );
                }}
                ListEmptyComponent={
                  <View style={styles.noUserContainer}>
                    <Text style={styles.noUserText}>No User Found</Text>
                  </View>
                }
              />
            )}
          </View>
        </Pressable>
      </Pressable>
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
    height: 400,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
  usernameInput: {
    borderRadius: 8,
    fontSize: 12,
    color: "#25300c",
    fontFamily: "Montserrat-Regular",
    backgroundColor:"#B8C8B7",
    paddingLeft: 8
  },
  resultsContainer: {
    paddingBottom: 75,
  },
  noUserContainer:{},
  noUserText:{
    fontSize: 25,
    fontFamily:"M-SemiBold",
    textAlign:'center',
    marginTop: 40,
    color:"#25300c"
  }
});
