import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "./useAuth";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="home" />
      ) : (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" options={{ presentation: "modal" }} />
          <Stack.Screen name="signup" options={{ presentation: "modal" }} />
        </>
      )}
    </Stack>
  );
}
