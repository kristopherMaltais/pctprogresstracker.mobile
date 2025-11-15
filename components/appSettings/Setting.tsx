import { useTheme } from "@/contexts/theme/ThemeContextProvider";
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
  const { getIcon } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onSettingPress}>
      <Image source={getIcon(icon)} style={styles.icon} />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.clickable}>
        {isToggle ? (
          <Switch
            testID="switch"
            style={styles.switch}
            value={isEnable}
            onChange={onSettingPress}
          />
        ) : (
          <Image
            accessibilityRole="image"
            source={getIcon("rightChevron")}
            style={styles.chevron}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontWeight: "500",
    color: "black",
  },
  chevron: {
    width: 10,
    height: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  switch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  clickable: { flex: 1, justifyContent: "flex-end", flexDirection: "row" },
});
