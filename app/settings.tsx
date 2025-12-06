import { Language } from "@/components/appSettings/language/Language";
import { PrivacyPolicy } from "@/components/appSettings/PrivacyPolicy";
import { Terms } from "@/components/appSettings/Terms";
import { Version } from "@/components/appSettings/Version";
import React from "react";
import { StyleSheet, View } from "react-native";

export const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Language />
      <Terms />
      <PrivacyPolicy />
      <Version />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
    paddingTop: 32,
  },
});
