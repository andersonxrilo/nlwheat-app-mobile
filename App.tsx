import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { Home } from "./src/screens/home";
import { AuthProvider } from "./src/context/auth";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthProvider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Home />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
