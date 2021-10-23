import React from "react";
import { MotiView } from "@motify/components";
import { Text, View } from "react-native";
import { MessageType } from "../../types";
import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";

type MessageProps = {
  message: MessageType;
};

export function Message({ message }: MessageProps) {
  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 700 }}
    >
      <Text style={styles.text_message}>{message.text} </Text>
      <View style={styles.footer}>
        <UserPhoto imageUri={message.user.avatar_url} sizes="SMALL" />
        <Text style={styles.message_user}>
          @{message.user.name || message.user.login}
        </Text>
      </View>
    </MotiView>
  );
}
