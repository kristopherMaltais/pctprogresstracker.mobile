import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 3.5; // Un peu moins de 3 pour voir qu'il y en a d'autres

export const FavoriteHikes: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>Favorites</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles(theme).scrollContent}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles(theme).card}>
            <Text style={{ color: theme.text }}>Pacific Crest Trail</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      paddingHorizontal: 8,
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
    scrollContent: {
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 4,
    },
    card: {
      width: ITEM_WIDTH,
      height: 80,
      backgroundColor: theme.secondaryBackground,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",

      // On garde tes ombres, elles ne seront plus coupées
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,

      // AJOUT : Pour Android, parfois il faut un petit margin pour l'élévation
      marginVertical: 2,
    },
  });
