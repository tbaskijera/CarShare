import { colorAccent, colorAccentSofter, colorInactive } from "@/style/colors";
import { StyleSheet, Text, View } from "react-native";
import { Button as RNPButton } from "react-native-paper";

export const Button = ({ style, disabled = false, ...rest }) => {
  return (
    <RNPButton
      mode="contained"
      disabled={disabled}
      labelStyle={styles.label}
      contentStyle={{ height: 50 }}
      style={[styles.button, style, disabled ? styles.disabled : {}]}
      {...rest}
    ></RNPButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    width: "80%",
    backgroundColor: colorAccent,
  },
  label: {
    color: "white",
  },
  disabled: {
    backgroundColor: colorInactive,
  },
});
