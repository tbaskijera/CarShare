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

import { useNavigation } from "@react-navigation/native";
import {
  dateDaysDiff,
  dateDaysHoursDiff,
  dateTimeDayLeft,
} from "@/utils/dateDifference";

export const useReservationForm = () => {
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showEndPicker, setShowEndPicker] = useState(false);

  const { currentCar, clearState } = useContext(CarContext);
  const [owner, setOwner] = useState({});
  const navigation = useNavigation();

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
    console.log(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  const handleStartPicker = () => {
    setShowStartPicker(true);
  };
  const handleEndPicker = () => {
    setShowEndPicker(true);
  };

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
    const diffDays = dateDaysDiff(startDate, endDate);
    setDuration(diffDays + 1);
  }, [startDate, endDate]);

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", currentCar.ownerId);
      const docSnap = await getDoc(docRef);
      setOwner(docSnap.data());
    };
    getOwner();
  }, [currentCar]);

  useEffect(() => {
    if (currentCar) setTotalPrice(currentCar.price * duration);
  }, [currentCar.price, duration]);

  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      setTimeout(() => {
        clearState();
      }, 500);
    });
  }, [navigation]);

  return {
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
  };
};
