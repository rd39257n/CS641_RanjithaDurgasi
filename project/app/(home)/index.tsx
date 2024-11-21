// File: app/(home)/index.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Sample data - replace with your actual data source
const DUMMY_PROFILES = [
  {
    id: "1",
    name: "Sarah Johnson",
    skills: ["React Native", "JavaScript", "UI Design"],
    learningInterests: ["Python", "Machine Learning", "Data Science"],
    bio: "Computer Science student passionate about mobile development. Looking to exchange knowledge in programming and design.",
  },
  {
    id: "2",
    name: "Michael Chen",
    skills: ["Python", "Data Analysis", "Statistics"],
    learningInterests: ["Web Development", "React", "UI/UX"],
    bio: "Graduate student in Data Science. Eager to learn web development while sharing knowledge in data analysis and Python programming.",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe("left");
      } else {
        resetPosition();
      }
    },
  });

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = DUMMY_PROFILES[currentIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const onSwipeLeft = (item) => {
    console.log("Swiped left on", item.name);
  };

  const onSwipeRight = (item) => {
    console.log("Swiped right on", item.name);
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCard = () => {
    if (currentIndex >= DUMMY_PROFILES.length) {
      return (
        <View style={styles.noMoreCards}>
          <MaterialCommunityIcons
            name="refresh-circle"
            size={60}
            color="#6C63FF"
            style={styles.refreshIcon}
          />
          <Text style={styles.noMoreCardsText}>No more profiles</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.refreshButtonText}>Find More Matches</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const profile = DUMMY_PROFILES[currentIndex];

    return (
      <Animated.View
        style={[styles.cardStyle, getCardStyle()]}
        {...panResponder.panHandlers}
      >
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="account-circle"
            size={60}
            color="#6C63FF"
          />
          <Text style={styles.nameText}>{profile.name}</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Can Share</Text>
            <View style={styles.skillsContainer}>
              {profile.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Want to Learn</Text>
            <View style={styles.skillsContainer}>
              {profile.learningInterests.map((skill, index) => (
                <View key={index} style={styles.learningChip}>
                  <Text style={styles.learningText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Find Matches</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/(home)/notifications")}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={24}
                color="#FFFFFF"
              />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons
                name="message-outline"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.cardContainer}>{renderCard()}</View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => forceSwipe("left")}
        >
          <MaterialCommunityIcons name="close" size={30} color="#FF4B4B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => forceSwipe("right")}
        >
          <MaterialCommunityIcons name="check" size={30} color="#4CAF50" />
        </TouchableOpacity>
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
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  iconButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF4B4B",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4158D0",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: "relative",
    width: "100%",
  },
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.9,
    height: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    left: SCREEN_WIDTH * 0.05,
  },
  cardHeader: {
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  cardContent: {
    padding: 24,
    flex: 1,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 12,
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
  bioSection: {
    marginTop: "auto",
    marginBottom: 24,
  },
  bioText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    paddingVertical: 20,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
  declineButton: {
    backgroundColor: "#FFFFFF",
  },
  acceptButton: {
    backgroundColor: "#FFFFFF",
  },
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 24,
    width: SCREEN_WIDTH * 0.9,
  },
  refreshIcon: {
    marginBottom: 16,
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  refreshButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
