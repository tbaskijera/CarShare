import { useHostListings } from "@/features/host-listings/host-listings.hook";
import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { IconButton } from "@/components/IconButton";
import { Switch } from "react-native-paper";
import { colorAccent } from "@/style/colors";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { CarItem } from "@/components/CarItem";
export const HostListings = () => {
  const { cars } = useHostListings();
  return (
    <>
      <List.Subheader style={{ color: colorAccent }}>At home</List.Subheader>
      {cars &&
        cars.map((car) => {
          if (car.rentedOut === false) {
            return <CarItem key={car.carId} car={car}></CarItem>;
          }
        })}
      <List.Subheader style={{ color: colorAccent }}>Rented out</List.Subheader>
      {cars &&
        cars.map((car) => {
          if (car.rentedOut === true) {
            return <CarItem key={car.carId} car={car} />;
          }
        })}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: 25,
  },
});
