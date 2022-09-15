import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { SearchScreen } from "@/screens/SearchScreen";
import { MapScreen } from "@/screens/MapScreen";
import { HostScreen } from "@/screens/HostScreen";
import { MoreScreen } from "@/screens/MoreScreen";

import { CarCreateUpdateScreen } from "@/screens/CarCreateUpdateScreen";
import { LocationSelectScreen } from "@/screens/LocationSelectScreen";
import { CarReserveScreen } from "@/screens/CarReserveScreen";
import { ProfileEditScreen } from "@/screens/ProfileEditScreen";
import { ReservationsScreen } from "@/screens/ReservationsScreen";
import { colorAccent, colorInactive } from "@/style/colors";
import { CarContextProvider } from "@/context/CarContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RegionContextProvider } from "@/context/RegionContext";
import { useServer } from "@/services/server/useServer";

const Stack = createStackNavigator();
const SubStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const MainStack = () => {
  useServer();
  return (
    <RegionContextProvider>
      <CarContextProvider>
        <BottomSheetModalProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="HiddenTabsStack" component={HiddenTabsStack} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </CarContextProvider>
    </RegionContextProvider>
  );
};

const HiddenTabsStack = ({ navigation }) => {
  return (
    <SubStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "300",
          color: colorAccent,
        },
        headerTitleAlign: "center",
      }}
    >
      <SubStack.Screen
        name="CarCreateUpdateScreen"
        component={CarCreateUpdateScreen}
        options={({ route }) => ({ title: route.params.mode })}
      />
      <SubStack.Screen
        name="LocationSelectScreen"
        component={LocationSelectScreen}
        options={{ title: "Select location" }}
      />
      <SubStack.Screen
        name="CarReserveScreen"
        component={CarReserveScreen}
        options={{ title: "Reserve car" }}
      />
      <SubStack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{ title: "Edit profile" }}
      />
      <SubStack.Screen
        name="ReservationsScreen"
        component={ReservationsScreen}
        options={{ title: "Your reservations" }}
      />
    </SubStack.Navigator>
  );
};

const screenOptions = ({ route }) => ({
  unmountOnBlur: true,
  headerShown: false,

  tabBarIcon: ({ focused }) => {
    let iconName;
    if (route.name === "SearchScreen")
      iconName = focused ? "search" : "search-outline";
    if (route.name === "MapScreen") iconName = focused ? "map" : "map-outline";
    if (route.name === "HostScreen")
      iconName = focused ? "car-sport" : "car-sport-outline";
    if (route.name === "MoreScreen") {
      iconName = focused
        ? "ellipsis-horizontal"
        : "ellipsis-horizontal-outline";
    }
    return (
      <Ionicons
        name={iconName}
        size={25}
        color={focused ? colorAccent : colorInactive}
      />
    );
  },
});

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions={screenOptions} barStyle={styles.navigation}>
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ tabBarLabel: "Search" }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ tabBarLabel: "Map", lazy: false }}
      />
      <Tab.Screen
        name="HostScreen"
        component={HostScreen}
        options={{ tabBarLabel: "Host", lazy: false }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{ tabBarLabel: "More" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: "white",
    elevation: 0,
    position: "absolute",
    overflow: "hidden",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
