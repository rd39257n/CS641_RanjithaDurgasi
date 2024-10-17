import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const courseWorkTopics = [
  "Week 1: Intro to Mobile Apps",
  "Week 2: Setting up React App - Run & Debug",
  "Week 3: Offline Labs",
  "Week 4: Components, Stylesheets",
  "Week 5: Advanced Layouts, Images, Buttons, Text Boxes",
  "Week 6: Recreate Popular App",
  "Week 7: States, Events",
  "Week 8: Multiple Screens, Conditions",
  "Week 9: App & Collections",
  "Week 10: Scroll View",
  "Week 11: Generating UI, Ideation, Architecture",
  "Week 12: API integrations",
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.separator} />
      <Text style={styles.subtitle}>Explore the course work</Text>
      <ScrollView style={styles.scrollView}>
        {courseWorkTopics.map((topic, index) => (
          <View key={index} style={styles.topicContainer}>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066cc",
    marginBottom: 15,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
    backgroundColor: "#ccc",
  },
  scrollView: {
    width: "100%",
  },
  topicContainer: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  topicText: {
    fontSize: 16,
    color: "#333",
  },
});
