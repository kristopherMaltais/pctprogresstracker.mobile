import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ModalConfirmation } from "../common/modals/ModalConfirmation";

type PremiumProps = {};
export const Premium: React.FC<PremiumProps> = ({}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { buyPremiumSticker } = usePremium();
  const { t } = useTranslation();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.title}>Unlock Sticker - $1.99</Text>
      </TouchableOpacity>
      <ModalConfirmation
        title={t("index:premium.title")}
        message={t("index:premium.message")}
        onConfirm={buyPremiumSticker}
        onCancel={() => setIsModalVisible(false)}
        buttonText={t("index:premium.button.buy")}
        isVisible={isModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingVertical: 20,
    paddingHorizontal: 80,
    bottom: 40,
    left: "4.5%",
    zIndex: 1,
    backgroundColor: "#F74850",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
