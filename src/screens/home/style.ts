import { NativeModules, Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { COLORS } from "../../theme";

const STATUSBAR_HEIGHT = getStatusBarHeight();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
    paddingTop: STATUSBAR_HEIGHT,
  },
});
