import { StyleSheet, View } from "react-native";
import { colorAccent, colorBackground } from "@/style/colors";

export const Screen = ({ style, ...rest }) => {
  return <View style={[styles.container, style]} {...rest}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colorBackground,
    paddingHorizontal: 12,
    paddingTop: 25,
    paddingBottom: 20,
    alignItems: "center",
  },
});
