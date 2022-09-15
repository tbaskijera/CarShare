import { View, Text, StyleSheet } from "react-native";
import { ImageBackgroundScreen } from "@/components/ImageBackgroundScreen";
import { colorAccent } from "@/style/colors";
import { Button } from "@/components/Button";
import { Spacer } from "@/components/Spacer";

export const AuthSelectScreen = ({ navigation }) => {
  return (
    <ImageBackgroundScreen
      source={require("@/assets/images/auth-select-screen-background.png")}
    >
      <Text style={styles.logo}>CarShare</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        >
          Register
        </Button>
        <Spacer height={8}></Spacer>
        <Button
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          Login
        </Button>
      </View>
    </ImageBackgroundScreen>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontWeight: "700",
    fontSize: 50,
    color: colorAccent,
    position: "absolute",
    top: "45%",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
  },
});
