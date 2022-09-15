import { useLoginForm } from "./login-form.hook";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { View } from "react-native";
import { Spacer } from "@/components/Spacer";
import { HelperText } from "react-native-paper";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { colorDanger } from "@/style/colors";

export const LoginForm = () => {
  const { fields, submitForm, isSubmitting } = useLoginForm();

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TextInput
        label="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        error={fields.email.hasError}
        blurOnSubmit={false}
        onBlur={fields.email.onBlur}
        onChangeText={fields.email.onChangeText}
        value={fields.email.value}
      />
      <Spacer height={8}></Spacer>
      <TextInput
        label="Password"
        autoCompleteType="password"
        keyboardType="default"
        secureTextEntry
        textContentType="password"
        fowardRef={fields.password.ref}
        error={fields.password.hasError}
        onBlur={fields.password.onBlur}
        onChangeText={fields.password.onChangeText}
        value={fields.password.value}
      />

      {fields.email.hasError && (
        <>
          <Spacer height={12}></Spacer>
          <Text style={styles.errorText}> {fields.email.error}</Text>
        </>
      )}
      {fields.password.hasError && (
        <Text style={styles.errorText}> {fields.password.error}</Text>
      )}

      <Spacer height={16}></Spacer>
      <Button loading={isSubmitting} onPress={submitForm}>
        SUBMIT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colorDanger,
  },
});
