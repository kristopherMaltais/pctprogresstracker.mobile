import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type VersionProps = {};

export const Version: React.FC<VersionProps> = ({}) => {
  const { getIcon } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.madeInQuebec}>
        <Image style={styles.flagImage} source={getIcon("madeInQuebec")} />
        <Text>Fait au Québec !</Text>
      </View>
      <View style={styles.version}>
        <Text>V.1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    height: 100,
    bottom: 120,
    width: "100%",
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    borderTopWidth: 0.5,
    color: "#ccc",
  },
  madeInQuebec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flagImage: { width: 30, height: 20, marginRight: 8 },
  version: {},
});
