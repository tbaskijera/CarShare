import { View } from "react-native";

export const Spacer = ({ height = "auto", width = "auto" }) => {
  return <View style={{ height: height, width: width }}></View>;
};
