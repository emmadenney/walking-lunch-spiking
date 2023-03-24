import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';

export default function App() {
const [location, setLocation] = useState();
const [address, setAddress] = useState();



useEffect(() => {
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
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
    latitude: location.coords.latitude
  });

  console.log("Reverse Geocoded:");
  console.log(reverseGeocodedAddress);
};
  return (
    <View style={styles.container}>
      {/* <Text>hi</Text> */}
      <TextInput placeholder='Address' value={address} onChangeText={setAddress}/>
      <Button title='Geocode Address' onPress={geocode}/>
      <Button title="Reverse Geocode Current Location" onPress={reverseGeocode} />

      <MapView
  style={styles.map}
  initialRegion={
    location
      ? {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          longitudeDelta: 0.004,
          latitudeDelta: 0.009,
        }
      : {
          longitude: -0.118092,
          latitude: 51.509865,
          longitudeDelta: 0.04,
          latitudeDelta: 0.09,
        }
  }
/>
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
