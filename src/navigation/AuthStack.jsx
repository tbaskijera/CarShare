import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { AuthSelectScreen } from "@/screens/AuthSelectScreen";
import { LoginScreen } from "@/screens/LoginScreen";
import { RegisterScreen } from "@/screens/RegisterScreen";
import { colorBackground } from "@/style/colors";

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      title: "",
      headerStyle: {
        backgroundColor: colorBackground,

        elevation: 0,
      },
    }}
  >
    <Stack.Screen
      name="AuthSelectScreen"
      component={AuthSelectScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
);
