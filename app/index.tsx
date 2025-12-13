// App.tsx
import { DropDownHikeList } from "@/components/common/dropdownHikeList/DropDownHikeList";
import { ModalError } from "@/components/common/modals/ModalError";
import { ModalSuccess } from "@/components/common/modals/ModalSuccess";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useValidation } from "@/contexts/validation/ValidationContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  const {
    errorMessage,
    successMessage,
    isErrorModalVisisble,
    isSuccessModalVisible,
    closeValidationModal,
  } = useValidation();

  const { theme } = useTheme();

  return (
    <View style={styles(theme).scrollContainer}>
      <DropDownHikeList />
      <ImageBuilderSlider />
      <ModalError
        isVisible={isErrorModalVisisble}
        message={errorMessage}
        closeModal={closeValidationModal}
      />
      <ModalSuccess
        isVisible={isSuccessModalVisible}
        message={successMessage}
        closeModal={closeValidationModal}
      />
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      alignItems: "center",
      height: 400,
    },
  });
