import { ModalError } from "@/src/common/components/modals/ModalError";
import { ModalSuccess } from "@/src/common/components/modals/ModalSuccess";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useValidation } from "@/src/contexts/validation/ValidationContextProvider";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { SafeAreaView } from "react-native-safe-area-context";
import Settings from "../common/components/appSettings/Settings";
import { ModalPremium } from "../common/components/premium/ModalPremium";
import { usePremium } from "../contexts/premium/PremiumContextProvider";

type ScreenLayoutProps = {
  areSettingsOpen: boolean;
  setAreSettingsOpen: (flag: boolean) => void;
  children: React.ReactNode;
};

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, areSettingsOpen, setAreSettingsOpen }) => {
  const { errorMessage, successMessage, isErrorModalVisisble, isSuccessModalVisible, closeValidationModal } =
    useValidation();

  const { isPremiumModalVisible, setIsPremiumModalVisible, unlockPremium } = usePremium();

  const { theme } = useTheme();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Drawer
        open={areSettingsOpen}
        onOpen={() => setAreSettingsOpen(true)}
        onClose={() => setAreSettingsOpen(false)}
        drawerPosition="right"
        renderDrawerContent={() => <Settings />}
        drawerStyle={{ width: "75%", backgroundColor: "white" }}
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: theme.header }} edges={["top"]} />
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={["left", "right", "bottom"]}>
          {children}
          <ModalError isVisible={isErrorModalVisisble} message={errorMessage} closeModal={closeValidationModal} />
          <ModalSuccess isVisible={isSuccessModalVisible} message={successMessage} closeModal={closeValidationModal} />
          <ModalPremium
            onConfirm={unlockPremium}
            onCancel={() => setIsPremiumModalVisible(false)}
            isVisible={isPremiumModalVisible}
          />
        </SafeAreaView>
      </Drawer>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: theme.header,
    },
  });
