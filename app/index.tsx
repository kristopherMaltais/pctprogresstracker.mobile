// App.tsx
import { DropDownHikeList } from "@/components/DropDownHikeList";
import { HikingProgressBuilder } from "@/components/hikingProgress/HikingProgressBuilder";
import { HikingProgressPlaceholder } from "@/components/hikingProgress/HikingProgressPlaceholder";
import { UserSettings } from "@/components/userSettings/UserSettings";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ViewShot from "react-native-view-shot";

export default function App() {
  const viewShotRef = useRef<ViewShot>(null);

  const { selectedHike } = useUserChoices();

  return (
    <ScrollView bounces={false} style={styles.container}>
      <View style={styles.dropDownListContainer}>
        <DropDownHikeList />
      </View>
      <View style={styles.hikingProgressContainer}>
        {selectedHike ? (
          <HikingProgressBuilder />
        ) : (
          <HikingProgressPlaceholder />
        )}
      </View>
      <UserSettings />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
});
