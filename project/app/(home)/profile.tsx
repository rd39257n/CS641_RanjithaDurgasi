import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { firebaseUtils } from "../../lib/firebase-utils";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userData, setUserData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [note, setNote] = React.useState("");

  const firstLetter =
    user?.emailAddresses[0].emailAddress?.charAt(0).toUpperCase() || "?";

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const data = await firebaseUtils.getUserProfile(user.id);
          if (data) {
            console.log("Fetched user data:", data);
            setUserData(data);
            setNote(data.note || "");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleSaveNote = async () => {
    try {
      await firebaseUtils.updateUserProfile(user?.id!, { note });
      console.log("Note saved successfully");
    } catch (err) {
      console.error("Error saving note:", err);
      setError("Failed to save note");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => signOut()}>
          <MaterialCommunityIcons name="logout" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
              {user?.firstName ||
                userData?.username ||
                user?.emailAddresses[0].emailAddress}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>
              {userData?.bio || "No bio available"}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Can Share</Text>
            <View style={styles.skillsContainer}>
              {userData?.skills?.length > 0 ? (
                userData.skills.map((skill: string, index: number) => (
                  <View key={index} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No skills to share yet.</Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Want to Learn</Text>
            <View style={styles.skillsContainer}>
              {userData?.learningInterests?.length > 0 ? (
                userData.learningInterests.map(
                  (skill: string, index: number) => (
                    <View key={index} style={styles.learningChip}>
                      <Text style={styles.learningText}>{skill}</Text>
                    </View>
                  ),
                )
              ) : (
                <Text style={styles.emptyText}>No learning interests yet.</Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed Skills</Text>
            <View style={styles.skillsContainer}>
              {userData?.completedSkills?.length > 0 ? (
                userData.completedSkills.map((skill: string, index: number) => (
                  <View key={index} style={styles.completedChip}>
                    <Text style={styles.completedText}>{skill}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No completed skills yet.</Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Note</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              multiline
              placeholder="Write a personal note..."
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveNote}
            >
              <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
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
  completedChip: {
    backgroundColor: "rgba(50, 200, 100, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  completedText: {
    color: "#32C864",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
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
  noteInput: {
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 16,
    height: 120,
    marginBottom: 16,
    fontSize: 16,
    color: "#1A1A1A",
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
