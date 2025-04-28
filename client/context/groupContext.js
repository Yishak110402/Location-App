import { createContext, useContext, useEffect, useState } from "react";
import { GeneralContext } from "./generalContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const GroupContext = createContext();

export function GroupProvider({ children }) {
  const navigation = useNavigation();
  const { localIp, setAllGroups, currentUser } = useContext(GeneralContext);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showUsernameSearchModal, setShowUsernameSearchModal] = useState(false);
  const [usernameQuery, setUsernamequery] = useState("");
  const [usernameSearchResults, setUsernameSearchResults] = useState([]);
  const [allInvitations, setAllInvitations] = useState([]);
  const [groupMembersLocations, setGroupMembersLocations] = useState([]);
  const [availableMembersIds, setAvailableMembersIds] = useState([]);

  const createGroup = async () => {
    if (newGroupName === "") {
      return;
    }
    if (newGroupName.length < 3) {
      Alert.alert("Error", "Group name must be at least 3 characters");
      return;
    }
    const stringedUser = await AsyncStorage.getItem("current-user");
    if (!stringedUser) {
      Alert.alert("Error", "Couldn't find logged in user");
      return;
    }
    const user = JSON.parse(stringedUser);
    const userId = user._id;
    const res = await fetch(`${localIp}/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: userId,
        name: newGroupName,
      }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Couldn't connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    setNewGroupName("");
    setShowCreateGroupModal(false);
    setAllGroups((groups) => [data.data.group, ...groups]);
  };
  const sendInvitation = async (invitedUserId, invitedGroup) => {
    if (!invitedUserId || !invitedGroup) {
      Alert.alert("Error", "Missing Data");
      return;
    }
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) {
      Alert.alert("Error", "No User ID Found");
      return;
    }
    const parsedUser = JSON.parse(loggedInUser);
    const senderId = parsedUser._id;
    const res = await fetch(`${localIp}/invitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invitedUserId,
        invitedGroup,
        senderId,
      }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
  };
  const findByUsername = async () => {
    if (usernameQuery === "") {
      setUsernameSearchResults([]);
      return;
    }
    const res = await fetch(`${localIp}/user/username/${usernameQuery}`);
    if (!res.ok) {
      Alert.alert("Error", "Failed to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    setUsernameSearchResults(data.data.result);
  };
  const loadAllInvitations = async () => {
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) {
      Alert.alert("Error", "No Logged In User Found");
      return;
    }
    const parsedUser = JSON.parse(loggedInUser);
    const id = parsedUser._id;
    const res = await fetch(`${localIp}/invitation/${id}`);
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
    }
    setAllInvitations(data.data.invitations);
  };
  const getGroupDetails = async (groupId) => {
    if (!groupId) {
      Alert.alert("Error", "Group ID must be provided");
      return;
    }
    const res = await fetch(`${localIp}/group/detail/${groupId}`);
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    return data.data.group;
  };
  const rejectInvitation = async (id) => {
    const res = await fetch(`${localIp}/invitation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    setAllInvitations((prevList) => prevList.filter(() => prevList._id !== id));
  };
  const acceptInvitation = async (id) => {
    if (!id) {
      Alert.alert("Error", "No ID provided");
      return;
    }
    const res = await fetch(`${localIp}/invitation/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invitationId: id }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
    }
    navigation.navigate("Groups");
  };
  const checkGroup = async (id) => {
    const res = await fetch(`${localIp}/group/detail/${id}`);
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to server");
      navigation.navigate("Main");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", "Group has been deleted");
      setAllGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== id)
      );
      navigation.navigate("Main")
      return;
    }
  };
  const kickMemberFromGroup = async(group, userId)=>{
    if(group.owner !== currentUser._id){
      Alert.alert("Error", "You cannot kick members out of a group because you are not the owner")
      return
    }
    if(currentUser._id === userId){
      Alert.alert("Error", "You cannot kick yourself out of a group")
      return
    }
  } 

  useEffect(() => {
    const timeOut = setTimeout(() => {
      findByUsername();
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [usernameQuery]);

  const value = {
    showCreateGroupModal,
    setShowCreateGroupModal,
    newGroupName,
    setNewGroupName,
    createGroup,
    showUsernameSearchModal,
    setShowUsernameSearchModal,
    usernameQuery,
    setUsernamequery,
    findByUsername,
    usernameSearchResults,
    setUsernameSearchResults,
    sendInvitation,
    loadAllInvitations,
    getGroupDetails,
    allInvitations,
    rejectInvitation,
    acceptInvitation,
    groupMembersLocations,
    setGroupMembersLocations,
    availableMembersIds,
    setAvailableMembersIds,
    checkGroup,
    kickMemberFromGroup
  };
  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
}
