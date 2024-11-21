import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Dummy notifications data
const NOTIFICATIONS = [
  {
    id: "1",
    type: "match",
    title: "New Match!",
    message: "Sarah Johnson wants to learn React Native from you",
    time: "2m ago",
    read: false,
    icon: "handshake",
  },
  {
    id: "2",
    type: "request",
    title: "Learning Request",
    message: "Michael Chen can teach you Python programming",
    time: "1h ago",
    read: false,
    icon: "school",
  },
  {
    id: "3",
    type: "session",
    title: "Upcoming Session",
    message: "Your Python learning session with Michael starts in 1 hour",
    time: "2h ago",
    read: true,
    icon: "calendar-clock",
  },
  {
    id: "4",
    type: "review",
    title: "New Review",
    message: "Emma left you a 5-star review for your UI Design session",
    time: "1d ago",
    read: true,
    icon: "star",
  },
  {
    id: "5",
    type: "match",
    title: "New Match!",
    message: "Alex wants to exchange Photography skills",
    time: "2d ago",
    read: true,
    icon: "handshake",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const getIconColor = (type: string) => {
    switch (type) {
      case "match":
        return "#6C63FF";
      case "request":
        return "#C850C0";
      case "session":
        return "#4CAF50";
      case "review":
        return "#FFC107";
      default:
        return "#6C63FF";
    }
  };

  const renderNotification = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadNotification,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${getIconColor(notification.type)}15` },
        ]}
      >
        <MaterialCommunityIcons
          name={notification.icon}
          size={24}
          color={getIconColor(notification.type)}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
        <Text style={styles.messageText}>{notification.message}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialCommunityIcons
            name="cog-outline"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterChip, styles.activeFilterChip]}
          >
            <Text style={[styles.filterText, styles.activeFilterText]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Sessions</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        >
          {NOTIFICATIONS.map((notification) =>
            renderNotification(notification),
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4158D0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  activeFilterChip: {
    backgroundColor: "#6C63FF",
  },
  filterText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  unreadNotification: {
    backgroundColor: "#F8F9FF",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  timeText: {
    fontSize: 12,
    color: "#666666",
  },
  messageText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6C63FF",
    position: "absolute",
    top: 16,
    right: 16,
  },
});
