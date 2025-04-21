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

export default function App() {
  const Drawer = createDrawerNavigator();
  const Tabs = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  useFonts({
    "Poppins": require("./assets/fonts/Poppins-Regular.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf")
  })

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
            fontFamily:"Montserrat-Regular"
          },
        }}>
        <Tabs.Screen
          name="Home"
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
      <StatusBar style="dark" backgroundColor="#f7f7f7" translucent={false} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, animation:'fade' }}>
          <Stack.Screen name="Main" component={TabsNavFlow} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Log In" component={LogInScreen} />
          <Stack.Screen name="Map Screen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
