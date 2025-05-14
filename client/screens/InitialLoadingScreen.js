import { useContext, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { AuthContext } from "../context/authContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function InitialLoadingScreen() {
  const { checkUser } = useContext(AuthContext);
  const rotate = useSharedValue(0);
  const rotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  }, []);
  const startRotation = () => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
      false
    );
  };
  useEffect(() => {
    startRotation();
    // checkUser()
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.splashText}>CircleTrack</Text>
      <Animated.View style={[rotation, styles.loader]}></Animated.View>
      <View style={styles.shade}></View>
      <Image
        style={styles.image}
        source={require("./../assets/images/green scenery.jpg")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    fontSize: 30,
    fontFamily: "M-Black",
    fontSize: 50,
    color: "#b8c8b7",
  },
  loader: {
    borderWidth: 20,
    height: 50,
    width: 50,
    borderRadius: 999,
    borderTopWidth: 0,
    borderColor:"#b8c8b7"
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -10,
  },
  shade: {
    backgroundColor: "#25300C",
    opacity: 0.45,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -5,
  },
});
