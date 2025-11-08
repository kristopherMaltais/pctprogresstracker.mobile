import { Image, StyleSheet, View } from "react-native";

export const ImageBuilderLoading: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/hikingProgressPlaceholder.gif")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  image: {
    width: 150,
    height: 150,
  },
});
