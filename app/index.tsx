// App.tsx
import { DropDownMapList } from "@/components/DropDownMapList";
import { shareToInstagramStory } from "@/helpers/shareToInstagramStory";
import { useService } from "@/hooks/useService";
import { Map } from "@/models/map";
import { MapService } from "@/services/mapService/services/mapService";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import ViewShot from "react-native-view-shot";

export default function App() {
  const viewShotRef = useRef<ViewShot>(null);
  const mapService: MapService = useService("Map.MapService");
  const [miles, setMiles] = useState(500);

  const [maps, setMaps] = useState<Map[]>([]);

  useEffect(() => {
    mapService
      .getMaps()
      .then((maps: Map[]) => {
        setMaps(maps);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShareInstagram = async () => {
    if (!viewShotRef.current) return;
    try {
      const uri = await viewShotRef.current.capture();
      await shareToInstagramStory(uri);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to share on Instagram Story.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropDownListContainer}>
        <DropDownMapList
          maps={maps}
          onChangeMap={(value) => console.log(value)}
        />
      </View>

      {/* <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
        <View style={{ backgroundColor: "transparent" }}>
          <PctProgress
            milesDone={miles}
            totalMiles={2665}
            durationSeconds={2}
            width={500}
            height={400}
          />
        </View>
      </ViewShot>
      <Button title="Share Progress" onPress={handleShareInstagram} />
      <Button
        title="Add 500 Miles"
        onPress={() => setMiles((prev) => Math.min(prev + 500, 2665))}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dropDownListContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFCD3C",
  },
});
