import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Spacer } from "@/components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { CarContext } from "@/context/CarContext";
import { colorAccent } from "@/style/colors";

export const Card = ({ car, distance }) => {
  const navigation = useNavigation();
  const { setCurrentCar } = useContext(CarContext);
  return (
    <View
      style={{
        alignSelf: "flex-start",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "#181c2a20",
        borderWidth: 0.5,
        marginBottom: 20,
      }}
    >
      <Image
        resizeMode="cover"
        source={{ uri: car.imageUrl }}
        style={{ borderRadius: 25, width: "100%", height: 200 }}
      ></Image>
      <View style={{ margin: 8 }}>
        <TouchableOpacity
          onPress={() => {
            setCurrentCar(car);
            navigation.navigate("HiddenTabsStack", {
              screen: "CarReserveScreen",
            });
          }}
        >
          <Text style={{ fontSize: 25, color: colorAccent, fontWeight: "500" }}>
            {`${car.brand} ${car.model} ${car.year}`.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <Spacer height={5}></Spacer>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 15, color: colorAccent, fontWeight: "500" }}
            >
              {`$${car.price} `}
            </Text>
            <Text
              style={{ fontSize: 15, color: "#181c2a80", fontWeight: "500" }}
            >
              / day
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon name="map-marker" size={23} color={colorAccent}></Icon>
            <Text
              style={{ fontSize: 15, color: colorAccent, fontWeight: "500" }}
            >
              {`${distance} km`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
