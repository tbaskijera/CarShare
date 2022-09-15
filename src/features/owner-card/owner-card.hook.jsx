import { useState, useEffect, useContext } from "react";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { CarContext } from "@/context/CarContext";

export const useOwnerCard = () => {
  const [owner, setOwner] = useState();
  const { currentCar } = useContext(CarContext);

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", currentCar.ownerId);
      const docSnap = await getDoc(docRef);
      setOwner(docSnap.data());
    };
    getOwner();
  }, []);

  return { owner };
};
