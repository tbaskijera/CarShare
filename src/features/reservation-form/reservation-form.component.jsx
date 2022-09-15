import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { CarContext } from "@/context/CarContext";
import { DatePicker } from "@/components/DatePicker";
import { useReservationForm } from "@/features/reservation-form/reservation-form.hook";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { Spacer } from "@/components/Spacer";
import { colorAccent, colorAccentSofter } from "@/style/colors";
import { useNavigation } from "@react-navigation/native";

export const ReservationForm = () => {
  const {
    startDate,
    endDate,
    showStartPicker,
    showEndPicker,
    duration,
    totalPrice,
    owner,
    onChangeStart,
    onChangeEnd,
    handleStartPicker,
    handleEndPicker,
  } = useReservationForm();
  const { createReservation, isLoading } = useFirebase();
  const { currentCar } = useContext(CarContext);
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigation();

  return (
    <>
      <View style={{ width: "90%", alignItems: "center" }}>
        <DatePicker
          value={startDate}
          visible={showStartPicker}
          onChange={onChangeStart}
          handlePicker={handleStartPicker}
          minimumDate={new Date()}
          placeholderText={"Start date"}
        />
        <DatePicker
          value={endDate}
          visible={showEndPicker}
          onChange={onChangeEnd}
          handlePicker={handleEndPicker}
          minimumDate={startDate}
          placeholderText={"End date"}
        />
      </View>
      <Spacer height={12} />
      <View style={styles.textContainer}>
        {currentCar.price ? (
          <Text style={styles.text}> Price per day: ${currentCar.price}</Text>
        ) : null}
        {duration ? (
          <Text style={styles.text}> Duration: {duration} days</Text>
        ) : null}
        {totalPrice ? (
          <Text style={styles.text}> Total price is: ${totalPrice}</Text>
        ) : null}
      </View>
      <Spacer height={16} />
      <Button
        onPress={async () => {
          const reservation = {
            carId: currentCar.carId,
            carOwnerId: currentCar.ownerId,
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            totalPrice: totalPrice,
          };
          await createReservation(reservation);
          navigation.goBack();
        }}
        loading={isLoading}
      >
        Reserve
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    height: "auto",
    width: "90%",
    borderRadius: 25,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#181c2a",
    fontWeight: "500",
    fontSize: 14,
  },

  infoBox: {
    height: "auto",
    width: "100%",
    borderRadius: 20,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "orange",
    overflow: "hidden",
  },

  mainImage: {
    width: 300,
    height: 200,
    borderRadius: 20,
  },

  title: {
    fontSize: 25,
    color: "#181c2a",
    fontWeight: "700",
  },
});
