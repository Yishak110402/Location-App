import { useRoute } from "@react-navigation/native";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, TextInput, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import GroupMember from "../components/OpenGroupScreen/GroupMember";
import SearchUserModal from "../components/OpenGroupScreen/SearchUserModal";
import { useContext, useEffect } from "react";
import { GroupContext } from "../context/groupContext";
import { GeneralContext } from "../context/generalContext";
import { socket } from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OpenGroupScreen() {
  const {
    setShowUsernameSearchModal,
    availableMembersIds,
    setAvailableMembersIds,
    groupMembersLocations,
    setGroupMembersLocations,
  } = useContext(GroupContext);
  const { getCurrentLocation, location, setLocation, currentUser } =
    useContext(GeneralContext);

  const route = useRoute();
  const currGroup = route.params.group;
  const INITIAL_REGION = {
    latitude: 9.03,
    longitude: 38.74,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };
  const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#1d1d1d" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
  ];

  useEffect(() => {
    const updateLocation = async () => {
      const location = await getCurrentLocation();
      return location;
    };
    const sendLocationInterval = setInterval(async () => {
      const currLocation = await updateLocation();
      setLocation((prevLocation) => ({
        latitude: currLocation.coords.latitude,
        longitude: currLocation.coords.longitude,
      }));
      const currUser = JSON.parse(await AsyncStorage.getItem("current-user"));

      // socket.emit("sendLocation", {
      //   latitude: currLocation.coords.latitude,
      //   longitude: currLocation.coords.longitude,
      //   userId: currUser._id,
      // });
    }, 5000);
    return () => clearInterval(sendLocationInterval);
  }, []);

  useEffect(() => {
    socket.connect();
    async function currLocation() {
      const currUser = JSON.parse(await AsyncStorage.getItem("current-user"));
      const location = await getCurrentLocation();
      socket.emit("joinRoom", {
        room: currGroup._id,
        details: {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          id: currUser._id,
        },
      });
    }
    currLocation();
    socket.on("initialLocations", (message) => {
      const ids = Object.keys(message.data);
      setAvailableMembersIds(ids);
      const locations = [];
      for (let i = 0; i < ids.length; i++) {
        console.log(message.data[ids[i]]);
        locations.push(message.data[ids[i]]);
      }
      console.log(locations);
      console.log(locations.length);      
      setGroupMembersLocations(locations);
    });
  }, [socket]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          // customMapStyle={darkMapStyle}
        >
          {groupMembersLocations.length !== 0 &&
            groupMembersLocations.map((location, idx) => (
              <Marker key={idx} title={currentUser._id} coordinate={location.location} />
            ))}
        </MapView>
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
      <SearchUserModal currentGroupId={currGroup._id} />
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
    marginTop: 7,
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
