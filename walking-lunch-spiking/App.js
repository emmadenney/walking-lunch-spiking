import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.009,
      });

      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };

  const markerLocations = [
    { id: 1, coordinate: { latitude: 53.472114, longitude: -2.237752 } },
    { id: 2, coordinate: { latitude: 53.486475, longitude: -2.264716 } },
  ];
  // ^^ this is an array of locations to set as markers

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Button
        title="Reverse Geocode Current Location"
        onPress={reverseGeocode}
      />

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          // ^^ this gives blue dot on map for your location
        >
          {markerLocations.map((location) => {
            return (
              <Marker key={location.id} coordinate={location.coordinate} />
            );
          })}
          {/* <Marker
          key="1"
          coordinate={{ latitude: 53.3869, longitude: -2.3489 }}
          // ^^ this is laying one hard coded marker rather than mapping over an array of locations to mark
          /> */}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "50%",
    height: "50%",
  },
});
