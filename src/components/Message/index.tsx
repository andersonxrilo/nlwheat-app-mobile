import React from "react";

import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";

export function Message() {
  return (
    <View style={styles.container}>
      <Text style={styles.text_message}>Texto da mensagem</Text>
      <View>
        <UserPhoto
          imageUri="https://github.com/andersonxrilo.png"
          sizes="SMALL"
        />
        <Text style={styles.username_message}>Nome do Usuário</Text>
      </View>
    </View>
  );
}
