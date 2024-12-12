import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Updated categories to match the skills data
const SKILL_CATEGORIES = {
  Programming: {
    icon: "code-tags",
    color: "#6C63FF",
    description: "Software development and coding skills",
  },
  Design: {
    icon: "palette",
    color: "#FF6B6B",
    description: "Visual and user experience design",
  },
  "Data Science": {
    icon: "chart-box",
    color: "#4CAF50",
    description: "Data analysis and machine learning",
  },
  Technology: {
    icon: "laptop",
    color: "#FFA726",
    description: "General technology and IT skills",
  },
  Marketing: {
    icon: "bullhorn",
    color: "#9C27B0",
    description: "Digital marketing and promotion",
  },
};

const SKILLS_DATA = [
  {
    id: "1",
    name: "React Native",
    category: "Programming",
    description:
      "Mobile app development with React Native, enabling the creation of cross-platform applications using JavaScript and React.",
    popularity: 92,
    difficulty: "Intermediate",
    learningTime: "3-6 months",
    prerequisites: ["JavaScript", "React"],
    careerPaths: ["Mobile App Developer", "Full Stack Developer"],
    resources: [
      "Official React Native Documentation",
      "Udemy Courses",
      "YouTube Tutorials",
    ],
  },
  {
    id: "2",
    name: "UI Design",
    category: "Design",
    description:
      "Learn to create beautiful, functional, and user-centric interfaces for websites and applications.",
    popularity: 88,
    difficulty: "Beginner",
    learningTime: "2-4 months",
    prerequisites: ["Basic Design Theory"],
    careerPaths: ["UI Designer", "UX Designer"],
    resources: ["Figma Tutorials", "Design Books", "Online Courses"],
  },
  {
    id: "3",
    name: "Python",
    category: "Programming",
    description:
      "General-purpose programming language used for web development, data science, AI, and more.",
    popularity: 95,
    difficulty: "Beginner",
    learningTime: "2-3 months",
    prerequisites: [],
    careerPaths: [
      "Data Scientist",
      "Software Developer",
      "Machine Learning Engineer",
    ],
    resources: ["Python.org", "Codecademy", "Automate the Boring Stuff"],
  },
  {
    id: "4",
    name: "Machine Learning",
    category: "Data Science",
    description:
      "Learn to build predictive models and work with AI systems using algorithms and data.",
    popularity: 90,
    difficulty: "Advanced",
    learningTime: "6-12 months",
    prerequisites: ["Python", "Linear Algebra", "Statistics"],
    careerPaths: ["Machine Learning Engineer", "Data Scientist"],
    resources: [
      "Coursera AI Courses",
      "Google AI Learning Resources",
      "Books on ML",
    ],
  },
  {
    id: "5",
    name: "Digital Marketing",
    category: "Marketing",
    description:
      "Master online marketing strategies, including SEO, social media marketing, and content marketing.",
    popularity: 85,
    difficulty: "Beginner",
    learningTime: "2-3 months",
    prerequisites: ["Basic Computer Knowledge"],
    careerPaths: ["Digital Marketer", "Content Strategist"],
    resources: [
      "Google Digital Garage",
      "HubSpot Academy",
      "Udemy Marketing Courses",
    ],
  },
];

export default function SkillDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderSkillCard = (skill) => {
    const categoryConfig = SKILL_CATEGORIES[skill.category] || {
      icon: "school",
      color: "#666666",
      description: "General skill",
    };

    return (
      <TouchableOpacity key={skill.id} style={styles.skillCard}>
        <View
          style={[
            styles.categoryIndicator,
            { backgroundColor: `${categoryConfig.color}15` },
          ]}
        >
          <MaterialCommunityIcons
            name={categoryConfig.icon}
            size={24}
            color={categoryConfig.color}
          />
        </View>
        <View style={styles.skillContent}>
          <Text style={styles.skillName}>{skill.name}</Text>
          <Text style={styles.skillDescription} numberOfLines={2}>
            {skill.description}
          </Text>
          <View style={styles.skillMetrics}>
            <View style={styles.metricItem}>
              <MaterialCommunityIcons name="signal" size={16} color="#666" />
              <Text style={styles.metricText}>{skill.difficulty}</Text>
            </View>
            <View style={styles.metricItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color="#666"
              />
              <Text style={styles.metricText}>{skill.learningTime}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredSkills = SKILLS_DATA.filter(
    (skill) =>
      (!selectedCategory || skill.category === selectedCategory) &&
      (!searchQuery ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Skills</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search skills to learn"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <MaterialCommunityIcons name="close" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {Object.entries(SKILL_CATEGORIES).map(([category, config]) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip,
                {
                  backgroundColor:
                    selectedCategory === category ? config.color : "#F0F0F0",
                },
              ]}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category,
                )
              }
            >
              <MaterialCommunityIcons
                name={config.icon}
                size={20}
                color={selectedCategory === category ? "#FFFFFF" : config.color}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.skillsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredSkills.map(renderSkillCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4158D0",
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  searchSection: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
    gap: 6,
  },
  selectedCategoryChip: {
    backgroundColor: "#6C63FF",
  },
  categoryText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  skillsContainer: {
    padding: 16,
  },
  skillCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  skillContent: {
    flex: 1,
  },
  skillName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  skillDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  skillMetrics: {
    flexDirection: "row",
    gap: 16,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    color: "#666666",
  },
});
