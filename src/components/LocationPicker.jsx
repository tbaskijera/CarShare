import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "@/components/TextInput";
import { colorBackground } from "@/style/colors";

export const LocationPicker = ({ style, value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextInput
        value={value}
        editable={false}
        style={[{ backgroundColor: "white", width: "100%" }, style]}
        outlineColor={colorBackground}
        icon={"map-marker"}
      ></TextInput>
    </TouchableOpacity>
  );
};
