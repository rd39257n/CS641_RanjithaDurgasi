import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSignUpContext } from "./signUpContext";

const SAMPLE_SKILLS = [
  "Programming",
  "Mathematics",
  "Physics",
  "Writing",
  "Public Speaking",
  "Design",
  "Marketing",
  "Photography",
  "Music",
  "Language Learning",
  "Data Science",
  "UI/UX",
];

const LEARNING_INTERESTS = [
  "Web Development",
  "Mobile Apps",
  "AI/ML",
  "Digital Marketing",
  "Graphic Design",
  "Video Editing",
  "Content Writing",
  "SEO",
  "Business",
  "Finance",
  "Project Management",
  "Leadership",
];

export default function Skills() {
  const { signUp } = useSignUp();
  const router = useRouter();
  const { updateSignUpData, signUpData } = useSignUpContext();

  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(
    signUpData.skills || [],
  );
  const [learningInterests, setLearningInterests] = React.useState<string[]>(
    signUpData.learningInterests || [],
  );
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  // Check if we have an active sign-up
  React.useEffect(() => {
    if (!signUp) {
      router.replace("/(auth)/sign-up");
    }
  }, [signUp]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
    setError(""); // Clear any error when user makes a selection
  };

  const toggleLearning = (skill: string) => {
    setLearningInterests((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
    setError(""); // Clear any error when user makes a selection
  };

  const onNext = async () => {
    if (selectedSkills.length === 0) {
      setError("Please select at least one skill you have");
      return;
    }

    if (learningInterests.length === 0) {
      setError("Please select at least one skill you want to learn");
      return;
    }

    setIsLoading(true);
    try {
      // Save the selected skills to context
      await updateSignUpData({
        skills: selectedSkills,
        learningInterests: learningInterests,
      });

      setSuccessMessage("Skills saved successfully!");

      // Navigate to bio screen after a brief delay to show success message
      setTimeout(() => {
        router.push("/(auth)/bio");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!signUp) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your Skills</Text>
          <Text style={styles.subtitle}>
            Select skills you have and what you want to learn
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Have</Text>
            <Text style={styles.sectionSubtitle}>
              Select skills you can teach others
            </Text>
            <View style={styles.skillsGrid}>
              {SAMPLE_SKILLS.map((skill) => (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.skillChip,
                    selectedSkills.includes(skill) && styles.selectedChip,
                  ]}
                  onPress={() => toggleSkill(skill)}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.skillText,
                      selectedSkills.includes(skill) &&
                        styles.selectedSkillText,
                    ]}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Want to Learn</Text>
            <Text style={styles.sectionSubtitle}>
              Select skills you'd like to learn
            </Text>
            <View style={styles.skillsGrid}>
              {LEARNING_INTERESTS.map((skill) => (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.skillChip,
                    learningInterests.includes(skill) && styles.selectedChip,
                  ]}
                  onPress={() => toggleLearning(skill)}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.skillText,
                      learningInterests.includes(skill) &&
                        styles.selectedSkillText,
                    ]}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!selectedSkills.length ||
                !learningInterests.length ||
                isLoading) &&
                styles.buttonDisabled,
            ]}
            onPress={onNext}
            disabled={
              isLoading || !selectedSkills.length || !learningInterests.length
            }
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Saving..." : "Next"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.brandingContainer}>
          <Text style={styles.developedBy}>Developed by Ranjitha</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4158D0",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    margin: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedChip: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },
  skillText: {
    fontSize: 14,
    color: "#666666",
  },
  selectedSkillText: {
    color: "#FFFFFF",
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
