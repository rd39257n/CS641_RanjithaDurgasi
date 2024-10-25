import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Platform,
  RefreshControl,
  Alert,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ExploreScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);

    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
      setLastRefreshTime(new Date());
      Alert.alert(
        "✨ Refresh Complete",
        "Content has been updated successfully",
        [{ text: "Great!" }],
      );
    }, 2000);
  }, []);

  const handleInputSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (inputText.trim()) {
        Alert.alert("📝 Success!", `Your message: "${inputText}"`, [
          {
            text: "Clear",
            onPress: () => setInputText(""),
            style: "destructive",
          },
          { text: "OK", style: "default" },
        ]);
      } else {
        Alert.alert(
          "⚠️ Input Required",
          "Please enter some text before submitting",
          [{ text: "OK" }],
        );
      }
    }, 500);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#228BE6"
          colors={["#228BE6"]} // Android
          progressBackgroundColor="#ffffff" // Android
          style={{ backgroundColor: "transparent" }}
        />
      }
    >
      {/* Header Section */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Interactive Features</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Pull down to refresh • Try the features below
        </ThemedText>
      </View>

      {/* Refresh Status Card */}
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="refresh-circle" size={24} color="#228BE6" />
          <ThemedText style={styles.cardTitle}>Pull to Refresh</ThemedText>
        </View>
        <View style={styles.refreshStatus}>
          <ThemedText style={styles.statusText}>
            {refreshing
              ? "Refreshing content..."
              : "Pull down to refresh content"}
          </ThemedText>
          {lastRefreshTime && (
            <ThemedText style={styles.timestampText}>
              Last updated: {lastRefreshTime.toLocaleTimeString()}
            </ThemedText>
          )}
          {refreshing && (
            <ActivityIndicator color="#228BE6" style={styles.loader} />
          )}
        </View>
      </ThemedView>

      {/* Input Card */}
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="create" size={24} color="#228BE6" />
          <ThemedText style={styles.cardTitle}>Message Input</ThemedText>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message here..."
            placeholderTextColor="#ADB5BD"
            returnKeyType="send"
            onSubmitEditing={handleInputSubmit}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          <ThemedView
            style={[
              styles.submitButton,
              !inputText.trim() && styles.submitButtonDisabled,
            ]}
            onTouchEnd={handleInputSubmit}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.submitButtonContent}>
                <Ionicons name="send" size={20} color="#fff" />
                <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
              </View>
            )}
          </ThemedView>
        </View>
      </ThemedView>

      {/* Platform Info Card */}
      <ThemedView style={[styles.card, styles.platformCard]}>
        <View style={styles.cardHeader}>
          <Ionicons
            name={Platform.OS === "ios" ? "logo-apple" : "logo-android"}
            size={24}
            color="#228BE6"
          />
          <ThemedText style={styles.cardTitle}>
            Platform:{" "}
            {Platform.OS.charAt(0).toUpperCase() + Platform.OS.slice(1)}
          </ThemedText>
        </View>
        <ThemedText style={styles.platformText}>
          {Platform.select({
            ios: "This app is running on iOS with native features like haptic feedback.",
            android:
              "This app is running on Android with native features like ripple effects.",
            default: "This app is running on a web platform.",
          })}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6C757D",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
  },
  refreshStatus: {
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    color: "#495057",
  },
  timestampText: {
    fontSize: 14,
    color: "#6C757D",
  },
  loader: {
    marginTop: 8,
  },
  inputWrapper: {
    gap: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#212529",
    minHeight: 100,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  submitButton: {
    backgroundColor: "#228BE6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ADB5BD",
  },
  submitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  platformCard: {
    marginBottom: 32,
  },
  platformText: {
    fontSize: 16,
    color: "#495057",
    lineHeight: 24,
  },
});
