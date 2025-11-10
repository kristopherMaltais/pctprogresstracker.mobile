// App.tsx
import { DropDownHikeList } from "@/components/DropDownHikeList";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  const { selectedHike } = useUserChoices();

  return (
    <View style={styles.scrollContainer}>
      <DropDownHikeList />
      <ImageBuilderSlider />
    </View>
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
