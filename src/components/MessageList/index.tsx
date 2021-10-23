import React, { useEffect, useState } from "react";

import { ScrollView, View } from "react-native";
import { api } from "../../services/api";
import { Message } from "../Message";
import { io } from "socket.io-client";
import { MessageType } from "../../types/message";
import { styles } from "./styles";
const messagesQueue: MessageType[] = [];
const socket = io(String(api.defaults.baseURL));

socket.on("new_message", (newMessage) => {
  console.log(newMessage);
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessage] = useState<MessageType[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessage((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api
      .get("messages/last3")
      .then((response) => {
        setMessage(response.data as MessageType[]);
      })
      .catch((err) => {
        console.log("Não conseguiu retornar mensagens da api");
      });
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {messages.map((message, i) => {
        return <Message key={i} message={message}></Message>;
      })}
    </ScrollView>
  );
}
