import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Swiper from "react-native-deck-swiper";

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
  {
    id: "3",
    name: "Emily Davis",
    skills: ["Graphic Design", "Video Editing", "Animation"],
    learningInterests: ["Game Development", "Blender", "3D Modeling"],
    bio: "Creative professional with a love for visual storytelling. Interested in transitioning into 3D animation and game design.",
  },
  {
    id: "4",
    name: "James Miller",
    skills: ["SEO", "Digital Marketing", "Content Writing"],
    learningInterests: ["Data Analysis", "AI in Marketing", "Python"],
    bio: "Digital marketer with a knack for SEO and content strategies. Keen to explore how data and AI can enhance marketing techniques.",
  },
  {
    id: "5",
    name: "Sophia Williams",
    skills: ["UI Design", "Figma", "Adobe Photoshop"],
    learningInterests: ["React Native", "Web Development", "JavaScript"],
    bio: "UI designer exploring the world of front-end development. Excited to bring designs to life with code.",
  },
  {
    id: "6",
    name: "Daniel Garcia",
    skills: ["Cloud Computing", "AWS", "DevOps"],
    learningInterests: ["Machine Learning", "Cybersecurity", "Python"],
    bio: "Cloud enthusiast with a solid background in AWS and DevOps. Looking to expand into AI and cybersecurity.",
  },
  {
    id: "7",
    name: "Olivia Martinez",
    skills: ["Cybersecurity", "Networking", "Linux"],
    learningInterests: ["Blockchain", "Cloud Security", "Ethical Hacking"],
    bio: "Security analyst focused on protecting systems and networks. Interested in emerging technologies like blockchain and cloud security.",
  },
  {
    id: "8",
    name: "David Lee",
    skills: ["Game Development", "Unity", "C#"],
    learningInterests: ["AI in Gaming", "3D Animation", "Unreal Engine"],
    bio: "Indie game developer fascinated by the potential of AI in creating immersive experiences. Eager to connect with fellow creators.",
  },
  {
    id: "9",
    name: "Isabella Brown",
    skills: ["Python", "Machine Learning", "Data Science"],
    learningInterests: ["Web Development", "UI Design", "Cloud Computing"],
    bio: "AI enthusiast diving deep into data science. Curious about applying my skills in web and cloud platforms.",
  },
  {
    id: "10",
    name: "William Jones",
    skills: ["Database Management", "SQL", "MongoDB"],
    learningInterests: ["Python", "Machine Learning", "Data Visualization"],
    bio: "Database administrator passionate about structured and unstructured data. Exploring ways to integrate AI into database management.",
  },
  {
    id: "11",
    name: "Emma Wilson",
    skills: ["Content Writing", "Social Media Marketing", "SEO"],
    learningInterests: ["Graphic Design", "Video Editing", "Web Development"],
    bio: "Content strategist skilled in crafting engaging stories. Keen to learn more about visual content creation.",
  },
  {
    id: "12",
    name: "Liam Moore",
    skills: ["React", "JavaScript", "Web Development"],
    learningInterests: ["Backend Development", "Node.js", "GraphQL"],
    bio: "Frontend developer eager to build full-stack applications. Excited about creating seamless user experiences.",
  },
  {
    id: "13",
    name: "Charlotte White",
    skills: ["Graphic Design", "Animation", "Adobe After Effects"],
    learningInterests: ["Game Design", "Blender", "Augmented Reality"],
    bio: "Motion designer blending creativity with technology. Interested in immersive media like AR and VR.",
  },
  {
    id: "14",
    name: "Benjamin Harris",
    skills: ["Ethical Hacking", "Penetration Testing", "Cybersecurity"],
    learningInterests: ["Blockchain", "AI in Security", "Python"],
    bio: "Ethical hacker with a focus on securing systems. Exploring how AI can be leveraged in cybersecurity solutions.",
  },
  {
    id: "15",
    name: "Mia Clark",
    skills: ["Python", "Data Visualization", "Excel"],
    learningInterests: ["Machine Learning", "R Programming", "Statistics"],
    bio: "Data analyst who loves finding stories in data. Looking to deepen my expertise in machine learning and statistical analysis.",
  },
  {
    id: "16",
    name: "Alexander Adams",
    skills: ["React Native", "Flutter", "Mobile App Development"],
    learningInterests: ["Game Development", "Unity", "3D Animation"],
    bio: "Mobile developer eager to explore game development. Excited about blending mobile and gaming technologies.",
  },
  {
    id: "17",
    name: "Amelia Carter",
    skills: ["SEO", "Content Writing", "Digital Marketing"],
    learningInterests: ["Web Design", "HTML", "CSS"],
    bio: "Marketing professional interested in learning how to code for better collaboration with web developers.",
  },
  {
    id: "18",
    name: "Ethan Evans",
    skills: ["Cloud Computing", "Azure", "Docker"],
    learningInterests: ["DevOps", "Kubernetes", "Python"],
    bio: "Cloud engineer focusing on scalable systems. Keen to learn more about containerization and automation tools.",
  },
  {
    id: "19",
    name: "Harper Scott",
    skills: ["UI/UX", "Figma", "Prototyping"],
    learningInterests: ["React", "Web Development", "CSS"],
    bio: "UX designer with a passion for user-friendly interfaces. Eager to bring designs to life with React and CSS.",
  },
  {
    id: "20",
    name: "Elijah Walker",
    skills: ["C++", "Algorithms", "Data Structures"],
    learningInterests: [
      "Competitive Programming",
      "Python",
      "Machine Learning",
    ],
    bio: "Programming enthusiast with a love for problem-solving. Interested in applying algorithms to AI systems.",
  },
  {
    id: "21",
    name: "Avery Thomas",
    skills: ["Digital Marketing", "Social Media Analytics", "Google Ads"],
    learningInterests: ["Python", "SEO", "Graphic Design"],
    bio: "Marketing specialist exploring ways to integrate analytics and automation into campaigns.",
  },
  {
    id: "22",
    name: "Jack Hill",
    skills: ["Blockchain", "Smart Contracts", "Solidity"],
    learningInterests: ["Cybersecurity", "Python", "AI"],
    bio: "Blockchain developer fascinated by decentralized systems. Curious about security and AI integration in blockchain.",
  },
  {
    id: "23",
    name: "Sofia Green",
    skills: ["Machine Learning", "Deep Learning", "TensorFlow"],
    learningInterests: [
      "Natural Language Processing",
      "Web Development",
      "Cloud Computing",
    ],
    bio: "AI researcher diving into machine learning applications. Looking to expand my expertise into NLP and web-based AI tools.",
  },
  {
    id: "24",
    name: "Lucas Martin",
    skills: ["Game Development", "C#", "Unity"],
    learningInterests: ["AI in Gaming", "VR/AR", "Unreal Engine"],
    bio: "Game developer passionate about creating immersive worlds. Exploring the potential of AI in enhancing gameplay.",
  },
  {
    id: "25",
    name: "Ella Wood",
    skills: ["Graphic Design", "Typography", "Illustration"],
    learningInterests: ["Motion Design", "Animation", "UI Design"],
    bio: "Graphic artist with a passion for storytelling through visuals. Interested in bringing my designs to motion and user experiences.",
  },
  {
    id: "26",
    name: "Henry Baker",
    skills: ["Data Analysis", "Power BI", "Tableau"],
    learningInterests: ["SQL", "Python", "Machine Learning"],
    bio: "Data analyst enthusiastic about turning raw data into actionable insights. Keen to explore predictive modeling.",
  },
  {
    id: "27",
    name: "Chloe Ramirez",
    skills: ["React", "Redux", "JavaScript"],
    learningInterests: ["TypeScript", "GraphQL", "Next.js"],
    bio: "Frontend developer excited about improving application state management and server-side rendering.",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function HomeScreen() {
  const router = useRouter();
  const swiperRef = React.useRef(null);

  const renderCard = (card) => {
    return (
      <View style={styles.cardStyle}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="account-circle"
            size={60}
            color="#6C63FF"
          />
          <Text style={styles.nameText}>{card.name}</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Can Share</Text>
            <View style={styles.skillsContainer}>
              {card.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Want to Learn</Text>
            <View style={styles.skillsContainer}>
              {card.learningInterests.map((skill, index) => (
                <View key={index} style={styles.learningChip}>
                  <Text style={styles.learningText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bioText}>{card.bio}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Find Matches</Text>
          <View style={styles.headerIcons}>
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

      <View style={styles.cardContainer}>
        <Swiper
          ref={swiperRef}
          cards={DUMMY_PROFILES}
          renderCard={renderCard}
          onSwipedLeft={(cardIndex) => {
            console.log("Swiped left on", DUMMY_PROFILES[cardIndex].name);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swiped right on", DUMMY_PROFILES[cardIndex].name);
          }}
          cardIndex={0}
          backgroundColor={"transparent"}
          stackSize={2}
          verticalSwipe={false}
          cardVerticalMargin={40}
          cardHorizontalMargin={20}
          animateOverlayLabelsOpacity
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "#FF4B4B",
                  color: "white",
                  fontSize: 24,
                  borderRadius: 8,
                  padding: 10,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  backgroundColor: "#4CAF50",
                  color: "white",
                  fontSize: 24,
                  borderRadius: 8,
                  padding: 10,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => swiperRef.current.swipeLeft()}
        >
          <MaterialCommunityIcons name="close" size={30} color="#FF4B4B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => swiperRef.current.swipeRight()}
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
  },
  cardStyle: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.6,
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
  },
  cardHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  cardContent: {
    padding: 20,
    flex: 1,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "500",
  },
  learningChip: {
    backgroundColor: "rgba(200, 80, 192, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  learningText: {
    color: "#C850C0",
    fontSize: 14,
    fontWeight: "500",
  },
  bioSection: {
    marginTop: 8,
  },
  bioText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
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
});
