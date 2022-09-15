import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Chip as RNPChip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Chip = (props) => {
  return (
    <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
      <RNPChip
        {...props}
        closeIcon={() => (
          <TouchableOpacity onPress={props.onClose}>
            <Icon
              name={props.iconName}
              size={18}
              color="#181c2a"
              style={{
                borderRadius: 20,
                backgroundColor: "white",
                marginTop: 1,
              }}
            />
          </TouchableOpacity>
        )}
        textStyle={{ color: "white" }}
        style={{
          backgroundColor: "#181c2a",
          marginRight: 5,
        }}
      >
        {props.text}
      </RNPChip>
    </View>
  );
};
