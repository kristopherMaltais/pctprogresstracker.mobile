import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SharingButtonProps = {
  onPress: () => void;
  image: string;
  title: string;
  description?: string;
  isLocked?: boolean;
};

export const SharingButton: React.FC<SharingButtonProps> = ({ onPress, image, title, description, isLocked }) => {
  const { theme, getIcon } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...styles(theme).container, opacity: isLocked ? 0.5 : 1 }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles(theme).iconContainer}>
        <Image style={styles(theme).logo} source={getIcon(image)} />
      </View>

      <View style={styles(theme).textContainer}>
        <Text style={styles(theme).title}>{title}</Text>
        <Text style={styles(theme).description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

console.log("sb");

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row", // On aligne icône à gauche, texte à droite
      alignItems: "center",
      width: "100%", // Prend toute la largeur
      paddingVertical: 12, // Zone de clic confortable
      marginBottom: 8,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.secondaryBackground, // Ou une couleur légèrement différente du fond
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16, // Espace entre icône et texte
      // Optionnel: petite ombre ou bordure
      borderWidth: 1,
      borderColor: theme.text + "20", // 20% d'opacité
    },
    logo: {
      width: 28,
      height: 28,
      resizeMode: "contain",
    },
    textContainer: {
      flex: 1, // Prend tout l'espace restant
      justifyContent: "center",
    },
    title: {
      color: theme.text,
      fontSize: 14, // Plus gros
      fontWeight: "500", // Semi-bold
      marginBottom: 4,
    },
    description: {
      color: theme.text, // Ou theme.secondaryText si tu as ça
      opacity: 0.6, // On rend la description plus discrète
      fontSize: 10,
    },
  });
