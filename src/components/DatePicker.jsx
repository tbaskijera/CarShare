import RNDateTimePicker from "@react-native-community/datetimepicker";

import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "@/components/TextInput";
import moment from "moment";

export const DatePicker = ({ value, visible, handlePicker, ...rest }) => {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity onPress={handlePicker}>
        <TextInput
          value={moment(value).format("DD/MM/YYYY")}
          icon={"calendar-month-outline"}
          editable={false}
          style={{ backgroundColor: "white", width: "auto" }}
        ></TextInput>
      </TouchableOpacity>

      {visible && <RNDateTimePicker value={value} {...rest} />}
    </View>
  );
};
