import { Screen } from "@/components/Screen";
import { LoginForm } from "@/features/login-form/login-form.component";
import { colorAccent } from "@/style/colors";
import { View, StyleSheet, Text } from "react-native";
import { Spacer } from "@/components/Spacer";

export const LoginScreen = () => {
  return (
    <Screen>
      <Text style={styles.title}>Login</Text>
      <Spacer height={20}></Spacer>
      <LoginForm></LoginForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 50,
    color: colorAccent,
  },
});
