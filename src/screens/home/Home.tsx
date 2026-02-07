// App.tsx
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { DropDownHikeList } from "./components/dropdownHikeList/DropDownHikeList";
import { ImageBuilderSlider } from "./components/imageBuilder/slider/ImageBuilderSlider";

export const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <DropDownHikeList />
      <ImageBuilderSlider />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
  });
