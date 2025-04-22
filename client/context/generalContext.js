const { createContext, useEffect, useState } = require("react");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const GeneralContext = createContext();

export function GeneralProvider({ children }) {
  const localIp = "http://192.168.0.110:6969";
  const [currentUser, setCurrentUser] = useState({});
  //   useEffect(() => {
  //     const removeSavedUser = async () => {
  //       await AsyncStorage.removeItem("current-user");
  //     };
  //     removeSavedUser()
  //   }, []);

  const fetchUserGroups = async () => {
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) {
      Alert.alert("Error", "No Logged In User Found");
      return;
    }
    const parsedUser = JSON.parse(loggedInUser);
    const res = await fetch(`${localIp}/group/${parsedUser._id}`);
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    console.log(data.data.groups);
  };

  const value = {
    localIp,
    fetchUserGroups,
    currentUser,
    setCurrentUser,
  };
  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
}
