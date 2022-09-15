import { useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  //Location.setGoogleApiKey(AIzaSyAYCoBGoKf0lkr5eXdSJTw7cCR - YKc8ql8); // staviti u .env prvo stavljanja na github

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  };

  const getAddress = async ({ latitude, longitude }) => {
    console.log(latitude, longitude);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("permission denied!");
      return;
    }
    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    return address;
  };

  return { getUserLocation, getAddress, errorMessage };
};
