import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Screen } from "@/components/Screen";
import { RegisterForm } from "@/features/register-form/register-form-component";
import { colorAccent } from "@/style/colors";
import { Spacer } from "@/components/Spacer";

export const RegisterScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode="never">
      <Screen>
        <Text style={styles.title}>Register</Text>
        <Spacer height={20}></Spacer>
        <RegisterForm></RegisterForm>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 50,
    color: colorAccent,
  },
});
