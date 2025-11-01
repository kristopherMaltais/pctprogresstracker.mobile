import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Download: React.FC = () => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.container}>
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
