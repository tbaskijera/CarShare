import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Screen } from "@/components/Screen";
import { List, Divider } from "react-native-paper";
import { colorAccent } from "@/style/colors";
import { Spacer } from "@/components/Spacer";
import { Dialog } from "@/components/Dialog";
import { useFirebase } from "@/services/firebase-crud/useFirebase";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { RegionContext } from "@/context/RegionContext";

export const MoreScreen = ({ navigation }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { onLogout } = useContext(AuthenticationContext);
  const { location } = useContext(RegionContext);

  return (
    <Screen style={{ alignItems: "stretch" }}>
      <Spacer height={16} />
      <Text style={styles.text}>More</Text>
      <Spacer height={16} />
      <List.Item
        onPress={() =>
          navigation.navigate("HiddenTabsStack", {
            screen: "ReservationsScreen",
          })
        }
        title="My reservations"
        left={(props) => (
          <List.Icon {...props} icon="ticket-confirmation" color="#181c2a" />
        )}
        titleStyle={{ color: "#181c2a" }}
        style={{ marginLeft: -15 }}
      />
      <Divider></Divider>
      <List.Item
        onPress={() =>
          navigation.navigate("HiddenTabsStack", {
            screen: "ProfileEditScreen",
          })
        }
        title="Edit profile"
        left={(props) => (
          <List.Icon {...props} icon="account-edit" color="#181c2a" />
        )}
        titleStyle={{ color: "#181c2a" }}
        style={{ marginLeft: -15 }}
      />
      <Divider></Divider>
      <List.Item
        title="Logout"
        left={(props) => <List.Icon {...props} icon="logout" color="#181c2a" />}
        titleStyle={{ color: "#181c2a" }}
        onPress={() => setShowDialog(true)}
        style={{ marginLeft: -15 }}
      />
      <Dialog
        title={"Logout"}
        description={"Are you sure you want to logout?"}
        visible={showDialog}
        setVisible={setShowDialog}
        onPressConfirm={() => onLogout()}
      ></Dialog>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 35, color: colorAccent, alignSelf: "flex-start" },
});
