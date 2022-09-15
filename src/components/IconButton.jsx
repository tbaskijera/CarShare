import { TouchableRipple } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const IconButton = (props) => {
  return (
    <TouchableRipple
      onPress={props.onPress}
      borderless={true}
      rippleColor={"#181c2a"}
      style={{ borderRadius: 100 }}
    >
      <Ionicons name={props.name} size={props.size} color={props.color} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({});
