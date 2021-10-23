import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";
import { useAuth } from "../../context/auth";

export function SignInBox() {
  const { isSigninIng, signIn } = useAuth();
  return (
    <View style={styles.container}>
      <Button
        text="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        isLoading={isSigninIng}
        onPress={signIn}
      >
        <AntDesign name="github" size={24} style={styles.icon} />
      </Button>
    </View>
  );
}
