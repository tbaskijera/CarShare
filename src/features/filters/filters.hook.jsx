import { brands, years } from "@/data";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    year: null,
    brand: null,
    price: null,
  });
  const [tempFilters, setTempFilters] = useState({
    year: null,
    brand: null,
    price: [200, 800],
  });
  const [pickerYears, setPickerYears] = useState([]);
  const [pickerBrands, setPickerBrands] = useState([]);

  useEffect(() => {
    setPickerYears(years);
    setPickerBrands(brands);
  }, []);

  return {
    filters,
    tempFilters,
    pickerYears,
    pickerBrands,
    setFilters,
    setTempFilters,
  };
};
