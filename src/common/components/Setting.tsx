import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

type SettingProps = {
  name: string;
  isToggle?: boolean;
  isEnable?: boolean;
  settingDisabled?: boolean;
  icon?: string;
  onSettingPress?: () => void;
  isLocked?: boolean;
};

export const Setting: React.FC<SettingProps> = ({
  name,
  isToggle,
  isEnable,
  icon,
  settingDisabled,
  onSettingPress,
  isLocked,
}) => {
  const { getIcon, theme } = useTheme();
  const { setIsPremiumModalVisible, isPremiumUnlocked } = usePremium();

  const handlePress = () => {
    if (isLocked) {
      setIsPremiumModalVisible(true);
    } else {
      onSettingPress && onSettingPress();
    }
  };

  return (
    <TouchableOpacity style={{ ...styles(theme).container, opacity: settingDisabled ? 0.5 : 1 }} onPress={handlePress}>
      {icon && <Image source={getIcon(icon)} style={styles(theme).icon} />}
      <Text style={{ ...styles(theme).title, opacity: isLocked ? 0.5 : 1 }}>{name}</Text>
      <View style={styles(theme).clickable}>
        {isToggle ? (
          <Switch
            testID="switch"
            style={styles(theme).switch}
            value={isEnable}
            onChange={handlePress}
            trackColor={{ true: theme.primary, false: "grey" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="grey"
          />
        ) : (
          <Image
            accessibilityRole="image"
            source={getIcon("rightChevron")}
            style={{ ...styles(theme).chevron, opacity: isLocked ? 0.5 : 1 }}
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
      fontSize: 14,
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
