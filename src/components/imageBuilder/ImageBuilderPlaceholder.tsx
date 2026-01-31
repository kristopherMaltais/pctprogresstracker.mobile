import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { StyleSheet, View } from "react-native";

export const ImageBuilderPlaceholder: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  return (
    <View
      style={{
        ...styles(theme).container,
        backgroundColor: isDarkMode ? theme.background : "#E0E0E0",
      }}
    />
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: "90%",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },
    image: {
      width: 150,
      height: 150,
    },
  });
