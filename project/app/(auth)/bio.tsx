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
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignUpContext } from "./signUpContext";
import { firebaseUtils } from "../../lib/firebase-utils";

export default function Bio() {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const { updateSignUpData, signUpData } = useSignUpContext();

  const [bio, setBio] = React.useState(signUpData.bio || "");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  React.useEffect(() => {
    const verifySignUp = async () => {
      if (!signUp) {
        console.log("No active signup found");
        router.replace("/(auth)/sign-up");
        return;
      }

      console.log("Checking signup state:", {
        hasSignUp: !!signUp,
        userId: signUp?.createdUserId,
        signUpData,
      });

      const storedUserId = await AsyncStorage.getItem("userBackupId");
      if (!signUp.createdUserId && !storedUserId) {
        console.log("No user ID found in signup or storage");
        router.replace("/(auth)/sign-up");
      }
    };

    verifySignUp();
  }, [signUp]);

  const createUserProfile = async (userId: string) => {
    try {
      console.log("Creating user profile for ID:", userId);
      await firebaseUtils.createUserProfile(userId, {
        email: signUpData.email,
        username: signUpData.username || "",
        skills: signUpData.skills || [],
        learningInterests: signUpData.learningInterests || [],
        bio: bio.trim(),
      });
      console.log("User profile created successfully");
      return true;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  };

  const onNext = async () => {
    if (!bio.trim()) {
      setError("Please enter your bio");
      return;
    }

    if (bio.length < 50) {
      setError("Please write at least 50 characters about yourself");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await updateSignUpData({
        bio: bio.trim(),
      });

      const pendingSessionId = await AsyncStorage.getItem("pendingSessionId");
      if (!pendingSessionId) {
        setError("Session not found. Please try signing up again.");
        return;
      }

      const userId =
        signUp?.createdUserId || (await AsyncStorage.getItem("userBackupId"));
      if (!userId) {
        setError("User ID not found. Please try signing up again.");
        return;
      }

      try {
        await createUserProfile(userId);
      } catch (firestoreErr) {
        console.error("Firestore error:", firestoreErr);
        setError("Failed to create user profile. Please try again.");
        return;
      }

      await handleBackup(userId);
      await setActive({ session: pendingSessionId });
      await AsyncStorage.removeItem("pendingSessionId");

      setSuccessMessage("Profile completed successfully!");

      setTimeout(() => {
        router.replace("/(home)");
      }, 1000);
    } catch (err: any) {
      console.error("Error in onNext:", err);
      setError(err.message || "Failed to complete profile");
      Alert.alert(
        "Error",
        "Failed to complete profile setup. Please try again.",
        [{ text: "OK" }],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async (userId: string) => {
    try {
      const backupData = {
        ...signUpData,
        bio: bio.trim(),
        timestamp: new Date().toISOString(),
        userId,
      };

      await AsyncStorage.setItem(
        `userBackup_${userId}`,
        JSON.stringify(backupData),
      );
      console.log("Backup created successfully");
    } catch (error) {
      console.error("Error creating backup:", error);
    }
  };

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
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>About You</Text>
            <Text style={styles.subText}>
              Tell others about yourself, your interests, and what you hope to
              learn and share
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
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={styles.bioInput}
                placeholder="Write something about yourself, your experience, and what you want to learn..."
                placeholderTextColor="#999"
                multiline
                value={bio}
                onChangeText={(text) => {
                  setBio(text);
                  setError("");
                }}
                maxLength={500}
                textAlignVertical="top"
                autoFocus={true}
              />
              <Text
                style={[
                  styles.charCount,
                  bio.length < 50
                    ? styles.charCountWarning
                    : bio.length >= 450 && styles.charCountCaution,
                ]}
              >
                {bio.length}/500 (Minimum 50 characters)
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                (bio.length < 50 || isLoading) && styles.buttonDisabled,
              ]}
              onPress={onNext}
              disabled={isLoading || bio.length < 50}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Completing Setup..." : "Complete Profile"}
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
    lineHeight: 22,
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
  bioInput: {
    height: 200,
    padding: 16,
    fontSize: 16,
    color: "#1A1A1A",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
    marginTop: 8,
  },
  charCountWarning: {
    color: "#FF4B4B",
  },
  charCountCaution: {
    color: "#FFA000",
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
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
