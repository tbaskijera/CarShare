import {
  StyleSheet,
  View,
  ImageBackground as RNImageBackground,
} from "react-native";
import { TextInput } from "@/components/TextInput";
import { Screen } from "@/components/Screen";

export const ImageBackgroundScreen = (props) => {
  return (
    <RNImageBackground
      source={props.source}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.cover}>
        <Screen style={[{ backgroundColor: "transparent" }, props.style]}>
          {props.children}
        </Screen>
      </View>
    </RNImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    backgroundColor: "transparent",
  },
  cover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF50",
  },
});
