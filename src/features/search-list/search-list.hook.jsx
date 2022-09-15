import { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase-config";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { useLocation } from "@/services/location/useLocation";
import { CarContext } from "@/context/CarContext";

export const useSearchList = () => {
  const [filteredCars, setFilteredCars] = useState(null);
  const [fetchedCars, setFetchedCars] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [region, setRegion] = useState(null);

  const { user } = useContext(AuthenticationContext);
  const { filters } = useContext(CarContext);
  const { getUserLocation } = useLocation();

  const filterByBrand = (array, filterValue) => {
    return array.filter((item) => item.brand == filterValue);
  };
  const filterByYear = (array, filterValue) => {
    return array.filter((item) => item.year >= filterValue);
  };
  const filterByPrice = (array, filterValue) => {
    return array.filter(
      (item) => item.price >= filterValue[0] && item.price <= filterValue[1]
    );
  };

  useEffect(() => {
    //Filter options updated so apply all filters here
    let filteredArray = fetchedCars;

    if (filters.brand)
      filteredArray = filterByBrand(filteredArray, filters.brand);
    if (filters.year) filteredArray = filterByYear(filteredArray, filters.year);
    if (filters.price)
      filteredArray = filterByPrice(filteredArray, filters.price);

    setFilteredCars(filteredArray);
  }, [fetchedCars, filters]);

  useEffect(() => {
    const carsRef = collection(db, "cars");
    const q = query(
      carsRef,
      where("ownerId", "!=", user.uid),
      where("active", "==", true),
      where("rentedOut", "==", false)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setFetchedCars(
        querySnapshot.docs.map((doc) => {
          return doc.data();
        })
      );
      setIsRefreshing(false);
      console.log("I RAN");
    });
    return () => unsubscribe(); // detaches listener
  }, [isRefreshing]);

  useEffect(() => {
    const fetchData = async () => {
      const { longitude, latitude } = await getUserLocation();
      setRegion({
        longitude,
        latitude,
      });
    };
    fetchData();
  }, []);

  return { filteredCars, isRefreshing, setIsRefreshing, region };
};
