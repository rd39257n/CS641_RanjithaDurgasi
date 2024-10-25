import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface ListItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

const DATA: ListItem[] = [
  {
    id: "1",
    title: "React Native Development",
    description: "Build native apps with React Native framework",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "2",
    title: "Expo Router",
    description: "File-based routing for React Native apps",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "3",
    title: "TypeScript Integration",
    description: "Type-safe development for better code quality",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "4",
    title: "Component Libraries",
    description: "Reusable components for faster development",
    image: require("@/assets/images/react-logo.png"),
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  const openModal = (item: ListItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openModal(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.cardDescription}>
            {item.description}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          React Native Features
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Tap on any card to learn more
        </ThemedText>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <ThemedText type="title" style={styles.modalTitle}>
                  {selectedItem.title}
                </ThemedText>
                <ThemedText style={styles.modalDescription}>
                  {selectedItem.description}
                </ThemedText>
                <View style={styles.modalDivider} />
                <ThemedText style={styles.modalText}>
                  This is an example of how modal and FlatList components can
                  work together to create an interactive user interface. The
                  modal provides a detailed view of the selected item while
                  maintaining a clean and organized list view.
                </ThemedText>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    ...Platform.select({
      ios: {
        paddingTop: 60,
      },
      android: {
        paddingTop: 20,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6C757D",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6C757D",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 16,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#495057",
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: "#228BE6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
