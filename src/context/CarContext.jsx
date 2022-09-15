import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { createContext, useContext, useState } from "react";

export const CarContext = createContext({});

export const CarContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const initialCar = {
    active: true,
    brand: null,
    carId: null,
    imageUrl: null,
    location: null,
    model: null,
    ownerId: user.uid,
    price: 500,
    region: {
      latitude: null,
      latitudeDelta: null,
      longitude: null,
      longitudeDelta: null,
    },
    rentNumber: 0,
    rentedOut: false,
    year: null,
  };

  const initialFilters = {
    year: null,
    brand: null,
    price: null,
  };

  const [currentCar, setCurrentCar] = useState(initialCar);
  const [filters, setFilters] = useState(initialFilters);

  const clearState = () => {
    setCurrentCar(initialCar);
  };

  return (
    <CarContext.Provider
      value={{
        filters,
        setFilters,
        currentCar,
        setCurrentCar,
        clearState,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
