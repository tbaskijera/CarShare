import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { Screen } from "@/components/Screen";
import { mapStyle } from "@/style/map";
import { useLocation } from "@/services/location/useLocation";
import MapView from "react-native-maps";
import { Map } from "@/features/map/map.component";

export const MapScreen = () => {
  return <Map></Map>;
};
