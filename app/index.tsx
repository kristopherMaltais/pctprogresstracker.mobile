// App.tsx
import { DropDownHikeList } from "@/components/DropDownHikeList";
import { ImageBuilderSlider } from "@/components/imageBuilder/slider/ImageBuilderSlider";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.scrollContainer}>
      <DropDownHikeList />
      <ImageBuilderSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
});
