import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
      <View style={styles.separator} />
      <Text style={styles.name}>Ranjitha Durgasi</Text>
      <Text style={styles.courseInfo}>
        Mobile Web Content & Dev{"\n"}
        FALL 2024{"\n"}
        Course Code: 73563
      </Text>
      <View style={styles.separator} />
      <Text style={styles.text}>
        This is my home screen for the assignment.{"\n"}
        Feel free to explore the app!
      </Text>
      <Button
        title="Go to Explore"
        onPress={() => navigation.navigate("(tabs)/explore")}
      />
      <Button
        title="About This Course"
        onPress={() => navigation.navigate("about-course")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0066cc",
    marginBottom: 5,
  },
  courseInfo: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
    backgroundColor: "#ccc",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
