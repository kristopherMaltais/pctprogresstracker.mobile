import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PremiumButtonProps = {};
export const PremiumButton: React.FC<PremiumButtonProps> = ({}) => {
  const { setIsPremiumModalVisible } = usePremium();
  const { t } = useTranslation();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsPremiumModalVisible(true)}
      >
        <Text style={styles.title}>{t("index:premium.button.unlock")}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    paddingVertical: 20,
    bottom: 40,
    zIndex: 1,
    backgroundColor: "#F74850",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    left: "5%",
    width: "90%",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
