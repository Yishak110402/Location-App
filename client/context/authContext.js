import { createContext, useContext, useEffect, useState } from "react";
import { GeneralContext } from "./generalContext";
import { Alert, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
  const [error, setError] = useState([]);
  const [showError, setShowError] = useState(true);
  const navigation = useNavigation();

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
    navigation.navigate("Main");
  };

  const signUp = async () => {
    Keyboard.dismiss();
    setError([]);
    setShowError(false);
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
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      return;
    }
    const user = data.data.user;
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(user));
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
      console.log(data);
      return;
    }
    setCurrentUser(data.data.user);
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data.user));
    navigation.navigate("Main");
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
