import { StyleSheet, Text, View } from "react-native";
export const ResultNumber = ({ number }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 15 }}>
      <Text
        style={{
          color: "#181c2a",
          marginRight: 10,
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        Results
      </Text>
      <View
        style={{
          backgroundColor: "#181c2a",
          borderRadius: 100,
          width: 23,
          height: 23,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>{number}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
