import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useFirebase } from "@/services/firebase-crud/useFirebase";

export const useServer = () => {
  const [reservations, setReservations] = useState();
  const { updateReservationStatus, updateCarRentedOut } = useFirebase();

  const check = async () => {
    const currentTime = new Date();

    const querySnapshot = await getDocs(collection(db, "reservations"));
    querySnapshot.forEach((doc) => {
      const reservation = doc.data();
      const reservationEnding = reservation.endDate.toDate();
      if (currentTime > reservationEnding) {
        updateReservationStatus(reservation.id);
        updateCarRentedOut(reservation.carId, false);
      } else {
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  return {};
};
