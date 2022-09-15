import { useState, useEffect, useContext } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";

export const useReservationList = () => {
  const [reservations, setReservations] = useState();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("carRenterId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setReservations(
        querySnapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
    return () => unsubscribe(); // detaches listener
  }, []);

  return { reservations };
};
