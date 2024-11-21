import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View } from "react-native";

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Failed to get token:", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    // Add custom fonts here if needed
  });

  // Make sure the publishable key exists
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in environment variables",
    );
  }

  useEffect(() => {
    if (!loaded) {
    }
  }, [loaded]);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
