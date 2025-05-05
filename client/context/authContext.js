import { createContext, useContext, useEffect, useState } from "react";
import { GeneralContext } from "./generalContext";
import { Alert, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const localIp = "http://192.168.0.110:6969"
  const { localIp, currentUser, setCurrentUser } = useContext(GeneralContext);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    gender: "",
  });
  const [logInData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signingUp, setSigningUp] = useState(false);
  const [loggingIn, setLogggingIn] = useState(false);
  const [error, setError] = useState([]);
  const [showError, setShowError] = useState(true);
  const [newName, setNewName] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [imageURL, setImageURL] = useState(
    currentUser.profilePicture
      ? `${localIp}/ProfilePics/${currentUser.profilePicture}`
      : `${localIp}/ProfilePics/profile.jpg`
  );
  const navigation = useNavigation();
  useEffect(() => {
    if (currentUser) {
      const url = currentUser.profilePicture
        ? `${localIp}/ProfilePics/${currentUser.profilePicture}`
        : `${localIp}/ProfilePics/profile.jpg`;
      setImageURL(url);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!showError) {
      return;
    }
    const timer = setTimeout(() => {
      setShowError(false);
      setError([]);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [showError]);

  const checkUser = async () => {
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) {
      navigation.navigate("Sign Up");
      return;
    }
    const userData = JSON.parse(loggedInUser);
    const res = await fetch(`${localIp}/user/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
      }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server.");
      return;
    }
    const data = await res.json();
    console.log(data);

    if (data.status === "fail") {
      navigation.navigate("Sign Up");
      setCurrentUser({});
      await AsyncStorage.removeItem("current-user");
      return;
    }
    setCurrentUser(data.user);
    setImageURL(data.user.profilePicture);
    navigation.navigate("Main");
  };

  const signUp = async () => {
    Keyboard.dismiss();
    if (signingUp) {
      return;
    }
    setError([]);
    setShowError(false);
    console.log("Signing Up...");
    setSigningUp(true);
    if (Object.values(signUpData).includes("")) {
      if (signUpData.name === "") {
        setError((errs) => [...errs, "You must enter a name"]);
      }
      if (signUpData.email === "") {
        setError((errs) => [...errs, "You must enter an email"]);
      }
      if (signUpData.username === "") {
        setError((errs) => [...errs, "You must enter a username"]);
      }
      if (signUpData.gender === "") {
        setError((errs) => [...errs, "You must specify your gender"]);
      }
      if (signUpData.password === "") {
        setError((errs) => [...errs, "You must enter a password"]);
      }
      if (signUpData.password !== "" && signUpData.password.length < 8) {
        setError((errs) => [
          ...errs,
          "Your password must have at least 8 characters",
        ]);
      }
      setSigningUp(false);
      setShowError(true);
      return;
    }
    const res = await fetch(`${localIp}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signUpData.name,
        email: signUpData.email,
        username: signUpData.username,
        password: signUpData.password,
        gender: signUpData.gender,
      }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to server");
      setSigningUp(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      setSigningUp(false);
      return;
    }
    const user = data.data.user;
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(user));
    setSigningUp(false);
    navigation.navigate("Main");
  };

  const logIn = async () => {
    Keyboard.dismiss();
    setError([]);
    setShowError(false);
    if (Object.values(logInData).includes("")) {
      if (logInData.email === "") {
        setError((errs) => [...errs, ["You must enter your email"]]);
      }
      if (logInData.password === "") {
        setError((errs) => [...errs, ["You must enter your password"]]);
      }
      setShowError(true);
      return;
    }
    const res = await fetch(`${localIp}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logInData.email,
        password: logInData.password,
      }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setError([...error, data.message]);
      setShowError(true);
      return;
    }
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data.user));
    navigation.navigate("Main");
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("current-user");
    navigation.navigate("Sign Up");
  };
  const changeName = async () => {
    if (newName === "") {
      return;
    }
    console.log("Changing Name");
    const userId = currentUser._id;
    const res = await fetch(`${localIp}/user/edit/name/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
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
    console.log(data.data.user);
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data.user));
  };
  const changePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (Object.values(passwords).includes("")) {
      Alert.alert("Error", "Fill all the required fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Error",
        "The new password and confirm password fields must be the same"
      );
      return;
    }
    const res = await fetch(
      `${localIp}/user/edit/password/${currentUser._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      }
    );
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to the server");
      return;
    }
    const data = await res.json();
    console.log(data);

    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data.user));
    Alert.alert("Success", "Password changed successfully 🎉");
  };
  const changeProfilePicture = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: "image/*",
    });
    if (!file.assets) {
      console.log("No file selected");
      return;
    }
    console.log(file.assets[0]);
    const formData = new FormData();
    formData.append("profilePicture", {
      name: file.assets[0].name,
      type: file.assets[0].mimeType,
      uri: file.assets[0].uri,
    });
    const res = await fetch(
      `${localIp}/user/edit/profilepicture/${currentUser._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );
    if (!res.ok) {
      Alert.alert("Error", "Unable to connect to server");
      return;
    }
    const data = await res.json();
    console.log(data);
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data.user));
    Alert.alert("Success", "Profile picture changed successfully");
  };
  const value = {
    signUpData,
    setSignUpData,
    signUp,
    error,
    showError,
    checkUser,
    logIn,
    setLoginData,
    logInData,
    logOut,
    newName,
    setNewName,
    changeName,
    passwords,
    setPasswords,
    changePassword,
    changeProfilePicture,
    imageURL,
    signingUp,
    loggingIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
