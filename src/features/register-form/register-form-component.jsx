import { useRegisterForm } from "@/features/register-form/register-form.hook";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { View } from "react-native";
import { Spacer } from "@/components/Spacer";
import { HelperText } from "react-native-paper";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { colorDanger } from "@/style/colors";

export const RegisterForm = () => {
  const { fields, submitForm, isSubmitting } = useRegisterForm();

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TextInput
        label="Name"
        error={fields.name.hasError}
        onBlur={fields.name.onBlur}
        onChangeText={fields.name.onChangeText}
        onSubmitEditing={fields.name.onSubmitEditing}
        value={fields.name.value}
      />
      <Spacer height={8}></Spacer>
      <TextInput
        label="Surname"
        error={fields.surname.hasError}
        onBlur={fields.surname.onBlur}
        onChangeText={fields.surname.onChangeText}
        value={fields.surname.value}
      />
      <Spacer height={8}></Spacer>
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
        secureTextEntry
        textContentType="password"
        error={fields.password.hasError}
        onBlur={fields.password.onBlur}
        onChangeText={fields.password.onChangeText}
        value={fields.password.value}
      />

      {fields.name.hasError && (
        <>
          <Spacer height={12}></Spacer>
          <Text style={styles.errorText}> {fields.name.error}</Text>
        </>
      )}
      {fields.surname.hasError && (
        <Text style={styles.errorText}> {fields.surname.error}</Text>
      )}
      {fields.email.hasError && (
        <Text style={styles.errorText}> {fields.email.error}</Text>
      )}
      {fields.password.hasError && (
        <Text style={styles.errorText}> {fields.password.error}</Text>
      )}

      <Spacer height={16}></Spacer>
      <Button loading={isSubmitting} title="SUBMIT" onPress={submitForm}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colorDanger,
  },
});
