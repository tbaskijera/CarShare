import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthenticationContextProvider } from "@/services/authentication/AuthenticationContext";
import { NavigationRouter } from "@/navigation/NavigationRouter";
import { StatusBar } from "react-native";
import { colorAccent } from "@/style/colors";

export const AppEntry = () => {
  return (
    <AuthenticationContextProvider>
      <PaperProvider>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <NavigationRouter />
      </PaperProvider>
    </AuthenticationContextProvider>
  );
};
