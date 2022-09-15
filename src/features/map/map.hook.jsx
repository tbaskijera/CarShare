import { useState, useEffect, useContext } from "react";
import { useLocation } from "@/services/location/useLocation";
import { constants } from "@/constants";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";

export const useMap = () => {
  const [region, setRegion] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const { user } = useContext(AuthenticationContext);
  const { getUserLocation } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const { longitude, latitude } = await getUserLocation();
      setRegion({
        longitude: longitude,
        longitudeDelta: constants.LNG_DELTA,
        latitude: latitude,
        latitudeDelta: constants.LAT_DELTA,
      });
    })();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const carsRef = collection(db, "cars");
    const q = query(
      carsRef,
      where("ownerId", "!=", user.uid),
      where("rentedOut", "==", false),
      where("active", "==", true)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCars(
        querySnapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
    return () => unsubscribe(); // detaches listener
  }, []);

  return { region, cars, isLoading, setRegion };
};
