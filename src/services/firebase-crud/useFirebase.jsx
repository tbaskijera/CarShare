import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { collection, increment } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase-config";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { useState, useContext } from "react";

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthenticationContext);

  const createCar = async (car, image) => {
    setIsLoading(true);
    let imageUrl;
    if (image.blob != null) {
      imageUrl = await uploadImage(image.name, image.blob);
    } else {
      imageUrl = car.imageUrl;
    }

    // ako je carId null onda stvara novi dokument kamo je id dokumenta == carId u tom istom dokumentu
    // a ako carId nije null onda jednostavno selecta dokument i updatea ga (pošto je id dokumenta uvijek ==car id)
    let ref;
    if (car.carId == null) {
      ref = doc(collection(db, "cars"));
    } else {
      ref = doc(db, "cars", car.carId);
    }

    setDoc(
      ref,
      {
        ...car,
        carId: car.carId ?? ref.id,
        imageUrl: imageUrl,
      },
      { merge: true }
    );
    setIsLoading(false);
  };

  const updateCarActive = async (id, bool) => {
    const carRef = doc(db, "cars", id);
    await updateDoc(carRef, {
      active: bool,
    });
  };

  const updateCarRentedOut = async (id, bool) => {
    const carRef = doc(db, "cars", id);
    await updateDoc(carRef, {
      rentedOut: bool,
    });
  };

  const updateCarRentedTimes = async (id) => {
    const carRef = doc(db, "cars", id);
    await updateDoc(carRef, {
      rentNumber: increment(1),
    });
  };

  const deleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
  };

  const createReservation = async (reservation) => {
    setIsLoading(true);
    const ref = doc(collection(db, "reservations"));
    setDoc(
      ref,
      {
        ...reservation,
        id: ref.id,
        carRenterId: user.uid,
        past: false,
      },
      { merge: true }
    );
    updateCarRentedOut(reservation.carId, true);
    updateCarRentedTimes(reservation.carId);

    setIsLoading(false);
  };

  const updateReservationStatus = async (id) => {
    const carRef = doc(db, "reservations", id);
    await updateDoc(carRef, {
      past: true,
    });
  };

  const getCarDetails = async (id) => {
    const reservationRef = doc(db, "cars", id);
    const docSnap = await getDoc(reservationRef);
    const car = docSnap.data();
    return car;
  };

  const uploadImage = async (imageName, imageBlob) => {
    const storageRef = ref(storage, `${user.uid}/${imageName}`);
    const snapshot = await uploadBytes(storageRef, imageBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  return {
    createCar,
    deleteCar,
    updateCarActive,
    isLoading,
    uploadImage,
    createReservation,
    getCarDetails,
    updateReservationStatus,
    updateCarRentedOut,
  };
};
