import { useEffect, useState, useRef, useContext } from "react";
import { years, brands } from "@/data";
import { fetchModels } from "@/services/api/fetchModels";
import { CarContext } from "@/context/CarContext";
import { useNavigation } from "@react-navigation/native";

export const useCarCreateUpdate = () => {
  const [pickerYears, setPickerYears] = useState([]);
  const [pickerBrands, setPickerBrands] = useState([]);
  const [pickerModels, setPickerModels] = useState([]);

  const isMounted = useRef(false);

  const { currentCar, setCurrentCar, clearState } = useContext(CarContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      setTimeout(() => {
        clearState();
      }, 500);
    });
  }, [navigation]);

  useEffect(() => {
    setPickerYears(years);
    setPickerBrands(brands);
  }, []);

  useEffect(() => {
    if (isMounted) {
      (async () => {
        setPickerModels(await fetchModels(currentCar.brand, currentCar.year));
      })();
    } else {
      isMounted.current = true;
    }
  }, [currentCar.brand, currentCar.year]);

  return {
    currentCar,
    pickerYears,
    pickerBrands,
    pickerModels,
    setCurrentCar,
  };
};
