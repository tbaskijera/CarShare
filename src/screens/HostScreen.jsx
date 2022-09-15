import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Screen } from "@/components/Screen";
import { FAB } from "react-native-paper";
import { Spacer } from "@/components/Spacer";
import { HostListings } from "@/features/host-listings/host-listings.component";
import { colorAccent } from "@/style/colors";

export const HostScreen = ({ navigation }) => {
  return (
    <Screen style={{ alignItems: "stretch" }}>
      <Spacer height={16} />
      <Text style={styles.text}>Your listings</Text>
      <HostListings></HostListings>
      <FAB
        style={styles.fab}
        color="white"
        icon="plus"
        onPress={() => {
          navigation.navigate("HiddenTabsStack", {
            screen: "CarCreateUpdateScreen",
            params: { mode: "Create listing" },
          });
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 35, color: colorAccent, alignSelf: "flex-start" },
  fab: {
    backgroundColor: colorAccent,
    position: "absolute",
    top: 600,
    right: 30,
  },
});
