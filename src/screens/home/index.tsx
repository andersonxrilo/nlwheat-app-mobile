import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { styles } from "./style";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MessageList></MessageList>
    </View>
  );
};
