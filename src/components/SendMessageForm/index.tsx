import React, { useState } from "react";

import { Alert, Keyboard, TextInput, View } from "react-native";
import { useAuth } from "../../context/auth";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const handleSendMessage = async () => {
    if (!message.trim()) {
      Alert.alert("Escreva a mensagem para enviar.");
    } else {
      setSendingMessage(true);
      await api
        .post("messages", { message })
        .then((response) => {
          setMessage("");
          Keyboard.dismiss();
          setSendingMessage(false);
        })
        .catch((err) => {
          Alert.alert("Não foi possível enviar a mensagem. Tente mais tarde");
          setSendingMessage(false);
        });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual a sua espectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={146}
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}
      />
      <Button
        text="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  );
}
