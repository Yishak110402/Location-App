import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Platform,
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
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../context/groupContext";
import { GeneralContext } from "../context/generalContext";
import { socket } from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GroupOptions from "../components/OpenGroupScreen/GroupOptions";
import BackButton from "../components/OpenGroupScreen/BackButton";
import RenameGroupModal from "../components/OpenGroupScreen/RenameGroupModal";
import OptionButton from "../components/OpenGroupScreen/OptionButtons";
import AllMembersModal from "../components/OpenGroupScreen/AllMembersModal";
import MemberOptionsModal from "../components/OpenGroupScreen/MemberOptionsModal";

export default function OpenGroupScreen() {
  const navigation = useNavigation();
  const {
    setShowUsernameSearchModal,
    availableMembersIds,
    setAvailableMembersIds,
    groupMembersLocations,
    setGroupMembersLocations,
    checkGroup,
  } = useContext(GroupContext);
  const { getCurrentLocation, location, setLocation, currentUser } =
    useContext(GeneralContext);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [showRenameGroupModal, setShowRenameGroupModal] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const mapRef = useRef();

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
      mapRef.current.animateCamera(
        {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 20,
        },
        { duration: 1500 }
      );
    }
    currLocation();
  }, []);
  useEffect(() => {
    socket.on("updateLocations", (message) => {
      const ids = Object.keys(message.data);
      setAvailableMembersIds(ids);
      const locations = [];
      for (let i = 0; i < ids.length; i++) {
        locations.push(message.data[ids[i]]);
      }
      setGroupMembersLocations(locations);
    });
  }, [socket]);

  useEffect(() => {
    const backPress = () => {
      socket.disconnect();
      setGroupMembersLocations([]);
      setAvailableMembersIds([]);
      navigation.navigate("Main");
    };
    const backButton = BackHandler.addEventListener(
      "hardwareBackPress",
      backPress
    );
    return () => backButton.remove();
  }, []);
  useEffect(() => {
    checkGroup(currGroup._id);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          initialRegion={INITIAL_REGION}
          ref={mapRef}

          // customMapStyle={darkMapStyle}
        >
          {groupMembersLocations.length !== 0 &&
            groupMembersLocations.map((location, idx) => (
              <Marker
                key={idx}
                title={"User"}
                coordinate={location.location}>
                <Image
                  source={require("./../assets/profile pic.jpg")}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 999,
                    backgroundColor: "green",
                  }}
                />
              </Marker>
            ))}
        </MapView>
        <BackButton />
      </View>
      <View style={styles.otherCOntainer}>
        <FlatList
          horizontal
          data={availableMembersIds}
          renderItem={({ item }) => {
            return (
              <GroupMember
                currGroup={currGroup}
                availableMembersIds={availableMembersIds}
                member={item}
                mapRef={mapRef}
                locations={groupMembersLocations}
              />
            );
          }}
          keyExtractor={(item) => {
            return item;
          }}
          ListEmptyComponent={
            <View style={styles.noMembersContainer}>
              <Text style={styles.noMembersText}>No Online Members</Text>
            </View>
          }
        />
        <View style={styles.optionsContainer}>
          <OptionButton
            text="All Members"
            pressFunction={() => setShowAllMembers(true)}
          />
          <OptionButton
            text="Invite"
            pressFunction={() => setShowUsernameSearchModal(true)}
          />
          <OptionButton text="Options" />
        </View>
      </View>

      <SearchUserModal currentGroupId={currGroup._id} />
      <GroupOptions
        showModal={showGroupOptions}
        currentGroup={currGroup}
        setShowModal={setShowGroupOptions}
        setShowRenameGroupModal={setShowRenameGroupModal}
      />
      <RenameGroupModal
        showModal={showRenameGroupModal}
        setShowModal={setShowRenameGroupModal}
        setOptionsModal={setShowGroupOptions}
      />
      <AllMembersModal
        showAllMembers={showAllMembers}
        setShowAllMembers={setShowAllMembers}
        currentGroup={currGroup}
      />
      <MemberOptionsModal />
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
    position: "relative",
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingInline: 15,
    alignItems: "center",
  },
  headerBtnContainer: {
    marginLeft: 75,
    borderWidth: 1,
    backgroundColor: "#262626",
    borderRadius: 8,
    padding: 5,
  },
  headerBtnText: {
    color: "#f7f7f7",
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  otherCOntainer: {
    height: 225,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  noMembersContainer:{
    flex: 1,
  },
  noMembersText:{
    fontSize: 25,
    fontFamily:"M-SemiBold",
    textAlign:'center',
    marginTop: 15
  }
});
