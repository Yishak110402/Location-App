import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScree";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import InvitationsScreen from "./screens/InvitationsScreen";
import { Ionicons } from "@expo/vector-icons";
import Settings from "./screens/Settings";
import SignUpScreen from "./screens/SignUpScreen";
import { useFonts } from "expo-font";
import LogInScreen from "./screens/LogInScreen";
import MapScreen from "./screens/MapScreen";
import { AuthProvider } from "./context/authContext";
import { GeneralProvider } from "./context/generalContext";
import InitialLoadingScreen from "./screens/InitialLoadingScreen";
import { GroupProvider } from "./context/groupContext";
import OpenGroupScreen from "./screens/OpenGroupScreen";
import TestSocketScreen from "./screens/TestSocketScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const Drawer = createDrawerNavigator();
  const Tabs = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const TabsNavFlow = () => {
    return (
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 64,
          },
          tabBarInactiveTintColor: "#262626",
          tabBarLabelStyle: {
            fontSize: 13,
            fontFamily: "Montserrat-Regular",
          },
        }}>
        <Tabs.Screen
          name="Groups"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="people" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="Invitations"
          component={InvitationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="mail" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="settings" color={color} size={size} />;
            },
          }}
        />
      </Tabs.Navigator>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="transparent"
          style="dark"
          translucent={true}
        />
        <NavigationContainer>
          <GeneralProvider>
            <AuthProvider>
              <GroupProvider>
                <Stack.Navigator
                  initialRouteName="Initial Loading"
                  screenOptions={{ headerShown: false, animation: "fade" }}>
                  <Stack.Screen
                    name="Initial Loading"
                    component={InitialLoadingScreen}
                  />
                  <Stack.Screen name="Main" component={TabsNavFlow} />
                  <Stack.Screen name="Sign Up" component={SignUpScreen} />
                  <Stack.Screen name="Log In" component={LogInScreen} />
                  <Stack.Screen name="Map Screen" component={MapScreen} />
                  <Stack.Screen
                    name="Open Group Screen"
                    component={OpenGroupScreen}
                  />
                </Stack.Navigator>
              </GroupProvider>
            </AuthProvider>
          </GeneralProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
