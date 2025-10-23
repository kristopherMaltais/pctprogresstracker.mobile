import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type SettingProps = {
  name: string;
  isToggle?: boolean;
  isEnable?: boolean;
  icon: string;
  onSettingPress?: () => void;
};

export const Setting: React.FC<SettingProps> = ({
  name,
  isToggle,
  isEnable,
  icon,
  onSettingPress,
}) => {
  const { theme, getIcon } = useTheme();

  return (
    <TouchableOpacity style={styles(theme).container} onPress={onSettingPress}>
      <Image source={getIcon(icon)} style={styles(theme).icon} />
      <Text style={styles(theme).title}>{name}</Text>
      <View
        style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
      >
        {isToggle ? (
          <Switch
            testID="switch"
            style={styles(theme).switch}
            trackColor={{ true: theme.primary }}
            value={isEnable}
            onChange={onSettingPress}
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
      flex: 1,
    },
    title: {
      fontWeight: "500",
      color: theme.textPrimary,
    },
    chevron: {
      width: 10,
      height: 10,
    },
    icon: {
      width: 25,
      height: 25,
      marginRight: 16,
    },
    switch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  });
