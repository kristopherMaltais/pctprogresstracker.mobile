// App.tsx
import { Language } from "@/components/appSettings/language/Language";
import { Version } from "@/components/appSettings/Version";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function settings() {
  const { getIcon } = useTheme();
  return (
    <View style={styles.container}>
      <Language />
      <Version />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
    paddingTop: 32,
  },
});
