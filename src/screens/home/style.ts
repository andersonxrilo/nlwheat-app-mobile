import { NativeModules, Platform, StyleSheet } from "react-native";
import { COLORS } from "../../theme";

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
    paddingTop: STATUSBAR_HEIGHT,
  },
});
