import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSessions from "expo-auth-session";
import { UserType } from "../types";
import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = "30103c9ceba003833e6b";
const SCOPE = "read:user";

type AuthContextData = {
  user: UserType | null;
  signIn: () => void;
  signOut: () => void;
  isSigninIng: boolean;
};
const AuthContext = createContext({} as AuthContextData);

type AuthResponse = {
  token: string;
  user: UserType;
};

type AuthProviderType = {
  children: React.ReactNode;
};
type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

export function AuthProvider(props: AuthProviderType) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isSigninIng, setIsSigninIng] = useState(true);
  const signOut = async () => {
    setUser(null);
    //localStorage.removeItem("@dowhile:token");
    await AsyncStorage.removeItem("@dowhile:token");
  };
  const signIn = async () => {
    setIsSigninIng(true);
    try {
      const authUrl = `https://github.com/login/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}`;
      const authorizationResponse = (await AuthSessions.startAsync({
        authUrl,
      })) as AuthorizationResponse;
      if (
        authorizationResponse.type == "success" &&
        authorizationResponse.params.error !== "access_denied"
      ) {
        await authServer(authorizationResponse.params.code || "");
      }
    } catch (err) {
      console.log(err);
    }

    setIsSigninIng(false);
  };

  const authServer = async (githubCode: string) => {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });
    const { token, user } = response.data;

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    // localStorage.setItem("@dowhile:token", token);
    await AsyncStorage.setItem("@dowhile:token", token);
    setUser(user);
  };

  useEffect(() => {
    const auth_token = async () => {
      const token = await AsyncStorage.getItem("@dowhile:token");
      console.log("authtoken");
      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        api
          .get<UserType>("profile")
          .then((response) => {
            setUser(response.data);
            setIsSigninIng(false);
          })
          .catch((err) => {
            console.log(err);
            setIsSigninIng(false);
          });
      } else {
        setIsSigninIng(false);
      }
    };
    auth_token();
  }, []);

  useEffect(() => {
    //const url = window.location.href;
    //const hasGithubCode = url.includes("?code=");
    // if (hasGithubCode) {
    //   const [urlnew, githubCode] = url.split("?code=");
    //   window.history.pushState({}, "", urlnew);
    //   signIn(githubCode);
    // }
  }, []);
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isSigninIng }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
