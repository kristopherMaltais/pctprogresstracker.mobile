// App.tsx
import { Language } from "@/components/appSettings/language/Langauge";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function settings() {
  return (
    <View style={styles.container}>
      <Language />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
  },
});
