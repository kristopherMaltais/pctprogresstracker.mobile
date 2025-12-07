import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type SettingProps = {
  name: string;
  isToggle?: boolean;
  isEnable?: boolean;
  icon?: string;
  onSettingPress?: () => void;
};

export const Setting: React.FC<SettingProps> = ({
  name,
  isToggle,
  isEnable,
  icon,
  onSettingPress,
}) => {
  const { getIcon, theme } = useTheme();

  return (
    <TouchableOpacity style={styles(theme).container} onPress={onSettingPress}>
      {icon && <Image source={getIcon(icon)} style={styles(theme).icon} />}
      <Text style={styles(theme).title}>{name}</Text>
      <View style={styles(theme).clickable}>
        {isToggle ? (
          <Switch
            testID="switch"
            style={styles(theme).switch}
            value={isEnable}
            onChange={onSettingPress}
            trackColor={{ true: theme.primary, false: "grey" }}
            ios_backgroundColor="grey"
          />
        ) : (
          <Image
            accessibilityRole="image"
            source={getIcon("rightChevron")}
            style={styles(theme).chevron}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontWeight: "500",
      color: theme.text,
    },
    chevron: {
      width: 10,
      height: 10,
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 16,
    },
    switch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
    clickable: { flex: 1, justifyContent: "flex-end", flexDirection: "row" },
  });
