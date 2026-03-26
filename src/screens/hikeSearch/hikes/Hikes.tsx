import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useService } from "@/src/hooks/useService";
import { HikeList as HikeListModel } from "@/src/models/hikeList";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DebouncedSearch } from "./DebouncedSearch";
import { HikeList } from "./HikeList";

export const Hikes: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const hikeService: HikeService = useService("Hike.HikeService");
  const navigation = useNavigation<NavigationProp<HikeSearchStackParamList>>();

  const [hikes, setHikes] = useState<HikeListModel[]>([]);
  const [searchResults, setSearchResults] = useState<HikeListModel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreHikes, setHasMoreHikes] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Load hikes with pagination
  const loadHikes = useCallback(
    async (page: number) => {
      try {
        if (page === 0) {
          setHikes([]);
        }

        const newHikes = await hikeService.getHikes(page, 10);

        if (newHikes.length < 10) {
          setHasMoreHikes(false);
        }

        if (page === 0) {
          setHikes(newHikes);
          setIsInitialLoading(false);
        } else {
          setHikes((prev) => [...prev, ...newHikes]);
        }
      } catch (error) {
        console.error("Error loading hikes:", error);
        setIsInitialLoading(false);
      }
    },
    [hikeService]
  );

  // Load initial hikes
  useEffect(() => {
    loadHikes(0);
  }, [loadHikes]);

  // Load more hikes (pagination)
  const loadMoreHikes = async () => {
    if (isLoadingMore || !hasMoreHikes || isSearching) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    await loadHikes(nextPage);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

  // Handle search
  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setIsSearchLoading(false);
      return;
    }

    setIsSearching(true);
    setIsSearchLoading(true);
    try {
      const results = await hikeService.searchHikes(keyword);
      setSearchResults(results);
      setIsSearchLoading(false);
    } catch (error) {
      console.error("Error searching hikes:", error);
      setSearchResults([]);
      setIsSearchLoading(false);
    }
  };

  const displayedHikes = isSearching ? searchResults : hikes;

  return (
    <ScrollView
      style={styles(theme).container}
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

        if (isCloseToBottom && !isSearching) {
          loadMoreHikes();
        }
      }}
      scrollEventThrottle={400}
    >
      <DebouncedSearch onSearch={handleSearch} placeholder={t("hikeSearch:search.placeholder")} />

      <HikeList
        hikes={displayedHikes}
        onSelectHike={(hike) => {
          navigation.navigate("hike", { id: hike.id });
        }}
        isSearching={isSearching}
        isLoading={isInitialLoading || isSearchLoading}
      />

      {isLoadingMore && !isSearching && (
        <View style={styles(theme).loadingContainer}>
          <ActivityIndicator size="small" color={theme.text} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    loadingContainer: {
      paddingVertical: 20,
      alignItems: "center",
    },
  });
