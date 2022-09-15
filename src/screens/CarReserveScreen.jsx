import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/Button";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { Screen } from "@/components/Screen";
import { CarContext } from "@/context/CarContext";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/firebase-config";
import { TextInput } from "@/components/TextInput";
import { DatePicker } from "@/components/DatePicker";
import { Spacer } from "@/components/Spacer";
import { ReservationForm } from "@/features/reservation-form/reservation-form.component";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { OwnerCard } from "@/features/owner-card/owner-card.component";

export const CarReserveScreen = () => {
  const { currentCar } = useContext(CarContext);

  return (
    <Screen>
      <Spacer height={80} />
      <Image
        resizeMode="cover"
        source={{ uri: currentCar.imageUrl }}
        style={styles.mainImage}
      />
      <Spacer height={12} />
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>
          {`${currentCar.brand} ${currentCar.model} ${currentCar.year}`.toUpperCase()}
        </Text>
      </View>
      <Spacer height={12} />

      <OwnerCard />
      <Spacer height={12} />

      <ReservationForm />
    </Screen>
  );
};

const styles = StyleSheet.create({
  ownerContainer: {
    backgroundColor: "white",

    height: 80,
    width: "auto",
    borderRadius: 25,
    flexDirection: "row",
    padding: 8,
  },

  ownerImageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "orange",
    overflow: "hidden",
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

  ownerImage: {
    width: "100%",
    height: "100%",
  },

  mainImage: {
    width: "90%",
    height: 200,
    borderRadius: 20,
  },

  title: {
    fontSize: 25,
    color: "#181c2a",
    fontWeight: "700",
    textAlign: "center",
  },
});
