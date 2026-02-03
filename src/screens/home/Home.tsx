// App.tsx
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { DropDownHikeList } from "./components/dropdownHikeList/DropDownHikeList";
import { ImageBuilderSlider } from "./components/imageBuilder/slider/ImageBuilderSlider";

export const Home: React.FC = () => {
  const { theme } = useTheme();

  console.log("home");

  return (
    <View style={styles(theme).scrollContainer}>
      <DropDownHikeList />
      <ImageBuilderSlider />
    </View>
  );
};

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
