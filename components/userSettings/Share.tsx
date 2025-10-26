import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Share: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.label}>Partager</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFCD3C",
    width: "48%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    fontWeight: "600",
    color: "white",
  },
  label: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
  },
});
