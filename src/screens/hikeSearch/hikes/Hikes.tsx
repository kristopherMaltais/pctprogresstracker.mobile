import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useService } from "@/src/hooks/useService";
import { HikeList as HikeListModel } from "@/src/models/hikeList";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DebouncedSearch } from "./DebouncedSearch";
import { FavoriteHikes } from "./FavoriteHikes";
import { HikeList } from "./HikeList";

export const Hikes: React.FC = () => {
  const { theme } = useTheme();
  const hikeService: HikeService = useService("Hike.HikeService");

  const [hikes, setHikes] = useState<HikeListModel[]>([]);

  useEffect(() => {
    hikeService
      .getHikes(0, 10)
      .then((hikes: HikeListModel[]) => {
        setHikes(hikes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView style={styles(theme).container}>
      <DebouncedSearch onSearch={() => {}} />
      <FavoriteHikes />
      <HikeList />
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
    },
  });
