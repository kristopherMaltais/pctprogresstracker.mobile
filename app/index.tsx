// App.tsx
import { DropDownHikeList } from "@/components/DropDownHikeList";
import { HikingProgressOptionsSlider } from "@/components/hikingProgress/HikingProgressOptionsSlider";
import { HikingProgressPlaceholder } from "@/components/hikingProgress/HikingProgressPlaceholder";
import { UserSettings } from "@/components/userSettings/UserSettings";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ViewShot from "react-native-view-shot";

export default function App() {
  const viewShotRef = useRef<ViewShot>(null);

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
      <View style={styles.dropDownListContainer}>
        <DropDownHikeList />
      </View>
      <View style={styles.hikingProgressContainer}>
        {selectedHike ? (
          <HikingProgressOptionsSlider />
        ) : (
          <HikingProgressPlaceholder />
        )}
      </View>
      {selectedHike && <UserSettings />}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  dropDownListContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFCD3C",
  },
  hikingProgressContainer: {
    height: 550,
    marginTop: -10,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
