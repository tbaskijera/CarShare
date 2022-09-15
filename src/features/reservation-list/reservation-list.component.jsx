import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { colorAccent } from "@/style/colors";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { useReservationList } from "@/features/reservation-list/reservation-list.hook";
import { ReservationItem } from "@/components/ReservationItem";

export const ReservationList = () => {
  const { reservations } = useReservationList();
  return (
    <>
      <List.Subheader style={{ color: colorAccent }}>Active</List.Subheader>
      {reservations &&
        reservations.map((reservation) => {
          if (reservation.past === false) {
            return (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
              ></ReservationItem>
            );
          }
        })}
      <List.Subheader style={{ color: colorAccent }}>Past</List.Subheader>
      {reservations &&
        reservations.map((reservation) => {
          if (reservation.past === true) {
            return (
              <ReservationItem key={reservation.id} reservation={reservation} />
            );
          }
        })}
    </>
  );
};
const styles = StyleSheet.create({});
