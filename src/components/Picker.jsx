import { colorAccent, colorAccentSofter, colorInactive } from "@/style/colors";
import { View, Text, StyleSheet } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";

export const Picker = ({
  selectedValue,
  pickerValues,
  handleChange,
  label,
  enabled = true,
}) => {
  {
  }
  return (
    <View
      style={{
        borderRadius: 25,
        overflow: "hidden",
      }}
    >
      <RNPicker
        selectedValue={selectedValue}
        onValueChange={handleChange}
        style={[styles.picker, enabled ? {} : styles.disabled]}
        dropdownIconColor={enabled ? colorAccent : colorInactive}
        dropdownIconRippleColor={enabled ? colorAccent : colorInactive}
      >
        <RNPicker.Item
          label={label}
          enabled={false}
          color={colorAccentSofter}
        />

        {pickerValues &&
          pickerValues.map((item) => {
            return (
              <RNPicker.Item
                label={item.label}
                value={item.value}
                key={item}
                color={colorAccent}
              ></RNPicker.Item>
            );
          })}
      </RNPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: { backgroundColor: "#FFFFFF90", color: colorAccentSofter },
  picker: {
    width: "100%",
    color: colorAccent,
    backgroundColor: "white",
  },
});

/*
{pickerValues.map((item) => {
            return (
              <RNPicker.Item
                label={item.label}
                value={item.value}
                key={item}
                color={colorAccent}
              ></RNPicker.Item>
            )
          })}
*/
