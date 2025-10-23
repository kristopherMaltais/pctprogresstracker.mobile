import { StyleSheet, Text, View } from "react-native";

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hike Snap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: "#FFCD3C",
    paddingBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
