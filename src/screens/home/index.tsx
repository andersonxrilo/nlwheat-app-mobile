import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SignInBox } from "../../components/SignInBox";
import { useAuth } from "../../context/auth";
import { styles } from "./style";
import { KeyboardAvoidingView, Platform } from "react-native";
export const Home = () => {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Header />
        <MessageList></MessageList>
        {!!user ? <SendMessageForm /> : <SignInBox></SignInBox>}
      </View>
    </KeyboardAvoidingView>
  );
};
