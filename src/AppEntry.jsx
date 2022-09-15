import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthenticationContextProvider } from "@/services/authentication/AuthenticationContext";
import { NavigationRouter } from "@/navigation/NavigationRouter";

export const AppEntry = () => {
  return (
    <AuthenticationContextProvider>
      <PaperProvider>
        <NavigationRouter />
      </PaperProvider>
    </AuthenticationContextProvider>
  );
};
