import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Spacer } from "@/components/Spacer";
import { colorAccent } from "@/style/colors";

import { Text, StyleSheet } from "react-native";

export const ReserveConfirmationScreen = ({ navigation }) => {
  return (
    <Screen>
      <Spacer height={64} />
      <Text style={styles.text}>Your reservation was successful!</Text>
      <Spacer height={32} />
      <Text style={styles.text}>Find it at More {"->"} My reservations</Text>
      <Spacer height={64} />
      <Button
        onPress={() => {
          navigation.navigate("Tabs", {
            screen: "SearchScreen",
          });
        }}
      >
        Go back
      </Button>
      <Spacer height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { color: colorAccent, fontSize: 30 },
});
