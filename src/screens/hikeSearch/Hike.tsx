import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useService } from "@/src/hooks/useService";
import { Hike as HikeModel } from "@/src/models/hike";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const Hike: React.FC = () => {
  const { theme } = useTheme();
  const hikeService: HikeService = useService("Hike.HikeService");

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

  return (
    <ScrollView style={styles(theme).container}>
      <Text>{hike?.name}</Text>
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
