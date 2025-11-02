import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import * as Sharing from "expo-sharing";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

export const Share: React.FC = () => {
  const { t } = useTranslation();
  const { viewShot } = useViewShot();

  const share = async () => {
    if (!viewShot) {
      Alert.alert("Error", "No image available to share.");
      return;
    }

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(viewShot, {
        dialogTitle: "Share your hiking progress",
      });
    } catch (err) {
      console.error("Share failed:", err);
      Alert.alert("Error", "Failed to share image");
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={share}>
      <Text style={styles.label}>{t("index:userSettings.share")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFCD3C",
    width: "48%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    fontWeight: "600",
    color: "white",
  },
  label: {
    fontWeight: "600",
    color: "white",
    fontSize: 16,
  },
});
