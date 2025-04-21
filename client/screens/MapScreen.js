import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const markers = [
    {
      title: "Meskel Square",
      latitude: 9.0108,
      longitude: 38.7613,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    {
      title: "Unity Park",
      latitude: 9.0136,
      longitude: 38.7578,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    {
      title: "Addis Ababa University",
      latitude: 9.0362,
      longitude: 38.7626,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    {
      title: "African Union HQ",
      latitude: 9.0086,
      longitude: 38.7448,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    {
      title: "Bole International Airport",
      latitude: 8.9778,
      longitude: 38.7993,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to show your position."
        );
      }
    })();
  }, []);
  const mapRef = useRef();
  const navigation = useNavigation();

  const INITIAL_REGION = {
    latitude: 9.03,
    longitude: 38.74,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  const pressed = () => {
    const hawassaLocation = {
      latitude: 7.04,
      longitude: 38.49,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };
    mapRef.current.animateCamera(
      { center: hawassaLocation, zoom: 15 },
      { duration: 2500 }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={pressed}>
            <Text>Focus</Text>
          </Pressable>
        );
      },
      headerShown: true,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsBuildings
        rotateEnabled={false}>
        {markers.map((marker, index) => (
          <>
            <Marker key={index} coordinate={marker} />
          </>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
});
