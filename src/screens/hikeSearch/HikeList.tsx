import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useService } from "@/src/hooks/useService";
import { HikeList as HikeListModel } from "@/src/models/hikeList";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const HikeList: React.FC = () => {
  const { theme } = useTheme();
  const hikeService: HikeService = useService("Hike.HikeService");
  const navigation = useNavigation<NavigationProp<HikeSearchStackParamList>>();

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

  const navigateToHike = (id: string) => navigation.navigate("hike", { id: id });

  return (
    <ScrollView style={styles(theme).container}>
      {hikes.map((hike: HikeListModel) => {
        return (
          <Pressable key={hike.id} onPress={() => navigateToHike(hike.id)}>
            <Text style={{ color: "white" }}>{hike.name}</Text>
          </Pressable>
        );
      })}
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
