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

  const getReservationStatus = () => {
    if (reservation.past) {
      return `Paid $${reservation.totalPrice}`;
    }

    if (reservation.startDate.toDate() > new Date()) {
      return `Starts in: ${dateDaysHoursDiff(reservation.startDate.toDate())}`;
    }

    return `Time left: ${dateDaysHoursDiff(reservation.endDate.toDate())}`;
  };

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
          description={getReservationStatus()}
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
