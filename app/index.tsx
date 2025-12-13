// App.tsx
import { DropDownHikeList } from "@/components/common/dropdownHikeList/DropDownHikeList";
import { ModalError } from "@/components/common/modals/ModalError";
import { ModalSuccess } from "@/components/common/modals/ModalSuccess";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
import { EditStickerMenu } from "@/components/userSettings/editSticker/EditStickerMenu";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useValidation } from "@/contexts/validation/ValidationContextProvider";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  const {
    errorMessage,
    successMessage,
    isErrorModalVisisble,
    isSuccessModalVisible,
    closeValidationModal,
  } = useValidation();

  const { showEditStickerMenu, closeEditStickerMenu } = useUserChoices();

  const { theme } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.secondaryBackground }}
        enablePanDownToClose
        onClose={closeEditStickerMenu}
        index={showEditStickerMenu ? 1 : -1}
      >
        <BottomSheetView style={styles(theme).contentContainer}>
          <EditStickerMenu />
        </BottomSheetView>
      </BottomSheet>
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
