import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ShowBordersSwitchProps = {};

export const ShowBordersSwitch: React.FC<ShowBordersSwitchProps> = ({}) => {
  const { showBorders, setShowBorders } = useUserChoices();
  const { t } = useTranslation();
  const handleToggle = () => {
    setShowBorders(!showBorders);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("index:userSettings.borders.title")}</Text>
      <Pressable style={styles.switchContainer} onPress={handleToggle}>
        <View style={[styles.option, showBorders && styles.activeOption]}>
          <Text style={[styles.text, showBorders && styles.activeText]}>
            {t("index:userSettings.borders.show")}
          </Text>
        </View>
        <View style={[styles.option, !showBorders && styles.activeOption]}>
          <Text style={[styles.text, !showBorders && styles.activeText]}>
            {t("index:userSettings.borders.hide")}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    width: 120,
    height: 40,
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeOption: {
    backgroundColor: "#FFCD3C",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  activeText: {
    color: "#fff",
  },
});
