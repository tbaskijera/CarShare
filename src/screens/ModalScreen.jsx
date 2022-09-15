import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Spacer } from "@/components/Spacer";
import { useFilters } from "@/features/filters/filters.hook";
import { Picker } from "@/components/Picker";
import { Slider } from "@/components/Slider";
import { Screen } from "@/components/Screen";
import { useContext, useState } from "react";
import { CarContext } from "@/context/CarContext";
export const ModalScreen = ({ handleDismissModalPress }) => {
  const { tempFilters, pickerYears, pickerBrands, setTempFilters } =
    useFilters();

  const { setFilters } = useContext(CarContext);

  return (
    <Screen
      style={{
        paddingHorizontal: 25,
      }}
    >
      <Text
        style={{
          color: "#181c2a",
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        Filter
      </Text>
      <Spacer height={25} />
      <View style={{ width: "100%" }}>
        <Picker
          selectedValue={tempFilters.year}
          pickerValues={pickerYears}
          handleChange={(value) =>
            setTempFilters({ ...tempFilters, year: value })
          }
          label={"Newer than..."}
        />
        <Spacer height={10} />
        <Picker
          selectedValue={tempFilters.brand}
          pickerValues={pickerBrands}
          handleChange={(value) =>
            setTempFilters({ ...tempFilters, brand: value })
          }
          label={"Brand"}
        />
        <Spacer height={30}></Spacer>

        <Slider
          value={tempFilters.price}
          handleChange={(value) =>
            setTempFilters({ ...tempFilters, price: value })
          }
          mode={"double"}
          minimumValue={10}
          maximumValue={1000}
          step={1}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button
          style={{
            backgroundColor: "white",
            width: "50%",
          }}
          labelStyle={{ color: "#181c2a" }}
          onPress={handleDismissModalPress}
        >
          Go back
        </Button>
        <Spacer width={15}></Spacer>
        <Button
          style={{
            width: "50%",
          }}
          onPress={() => {
            setFilters(() => ({ ...tempFilters }));
            handleDismissModalPress();
          }}
        >
          Apply filters
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginLeft: 20,
    marginRight: 20,
  },
  contentContainer: {
    backgroundColor: "#e9e9ed",
    flex: 1,
    alignItems: "center",
  },
  picker: {
    width: 300,
    color: "#181c2a",
    backgroundColor: "#FFFFFF",
  },
});
