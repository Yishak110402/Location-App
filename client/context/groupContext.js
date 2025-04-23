import { createContext, useContext, useEffect, useState } from "react";
import { GeneralContext } from "./generalContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GroupContext = createContext();

export function GroupProvider({ children }) {
  const { localIp, setAllGroups } = useContext(GeneralContext);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showUsernameSearchModal, setShowUsernameSearchModal] = useState(false);
  const [usernameQuery, setUsernamequery] = useState("");
  const [usernameSearchResults, setUsernameSearchResults] = useState([]);
  const [allInvitations, setAllInvitations] = useState([]);

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
    console.log(data.data);
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
    console.log(data);
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
    console.log(data.data.result[0].username);
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
    console.log(data.data);
    setAllInvitations(data.data.invitations);
  };

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
  };
  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
}
