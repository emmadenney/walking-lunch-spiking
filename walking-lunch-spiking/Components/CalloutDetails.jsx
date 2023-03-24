import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { getPlaceDeatails } from "../api";

export default function CalloutDetails() {
  const [places, setPlaces] = useState([]);

  const handlePlaceSelected = (place, apiKey) => {
    return getPlaceDeatails().then((data) => {
      setPlaces([...places, data.result]);
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {places.map((place) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
          />
        ))}
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handlePlaceSelected}
        query={{
          key: "YOUR_API_KEY",
          language: "en",
          location: "CURRENT_LOCATION",
          radius: 5000,
          types: "establishment",
        }}
        styles={{
          container: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
        }}
      />
    </View>
  );
}
