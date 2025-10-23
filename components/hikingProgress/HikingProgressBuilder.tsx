import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { HikingProgressMap } from "./HikingProgressMap";
import { HikingProgressSticker } from "./HikingProgressSticker";

export const HikingProgressBuilder: React.FC = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const { width } = Dimensions.get("window");
  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 16}
      decelerationRate="fast"
      contentContainerStyle={{ paddingRight: 16 }}
    >
      <View style={[styles.item, { width: width - 32 }]}>
        <HikingProgressSticker setScrollEnabled={setScrollEnabled} />
      </View>
      <View style={[styles.item, { width: width - 32 }]}>
        <HikingProgressMap />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    shadowColor: "#000",
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    height: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
    backgroundColor: "white",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
