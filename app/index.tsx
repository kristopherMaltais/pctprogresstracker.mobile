// App.tsx
import { DropDownHikeList } from "@/components/common/dropdownHikeList/DropDownHikeList";
import { ModalError } from "@/components/common/modals/ModalError";
import { ModalSuccess } from "@/components/common/modals/ModalSuccess";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useValidation } from "@/contexts/validation/ValidationContextProvider";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef } from "react";
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

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, []);

  // snap points represent the heights
  const snapPoints = useMemo(() => ["100%"], []);

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
      {/* <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={styles(theme).contentContainer}>
          <Text>Awesome 🎉</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={() => {}}
            returnKeyType="done"
            onSubmitEditing={() => {}}
            style={{ borderWidth: 1, width: 40, height: 40 }}
          />
        </BottomSheetView>
      </BottomSheet> */}
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
