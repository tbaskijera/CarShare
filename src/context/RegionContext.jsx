import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { createContext, useContext, useState } from "react";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

export const RegionContext = createContext({});

export const RegionContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  const LOCATION_TASK_NAME = "background-location-task";

  const requestPermissions = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
        showsBackgroundLocationIndicator: true,
        timeInterval: 1000,
        activityType: Location.ActivityType.AutomotiveNavigation,
        distanceInterval: 1,
      });
    }
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      setLocation(locations);
    }
  });

  return (
    <RegionContext.Provider
      value={{
        location,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};
