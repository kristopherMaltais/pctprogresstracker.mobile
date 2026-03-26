// App.tsx
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageBuilderSlider } from "./components/imageBuilder/slider/ImageBuilderSlider";

export const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerBackground} />
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
    headerBackground: {
      backgroundColor: theme.header,
      height: 20,
      width: "100%",
    },
  });
