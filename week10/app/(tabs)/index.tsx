import { useState, useRef } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as Sharing from "expo-sharing";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <View style={styles.permissionIcon}>
            <Text style={styles.permissionIconText}>📸</Text>
          </View>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionDesc}>
            Please allow camera access to capture and share amazing moments
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });
        setPhoto(photo.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const sharePhoto = async () => {
    if (photo) {
      try {
        const isSharingAvailable = await Sharing.isAvailableAsync();
        if (isSharingAvailable) {
          await Sharing.shareAsync(photo);
        } else {
          Alert.alert("Error", "Sharing is not available on this device");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to share photo");
      }
    }
  };

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.previewHeader}>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.previewButton, styles.shareButton]}
            onPress={sharePhoto}
          >
            <Text style={styles.previewButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: photo }} style={styles.preview} />
        <View style={styles.previewFooter}>
          <TouchableOpacity
            style={styles.previewActionButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.actionButtonText}>Take Another Photo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cameraContent}>
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.flipText}>🔄</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <View style={[styles.flipButton, { opacity: 0 }]} />
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  cameraContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipText: {
    fontSize: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
  },
  preview: {
    flex: 1,
    resizeMode: "contain",
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  previewButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "#0066ff",
  },
  previewButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  previewFooter: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  previewActionButton: {
    backgroundColor: "#0066ff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContent: {
    alignItems: "center",
    padding: 30,
  },
  permissionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  permissionIconText: {
    fontSize: 40,
  },
  permissionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  permissionDesc: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#0066ff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  permissionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
