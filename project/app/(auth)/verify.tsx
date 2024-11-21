import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Verify() {
  const { signUp } = useSignUp();
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  // Check if we have an active sign-up
  React.useEffect(() => {
    if (!signUp) {
      router.replace("/(auth)/sign-up");
    }
  }, [signUp]);

  const onVerify = async () => {
    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        // Store the session ID for later use
        await AsyncStorage.setItem("pendingSessionId", result.createdSessionId);

        setSuccessMessage("Email verified successfully!");

        // Navigate to skills page after a brief delay to show success message
        setTimeout(() => {
          router.push("/(auth)/skills");
        }, 1000);
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setSuccessMessage("New code sent successfully!");
      setError("");
    } catch (err: any) {
      setError("Failed to resend code. Please try again.");
      setSuccessMessage("");
    }
  };

  // Don't render anything if there's no active sign-up
  if (!signUp) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Verify Email</Text>
            <Text style={styles.subText}>
              Enter the verification code sent to your email
            </Text>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={20}
                color="#FF4B4B"
              />
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}

          {successMessage ? (
            <View style={styles.successContainer}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#4CAF50"
              />
              <Text style={styles.successMessage}>{successMessage}</Text>
            </View>
          ) : null}

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Verification Code</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={20}
                  color="#6C63FF"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter code"
                  placeholderTextColor="#999"
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    setError(""); // Clear error when user types
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus={true}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                (!code.trim() || isLoading) && styles.buttonDisabled,
              ]}
              onPress={onVerify}
              disabled={!code.trim() || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={resendCode}
              style={styles.resendButton}
              disabled={isLoading}
            >
              <Text
                style={[styles.resendText, isLoading && styles.textDisabled]}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.brandingContainer}>
            <Text style={styles.developedBy}>Developed by Ranjitha</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4158D0",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE5E5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  error: {
    color: "#FF4B4B",
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  successMessage: {
    color: "#4CAF50",
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#1A1A1A",
    letterSpacing: 1.5,
  },
  button: {
    backgroundColor: "#6C63FF",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#A5A5A5",
  },
  textDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resendButton: {
    marginTop: 16,
    padding: 8,
    alignItems: "center",
  },
  resendText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "600",
  },
  brandingContainer: {
    marginTop: "auto",
    paddingTop: 24,
    alignItems: "center",
  },
  developedBy: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
