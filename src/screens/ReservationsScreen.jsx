import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ReservationList } from "@/features/reservation-list/reservation-list.component";
import { colorAccent } from "@/style/colors";
import { Screen } from "@/components/Screen";
import { Spacer } from "@/components/Spacer";
export const ReservationsScreen = () => {
  return (
    <Screen style={{ alignItems: "stretch" }}>
      <Spacer height={75} />
      <ReservationList />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 35, color: colorAccent, alignSelf: "flex-start" },
});
