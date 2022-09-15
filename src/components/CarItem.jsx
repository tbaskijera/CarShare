import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { IconButton } from "@/components/IconButton";
import { Switch } from "react-native-paper";
import { colorAccent } from "@/style/colors";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { useContext } from "react";
import { CarContext } from "@/context/CarContext";
import { useNavigation } from "@react-navigation/native";

export const CarItem = ({ car }) => {
  const { updateCarActive } = useFirebase();
  const { setCurrentCar } = useContext(CarContext);
  const navigation = useNavigation();
  return (
    <List.Item
      key={car}
      title={`${car.brand} ${car.model} ${car.year}`}
      description={`Rented out ${car.rentNumber} times`}
      onPress={() => {
        console.log(car.brand);
      }}
      onLongPress={() => {}}
      titleStyle={{ color: car.active ? colorAccent : "#181c2a80" }}
      descriptionStyle={{
        color: car.active ? "#808080" : "#80808080",
      }}
      style={{
        backgroundColor: car.active ? "#FFFFFF" : "#FFFFFF80",
        marginHorizontal: 8,
        marginBottom: 8,
        borderRadius: 25,
      }}
      borderless={true}
      right={() => (
        <>
          <View style={{ top: 10 }}>
            <IconButton
              name={"create-outline"}
              size={30}
              color={car.active ? colorAccent : "#181c2a80"}
              onPress={() => {
                setCurrentCar(car);
                navigation.navigate("HiddenTabsStack", {
                  screen: "CarCreateUpdateScreen",
                  params: { mode: "Update listing" },
                });
              }}
            />
          </View>
          <View style={{ width: 10 }}></View>
          <Switch
            value={car.active}
            onValueChange={() => updateCarActive(car.carId, !car.active)}
            color={colorAccent}
          />
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({});
