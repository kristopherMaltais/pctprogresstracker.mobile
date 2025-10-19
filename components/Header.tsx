import { StyleSheet, Text, View } from "react-native";

export const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Hike Snap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: "#FFCD3C",
    paddingBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
