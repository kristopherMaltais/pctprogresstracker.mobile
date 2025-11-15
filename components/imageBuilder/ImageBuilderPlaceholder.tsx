import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { Image, StyleSheet, View } from "react-native";

export const ImageBuilderPlaceholder: React.FC = () => {
  const { getIcon } = useTheme();
  return (
    <View style={styles.container}>
      <Image source={getIcon("imageBuilderPlaceholder")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
  },
});
