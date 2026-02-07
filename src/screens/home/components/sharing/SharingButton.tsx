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

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingVertical: 12,
      marginBottom: 8,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.secondaryBackground,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
      borderWidth: 1,
      borderColor: theme.text + "20",
    },
    logo: {
      width: 28,
      height: 28,
      resizeMode: "contain",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
    },
    description: {
      color: theme.text,
      opacity: 0.6,
      fontSize: 12,
    },
  });
