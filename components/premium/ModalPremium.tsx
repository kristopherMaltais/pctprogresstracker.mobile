import {
  PremiumState,
  usePremium,
} from "@/contexts/premium/PremiumContextProvider";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalPremiumProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ModalPremium: React.FC<ModalPremiumProps> = ({
  isVisible,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const { getIcon } = useTheme();
  const { premiumState } = usePremium();

  const getMessage = () => {
    if (premiumState == PremiumState.PENDING) {
      return t("index:premium.message");
    } else if (premiumState == PremiumState.SUCCESS) {
      return t("index:premium.success");
    } else if (premiumState == PremiumState.ERROR) {
      return t("index:premium.error");
    }

    return "";
  };

  const showBuyButton = () => {
    if (premiumState == PremiumState.PENDING) {
      return true;
    } else if (premiumState == PremiumState.SUCCESS) {
      return false;
    } else if (premiumState == PremiumState.ERROR) {
      return true;
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {premiumState == PremiumState.PROCESSING ? (
            <View style={styles.loading}>
              <Image
                source={getIcon("imageBuilderPlaceholder")}
                style={styles.loadingImage}
              />
              <Text>Purchase in progress...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.title}>{t("index:premium.title")}</Text>
              <Text style={styles.message}>{getMessage()}</Text>
              <View style={styles.buttonContainer}>
                {showBuyButton() && (
                  <Pressable style={styles.confirmButton} onPress={onConfirm}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {t("index:premium.button.buy")}
                    </Text>
                  </Pressable>
                )}
                <Pressable style={styles.cancelButton} onPress={onCancel}>
                  <Text>
                    {premiumState == PremiumState.SUCCESS
                      ? t("index:premium.button.close")
                      : t("index:premium.button.cancel")}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {},
  buttonContainer: {
    flexDirection: "row",
    marginTop: 60,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  confirmButton: {
    marginRight: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFCD3C",
  },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E8E8EE",
  },
  loading: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
});
