import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ImagePlaceholder = ({ onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {image ? (
          <Image
            resizeMode="cover"
            source={{ uri: image }}
            style={{
              width: 300,
              height: 200,
              borderRadius: 20,
            }}
          />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="camera" size={25} />
            <Text> Add image </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,

    height: 200,
    width: 300,
    backgroundColor: "#ffffff",
  },
});
