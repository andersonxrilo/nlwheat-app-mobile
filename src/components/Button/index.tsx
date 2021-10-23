import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue,
  ActivityIndicator,
} from "react-native";
import { View } from "react-native";

import { styles } from "./styles";
type ButtonProps = TouchableOpacityProps & {
  text: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  isLoading?: boolean;
};

export function Button({
  text,
  color,
  backgroundColor,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {rest.children}
          <Text style={[styles.title, { color }]}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
