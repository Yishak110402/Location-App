const { createContext, useEffect, useState, useContext } = require("react");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { io } from "socket.io-client";
import * as Location from "expo-location";

export const GeneralContext = createContext();

export function GeneralProvider({ children }) {
  const localIp = "http://192.168.0.110:6969";
  const socket = io.connect(localIp);

  const [currentUser, setCurrentUser] = useState({});
  const [allGroups, setAllGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const [location, setlocation] = useState(null);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    // console.log(currentLocation.coords);
    setlocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    })
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      await getCurrentLocation()
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    if(location === null) return
    socket.emit("sendLocation",{location})
    socket.on("receivedLocation",(message)=>{console.log(message);
    })
  },[socket])

  // useEffect(() => {
  //   const removeSavedUser = async () => {
  //     await AsyncStorage.removeItem("current-user");
  //   };
  //   removeSavedUser()
  // }, []);

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
    console.log(data.data.groups);
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
  };
  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
}
