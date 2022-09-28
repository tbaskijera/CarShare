import React, { useContext, useState, useEffect } from "react";
import { CarContext } from "@/context/CarContext";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";

import { useNavigation } from "@react-navigation/native";
import { dateDaysDiff } from "@/utils/dateDifference";

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
    setShowStartPicker(false);
    setStartDate(selectedDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    setShowEndPicker(false);
    selectedDate.setUTCHours(21, 59, 59, 59);
    setEndDate(selectedDate);
  };

  const handleStartPicker = () => {
    setShowStartPicker(true);
  };
  const handleEndPicker = () => {
    setShowEndPicker(true);
  };

  useEffect(() => {
    if (startDate > endDate) {
      const tmpDate = new Date(startDate.getTime());
      tmpDate.setUTCHours(21, 59, 59, 59);
      setEndDate(tmpDate);
    }
    if (startDate.getTime() != endDate.getTime()) {
      const diffDays = dateDaysDiff(startDate, endDate);
      setDuration(diffDays);
    }
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
