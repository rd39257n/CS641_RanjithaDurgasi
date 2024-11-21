// File: app/(auth)/_layout.tsx

import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SignUpProvider } from "./signUpContext";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(home)" />;
  }

  return (
    <SignUpProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#4158D0" },
        }}
      >
        <Stack.Screen
          name="index" // This will be your welcome screen
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="sign-in"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="skills"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen name="bio" options={{ animation: "slide_from_right" }} />
        <Stack.Screen
          name="verify"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </SignUpProvider>
  );
}
