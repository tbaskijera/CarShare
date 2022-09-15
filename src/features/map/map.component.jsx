import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { mapStyle } from "@/style/map";
import { useLocation } from "@/services/location/useLocation";
import MapView from "react-native-maps";
import { useMap } from "@/features/map/map.hook";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CarContext } from "@/context/CarContext";
import { useNavigation } from "@react-navigation/native";
import { colorAccent, colorBackground } from "@/style/colors";

export const Map = (props) => {
  const { region, cars, isLoading } = useMap();
  const { setCurrentCar } = useContext(CarContext);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {region && !isLoading && (
        <MapView
          initialRegion={region}
          style={styles.map}
          customMapStyle={mapStyle}
          loadingEnabled={isLoading}
          loadingIndicatorColor={colorAccent}
          loadingBackgroundColor={colorBackground}
          {...props}
        >
          {cars.map((car) => (
            <MapView.Marker
              key={car.carId}
              coordinate={{
                latitude: car.region.latitude,
                longitude: car.region.longitude,
              }}
              onPress={() => {
                setCurrentCar(car);
                navigation.navigate("HiddenTabsStack", {
                  screen: "CarReserveScreen",
                });
              }}
            >
              <Ionicons
                name="car-sport"
                size={30}
                style={{ color: "#181c2a" }}
              ></Ionicons>
            </MapView.Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    minHeight: 100,
  },
});
