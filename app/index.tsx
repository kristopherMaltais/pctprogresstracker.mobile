// App.tsx
import { DropDownHikeList } from "@/components/DropDownHikeList";
import { ImageBuilderLoading } from "@/components/imageBuilder/ImageBuilderLoading";
import { ImageBuilderSlider } from "@/components/imageBuilder/ImageBuilderSlider";
import { UserSettings } from "@/components/userSettings/UserSettings";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
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

      <View style={styles.hikingProgressContainer}>
        {selectedHike ? <ImageBuilderSlider /> : <ImageBuilderLoading />}
      </View>
      {selectedHike && <UserSettings />}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  hikingProgressContainer: {
    height: 550,
    marginTop: -15,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
