import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3.5;

export const HikeList: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>Hikes</Text>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      paddingHorizontal: 8,
      height: 200,
    },
    title: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
      marginBottom: 12,
    },
  });
