import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="swap-horizontal-circle"
              size={80}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.title}>Skill Swap</Text>
          <Text style={styles.subtitle}>Your Campus Learning Network</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signInButton}>
            <Link href="/sign-in" style={styles.signInText}>
              Sign In
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton}>
            <Link href="/sign-up" style={styles.signUpText}>
              Get Started
            </Link>
          </TouchableOpacity>
        </View>

        {/* Branding Footer */}
        <View style={styles.brandingContainer}>
          <Text style={styles.developedBy}>Developed by Ranjitha</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4158D0",
    backgroundGradient:
      "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 40 : 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  featuresContainer: {
    marginTop: 48,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F0F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  signUpButton: {
    backgroundColor: "#6C63FF",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    width: "100%",
    textAlign: "center",
    paddingVertical: 16,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    width: "100%",
    textAlign: "center",
    paddingVertical: 16,
  },
  brandingContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  developedBy: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 4,
  },
  poweredBy: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.7,
  },
});
