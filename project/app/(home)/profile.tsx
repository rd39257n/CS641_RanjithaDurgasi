import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// This would come from your actual user data/context
const DUMMY_USER_SKILLS = {
  skills: ["React Native", "JavaScript", "UI Design"],
  learningInterests: ["Python", "Machine Learning", "Data Science"],
  bio: "Computer Science student passionate about mobile development. Looking to exchange knowledge in programming and design.",
};

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const firstLetter =
    user?.emailAddresses[0].emailAddress?.charAt(0).toUpperCase() || "?";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBackground}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{firstLetter}</Text>
              </View>
            </View>
            <Text style={styles.nameText}>
              {user?.firstName || user?.emailAddresses[0].emailAddress}
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={20} color="#6C63FF" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{DUMMY_USER_SKILLS.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Can Share</Text>
            <View style={styles.skillsContainer}>
              {DUMMY_USER_SKILLS.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Want to Learn</Text>
            <View style={styles.skillsContainer}>
              {DUMMY_USER_SKILLS.learningInterests.map((skill, index) => (
                <View key={index} style={styles.learningChip}>
                  <Text style={styles.learningText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons
                name="handshake"
                size={24}
                color="#6C63FF"
              />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="star" size={24} color="#6C63FF" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="school" size={24} color="#6C63FF" />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => signOut()}>
            <MaterialCommunityIcons name="logout" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
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
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarBackground: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  editButtonText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "500",
  },
  learningChip: {
    backgroundColor: "rgba(200, 80, 192, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  learningText: {
    color: "#C850C0",
    fontSize: 14,
    fontWeight: "500",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#6C63FF",
    flexDirection: "row",
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
