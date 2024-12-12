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
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { firebaseUtils } from "../../lib/firebase-utils";
import { useUser } from "@clerk/clerk-expo";

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
      "https://reactnative.dev",
      "https://udemy.com",
      "https://www.youtube.com/watch?v=gvkqT_Uoahw",
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
    resources: [
      "https://figma.com",
      "https://designcourse.com",
      "https://coursera.org",
    ],
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
    resources: [
      "https://python.org",
      "https://www.youtube.com/watch?v=_uQrJ0TkZlc&t=109s",
      "https://automatetheboringstuff.com",
    ],
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
      "https://coursera.org",
      "https://tensorflow.org",
      "https://fast.ai",
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
      "https://google.com/digitalgarage",
      "https://hubspot.com/academy",
      "https://udemy.com",
    ],
  },
  {
    id: "6",
    name: "Cloud Computing",
    category: "Technology",
    description:
      "Learn to design, deploy, and manage applications and services on cloud platforms like AWS, Azure, or Google Cloud.",
    popularity: 91,
    difficulty: "Intermediate",
    learningTime: "4-6 months",
    prerequisites: ["Networking Basics", "Linux"],
    careerPaths: ["Cloud Engineer", "DevOps Engineer"],
    resources: [
      "https://aws.amazon.com/training",
      "https://cloud.google.com/training",
      "https://azure.microsoft.com/en-us/training/",
    ],
  },
  {
    id: "7",
    name: "Cybersecurity",
    category: "Technology",
    description:
      "Learn how to protect systems, networks, and data from cyber threats and vulnerabilities.",
    popularity: 87,
    difficulty: "Advanced",
    learningTime: "6-12 months",
    prerequisites: ["Networking Basics", "Operating Systems"],
    careerPaths: ["Cybersecurity Analyst", "Ethical Hacker"],
    resources: ["https://cybrary.it", "https://sans.org", "https://cisco.com"],
  },
  {
    id: "8",
    name: "SEO Optimization",
    category: "Marketing",
    description:
      "Learn how to improve website visibility and ranking on search engines through SEO strategies.",
    popularity: 83,
    difficulty: "Beginner",
    learningTime: "1-2 months",
    prerequisites: ["Basic Computer Skills"],
    careerPaths: ["SEO Specialist", "Content Strategist"],
    resources: ["https://moz.com", "https://ahrefs.com", "https://semrush.com"],
  },
  {
    id: "9",
    name: "Game Development",
    category: "Programming",
    description:
      "Learn to create interactive games using game engines like Unity or Unreal Engine.",
    popularity: 89,
    difficulty: "Intermediate",
    learningTime: "6-12 months",
    prerequisites: ["Programming Basics"],
    careerPaths: ["Game Developer", "3D Artist"],
    resources: [
      "https://unity.com/learn",
      "https://unrealengine.com/onlinelearning",
      "https://udemy.com",
    ],
  },
  {
    id: "10",
    name: "Graphic Design",
    category: "Design",
    description:
      "Learn to create visual content to communicate ideas using software like Adobe Photoshop or Illustrator.",
    popularity: 86,
    difficulty: "Beginner",
    learningTime: "3-5 months",
    prerequisites: ["Basic Design Concepts"],
    careerPaths: ["Graphic Designer", "Brand Designer"],
    resources: [
      "https://adobe.com",
      "https://canva.com",
      "https://skillshare.com",
    ],
  },
  {
    id: "11",
    name: "Web Development",
    category: "Programming",
    description:
      "Learn to create websites using HTML, CSS, JavaScript, and frameworks like React or Angular.",
    popularity: 94,
    difficulty: "Beginner",
    learningTime: "3-6 months",
    prerequisites: [],
    careerPaths: ["Web Developer", "Frontend Developer"],
    resources: [
      "https://freecodecamp.org",
      "https://w3schools.com",
      "https://udemy.com",
    ],
  },
  {
    id: "12",
    name: "3D Modeling",
    category: "Design",
    description:
      "Learn to create three-dimensional digital models for applications in design, animation, and gaming.",
    popularity: 84,
    difficulty: "Intermediate",
    learningTime: "4-8 months",
    prerequisites: ["Basic Design Skills"],
    careerPaths: ["3D Artist", "Game Designer"],
    resources: [
      "https://blender.org",
      "https://autodesk.com",
      "https://cgcookie.com",
    ],
  },
];

export default function SkillDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");
  const { user } = useUser(); // Clerk user object

  const openWebView = (url) => {
    setWebViewUrl(url);
    setWebViewVisible(true);
  };

  const markSkillAsDone = async (skillId) => {
    if (!user) {
      alert("Please log in to mark skills as completed.");
      return;
    }
    try {
      await firebaseUtils.addCompletedSkill(user.id, skillId); // Update Firebase utils to handle this
      alert("Skill marked as done!");
    } catch (error) {
      console.error("Error marking skill as done:", error);
      alert("Failed to mark skill as done. Please try again.");
    }
  };

  const renderSkillCard = (skill) => {
    const categoryConfig = SKILL_CATEGORIES[skill.category] || {
      icon: "school",
      color: "#666666",
      description: "General skill",
    };

    return (
      <View key={skill.id} style={styles.skillCard}>
        <View
          style={[
            styles.categoryIndicator,
            { backgroundColor: `${categoryConfig.color}20` },
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
          <ScrollView horizontal style={styles.resources}>
            {skill.resources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openWebView(resource)}
                style={styles.resourceButton}
              >
                <Text style={styles.resourceText}>Resource {index + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => markSkillAsDone(skill.id)}
          >
            <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
            <Text style={styles.doneButtonText}>Mark as Done</Text>
          </TouchableOpacity>
        </View>
      </View>
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
                    selectedCategory === category ? config.color : "#E8EAF6",
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

      <Modal visible={webViewVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setWebViewVisible(false)}
          >
            <MaterialCommunityIcons name="close" size={30} color="#000" />
          </TouchableOpacity>
          <WebView source={{ uri: webViewUrl }} style={{ flex: 1 }} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    backgroundColor: "#6C63FF",
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
    backgroundColor: "#E8EAF6",
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
  resources: {
    marginTop: 10,
    flexDirection: "row",
  },
  resourceButton: {
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  resourceText: {
    color: "#333",
    fontSize: 12,
  },
  closeButton: {
    padding: 16,
    alignSelf: "flex-end",
  },
  doneButton: {
    marginTop: 8,
    backgroundColor: "#6C63FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
});
