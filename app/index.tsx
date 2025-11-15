// App.tsx
import { DropDownHikeList } from "@/components/common/DropDownHikeList";
import { ModalError } from "@/components/common/modals/ModalError";
import { ModalSuccess } from "@/components/common/modals/ModalSuccess";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
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
  return (
    <View style={styles.scrollContainer}>
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

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
