import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  // for directions
  //const origin = {latitude: 53.4721341, longitude: -2.2377251};// hard coded NC
  const origin = "Manchester Technology Centre";
  const destination = { latitude: 53.636325899999996, longitude: -2.3278136 }; //Ricks house
  const GOOGLE_MAPS_APIKEY = "AIzaSyDIt7GvEhgmT3io-pKMPqTKIif4jkx9-2U";
  // for directions

  const mapJson = [
    {
      featureType: "poi.park",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.arterial",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];
  // ^^ mapJSON customises google maps styling, roads etc

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
        placeholder=" Input Address"
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
          provider={PROVIDER_GOOGLE}
          // ^^ set google as the fixed map provider
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          customMapStyle={mapJson}
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
          <MapViewDirections
            origin={origin}
            destination={destination}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="hotpink"
            waypoints={["Trafford Centre"]}
            apikey={GOOGLE_MAPS_APIKEY}
          />
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
    width: "80%",
    height: "50%",
  },
});
