import { createContext, useContext, useEffect, useState } from "react";
import { GeneralContext } from "./generalContext";
import { Alert } from "react-native";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const localIp = "http://192.168.0.110:6969"
  const { localIp } = useContext(GeneralContext);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    gender: "",
  });
  const [error, setError] = useState([]);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (!showError) {
      return;
    }
    const timer = setTimeout(() => {
      setShowError(false);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [showError]);

  const testApi = async () => {
    const res = await fetch(localIp);
    const data = await res.json();
    console.log(data);
  };

  const signUp = async () => {
    setError([]);
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
    console.log(data);
  };

  const value = {
    signUpData,
    setSignUpData,
    signUp,
    error,
    showError
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
