// App.tsx
import { DropDownHikeList } from "@/components/DropDownHikeList";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
import { UserSettings } from "@/components/userSettings/UserSettings";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {
  const { selectedHike } = useUserChoices();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      extraScrollHeight={100}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <DropDownHikeList />
      <ImageBuilderSlider />
      {selectedHike && <UserSettings />}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
