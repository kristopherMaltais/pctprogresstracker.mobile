import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";

type IndexIndicatorProps = {
  indexCount: number;
  activeIndex: number;
};

export const IndexIndicator: React.FC<IndexIndicatorProps> = ({
  indexCount,
  activeIndex,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).container}>
      {Array.from({ length: indexCount }, (_, index) => (
        <View
          key={index}
          style={[
            styles(theme).dot,
            index === activeIndex
              ? styles(theme).activeDot
              : styles(theme).inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 12,
      flexDirection: "row",
      justifyContent: "center",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: theme.primary,
    },
    inactiveDot: {
      backgroundColor: "#E0E0E0",
    },
  });
