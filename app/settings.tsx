// App.tsx
import { Language } from "@/components/appSettings/language/Langauge";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function settings() {
  const { getIcon } = useTheme();
  return (
    <View style={styles.container}>
      <Language />
      <View style={styles.madeInQuebec}>
        <Image
          style={{ width: 30, height: 20, marginRight: 8 }}
          source={getIcon("madeInQuebec")}
        />
        <Text>Fait au Québec !</Text>
      </View>
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
  madeInQuebec: {
    marginTop: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
