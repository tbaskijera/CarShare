import {
  colorAccent,
  colorAccentSofter,
  colorBackground,
  colorDanger,
  colorTheme,
} from "@/style/colors";
import { View, StyleSheet } from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";

export const TextInput = (props) => {
  const { style, ...rest } = props;
  return (
    <RNPTextInput
      label={props.placeholder}
      mode="outlined"
      activeOutlineColor={colorAccent}
      right={
        props.icon ? (
          <RNPTextInput.Icon
            name={props.icon}
            onPress={props.onPressIcon}
            color={colorAccent}
            size={25}
            style={{ marginTop: 12 }}
          />
        ) : null
      }
      autoCapitalize="none"
      theme={{
        roundness: 25,
        colors: {
          placeholder: colorAccentSofter,
          text: colorAccent,
          error: colorDanger,
        },
      }}
      style={[styles.input, style]}
      {...rest}
    ></RNPTextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colorBackground,
    width: "80%",
    height: 50,
  },
});
