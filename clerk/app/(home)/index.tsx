import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const firstLetter =
    user?.emailAddresses[0].emailAddress?.charAt(0).toUpperCase() || "?";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>
              {user?.firstName || user?.emailAddresses[0].emailAddress}
            </Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#666"
              />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                {user?.emailAddresses[0].emailAddress}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#666"
              />
              <Text style={styles.infoLabel}>Member since</Text>
              <Text style={styles.infoValue}>
                {new Date(user?.createdAt || "").toLocaleDateString()}
              </Text>
            </View>

            {user?.lastName && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={20}
                  color="#666"
                />
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => signOut()}>
            <MaterialCommunityIcons name="logout" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.brandingContainer}>
          <Text style={styles.developedBy}>Developed by Ranjitha</Text>
          <Text style={styles.poweredBy}>Powered by Clerk</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 24,
    backgroundColor: "#000000",
    paddingTop: 60,
    paddingBottom: 40,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: -20,
    marginHorizontal: 16,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 12,
    width: 100,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#000000",
    flexDirection: "row",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  brandingContainer: {
    marginTop: "auto",
    padding: 24,
    alignItems: "center",
  },
  developedBy: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  poweredBy: {
    fontSize: 12,
    color: "#666666",
    opacity: 0.8,
  },
});
