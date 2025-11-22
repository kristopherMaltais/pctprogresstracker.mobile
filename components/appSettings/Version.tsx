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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 100,
    width: "100%",
    bottom: 100,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  madeInQuebec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flagImage: { width: 30, height: 20, marginRight: 8 },
});
