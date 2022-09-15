import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { MainStack } from "@/navigation/MainStack";
import { AuthStack } from "@/navigation/AuthStack";

export const NavigationRouter = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
