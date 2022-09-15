import { View, Text, StyleSheet } from "react-native";
import { Slider as RNSlider } from "@miblanchard/react-native-slider";
import { Spacer } from "@/components/Spacer";
import { colorAccent } from "@/style/colors";

export const Slider = ({ value, handleChange, mode = "single" }) => {
  return (
    <View style={{ alignItems: "center", height: 100 }}>
      <Text style={styles.text}>
        {mode == "single"
          ? `Price per day: $${value}`
          : `Price range: $${value[0]} - $${value[1]}`}
      </Text>
      <Spacer height={12} />
      <RNSlider
        value={value}
        onValueChange={handleChange}
        animationType="spring"
        minimumValue={10}
        maximumValue={1000}
        step={1}
        containerStyle={{ width: "90%", height: "10%" }}
        thumbTintColor="#181c2a"
        minimumTrackTintColor="#181c2a"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colorAccent,
    fontWeight: "600",
  },
});
