import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Map } from "@/features/map/map.component";
import { colorAccent } from "@/style/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from "@/components/Button";
import { useLocation } from "@/services/location/useLocation";
import { useMap } from "@/features/map/map.hook";
import { CarContext } from "@/context/CarContext";

export const LocationSelectScreen = ({ navigation: { goBack } }) => {
  const { getAddress } = useLocation();
  const { region, setRegion } = useMap();
  const { currentCar, setCurrentCar } = useContext(CarContext);

  return (
    <View style={styles.container}>
      <Icon
        name="location-pin"
        style={styles.icon}
        size={70}
        color={colorAccent}
      />
      <View style={{ position: "absolute", zIndex: 3, top: "85%" }}>
        <Button
          style={{ width: 250 }}
          onPress={async () => {
            const location = await getAddress(region);
            setCurrentCar({
              ...currentCar,
              region: region,
              location: `${location[0].city}, ${location[0].country}`,
            });
            goBack();
          }}
        >
          Confirm Location
        </Button>
      </View>
      <Map
        onRegionChangeComplete={(r) => {
          setRegion(r);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    zIndex: 3,
    position: "absolute",
    marginTop: -50,
    marginLeft: -33,
    left: "50%",
    top: "50%",
  },
});
