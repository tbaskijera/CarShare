import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { IconButton } from "@/components/IconButton";
import { Switch } from "react-native-paper";
import { colorAccent } from "@/style/colors";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "@/context/CarContext";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@/components/Button";
import { dateDaysHoursDiff } from "@/utils/dateDifference";
import { Timestamp } from "firebase/firestore";

export const ReservationItem = ({ reservation }) => {
  const { getCarDetails } = useFirebase();
  const [car, setCar] = useState();

  useEffect(() => {
    (async () => {
      const details = await getCarDetails(reservation.carId);
      setCar(details);
    })();
  }, []);
  return (
    <>
      {car ? (
        <List.Item
          title={`${car.brand} ${car.model} ${car.year}`}
          description={
            reservation.past
              ? `Paid $${reservation.totalPrice}`
              : `Time left: ${dateDaysHoursDiff(reservation.endDate.toDate())}`
          }
          borderless={true}
          titleStyle={{ color: colorAccent }}
          descriptionStyle={{
            color: "#808080",
          }}
          style={{
            backgroundColor: "white",
            marginHorizontal: 8,
            marginBottom: 8,
            borderRadius: 25,
          }}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({});
