import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useService } from "@/src/hooks/useService";
import { Hike as HikeModel } from "@/src/models/hike";
import { Sticker } from "@/src/models/sticker";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const Hike: React.FC = () => {
  const { theme } = useTheme();
  const hikeService: HikeService = useService("Hike.HikeService");
  const setSelectedHike = useUserSettingsStore((s) => s.setSelectedHike);

  const route = useRoute<RouteProp<HikeSearchStackParamList, "hike">>();
  const { id } = route.params;

  const [hike, setHike] = useState<HikeModel | undefined>();

  useEffect(() => {
    hikeService
      .getHikeById(id)
      .then((hike: HikeModel) => {
        setHike(hike);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setHikeTest = (id: string) => {
    if (hike) {
      setSelectedHike({ ...hike, selectedStickerId: id });
    }
  };

  return (
    <ScrollView style={styles(theme).container}>
      {hike?.stickers.map((sticker: Sticker) => {
        return (
          <Pressable onPress={() => setHikeTest(sticker.id)}>
            <Text key={sticker.id}>{sticker.id}</Text>
          </Pressable>
        );
      })}
      <Text>{}</Text>
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
