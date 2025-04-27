const { createContext, useEffect, useState, useContext } = require("react");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { io } from "socket.io-client";
import * as Location from "expo-location";

export const GeneralContext = createContext();

export function GeneralProvider({ children }) {
  // const localIp = "http://192.168.0.110:6969";
  const localIp = "https://location-app-lu7v.onrender.com"

  const [currentUser, setCurrentUser] = useState({});
  const [allGroups, setAllGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const [location, setLocation] = useState(null);
  const [openedGroup, setOpenedGroup] = useState({});

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation;
  };
  useEffect(() => {
    const removeSavedUser = async () => {
      await AsyncStorage.removeItem("current-user");
    };
    removeSavedUser()
  }, []);

  const fetchUserGroups = async () => {
    setLoadingGroups(true);
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) {
      setLoadingGroups(false);
      Alert.alert("Error", "No Logged In User Found");
      return;
    }
    const parsedUser = JSON.parse(loggedInUser);
    const res = await fetch(`${localIp}/group/${parsedUser._id}`);
    if (!res.ok) {
      setLoadingGroups(false);
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setLoadingGroups(false);
      Alert.alert("Error", data.message);
      return;
    }
    setAllGroups(data.data.groups);
    setLoadingGroups(false);
  };

  const value = {
    localIp,
    fetchUserGroups,
    currentUser,
    setCurrentUser,
    loadingGroups,
    allGroups,
    setAllGroups,
    getCurrentLocation,
    location,
    setLocation,
  };
  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
}
