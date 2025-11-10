import React from "react";
import { StyleSheet, View } from "react-native";

type IndexIndicatorProps = {
  indexCount: number;
  activeIndex: number;
};

export const IndexIndicator: React.FC<IndexIndicatorProps> = ({
  indexCount,
  activeIndex,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: indexCount }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFCD3C",
  },
  inactiveDot: {
    backgroundColor: "#D1D1D1",
  },
});
