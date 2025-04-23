import { useRoute } from "@react-navigation/native";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import GroupMember from "../components/OpenGroupScreen/GroupMember";
import SearchUserModal from "../components/OpenGroupScreen/SearchUserModal";
import { useContext } from "react";
import { GroupContext } from "../context/groupContext";

export default function OpenGroupScreen() {
  const { setShowUsernameSearchModal } = useContext(GroupContext);
  const route = useRoute();
  console.log(route.params.group);
  const currGroup = route.params.group;
  const INITIAL_REGION = {
    latitude: 9.03,
    longitude: 38.74,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };
  const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#1d1d1d' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d1d' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] }
  ];
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={INITIAL_REGION}
        //   customMapStyle={darkMapStyle}
        />
      </View>
      <View style={{ flex: 0.4 }}>
        <Text style={styles.membersHeader}>Members</Text>
        <FlatList
          horizontal
          data={currGroup.members}
          renderItem={({ item }) => {
            return <GroupMember member={item} />;
          }}
          keyExtractor={(item) => {
            return item;
          }}
        />
        <Pressable onPress={() => setShowUsernameSearchModal(true)}>
          <View style={styles.inviteBtnContainer}>
            <Text style={styles.inviteBtnText}>Invite New Members</Text>
          </View>
        </Pressable>
      </View>
      <SearchUserModal currentGroupId = {currGroup._id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  mapContainer: {
    flex: 1,
  },
  membersHeader: {
    fontSize: 18,
    fontFamily: "Poppins",
    textAlign: "center",
    marginTop: 7
  },
  inviteBtnContainer: {
    backgroundColor: "#262626",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingInline: 15,
    paddingBlock: 8,
    width: 210,
    alignSelf: "center",
    borderRadius: 8,
  },
  inviteBtnText: {
    color: "#f7f7f7",
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
  },
});
