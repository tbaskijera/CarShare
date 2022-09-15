import { useState, useEffect, useContext } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";

export const useHostListings = () => {
  const [cars, setCars] = useState();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const carsRef = collection(db, "cars");
    const q = query(carsRef, where("ownerId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCars(
        querySnapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
    return () => unsubscribe(); // detaches listener
  }, []);

  return { cars };
};
