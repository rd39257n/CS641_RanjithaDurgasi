import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AboutCourseScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About This Course</Text>
      <Text style={styles.content}>
        Mobile Web Content & Dev is a comprehensive course designed to teach
        students the fundamentals of mobile web development. This course covers
        various aspects of creating web applications optimized for mobile
        devices. Key topics include: {"\n"}• Responsive web design{"\n"}•
        Mobile-first development approaches{"\n"}• Progressive Web Apps (PWAs)
        {"\n"}• Performance optimization for mobile devices{"\n"}• Touch and
        gesture interactions{"\n"}• Mobile UI/UX best practices
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});
