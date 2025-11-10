import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import * as MediaLibrary from "expo-media-library";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

export const Download: React.FC = () => {
  const { t } = useTranslation();
  const { viewShot } = useViewShot();

  const handleDownload = async () => {
    try {
      const uri = await viewShot.capture();

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Cannot save image without permission."
        );
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("MyApp", asset, false);
      Alert.alert("Saved!", "Your image has been saved to the gallery.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save image.");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDownload}>
      <Text style={styles.label}>{t("index:userSettings.download")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    width: "48%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
});
