import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type ShowBordersSwitchProps = {};

export const ShowBordersSwitch: React.FC<ShowBordersSwitchProps> = () => {
  const { showBorders, setShowBorders } = useUserChoices();
  const { getIcon } = useTheme();
  const handleToggle = () => {
    setShowBorders(!showBorders);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <Image style={styles.image} source={getIcon("borders")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 27, height: 35 },
});
