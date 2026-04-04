import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useService } from "@/src/hooks/useService";
import { HikeList as HikeListModel } from "@/src/models/hikeList";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { DebouncedSearch } from "./DebouncedSearch";
import { HikeCard } from "./HikeCard";

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

  useEffect(() => {
    loadHikes(0);
  }, [loadHikes]);

  const loadMoreHikes = async () => {
    if (isLoadingMore || !hasMoreHikes || isSearching || isInitialLoading) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    await loadHikes(nextPage);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

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
  const isLoading = isInitialLoading || isSearchLoading;

  return (
    <FlatList
      style={styles(theme).container}
      contentContainerStyle={styles(theme).contentContainer}
      data={displayedHikes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HikeCard
          hike={item}
          onPress={(hike) => navigation.navigate("hike", { id: hike.id, name: hike.name })}
        />
      )}
      ListHeaderComponent={
        <View>
          <DebouncedSearch onSearch={handleSearch} placeholder={t("hikeSearch:search.placeholder")} />
          <Text style={styles(theme).sectionTitle}>
            {isSearching ? t("hikeSearch:list.searchResults") : t("hikeSearch:list.allHikes")}
          </Text>
        </View>
      }
      ListEmptyComponent={
        isLoading ? (
          <View style={styles(theme).loadingContainer}>
            <ActivityIndicator size="large" color={theme.text} />
          </View>
        ) : (
          <View style={styles(theme).emptyContainer}>
            <Text style={styles(theme).emptyText}>
              {isSearching ? t("hikeSearch:list.noResults") : t("hikeSearch:list.noHikes")}
            </Text>
          </View>
        )
      }
      ListFooterComponent={
        isLoadingMore && !isSearching ? (
          <View style={styles(theme).footerLoading}>
            <ActivityIndicator size="small" color={theme.text} />
          </View>
        ) : null
      }
      onEndReached={loadMoreHikes}
      onEndReachedThreshold={0.3}
      ItemSeparatorComponent={() => <View style={styles(theme).separator} />}
    />
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 40,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
      marginBottom: 12,
      marginTop: 16,
    },
    separator: {
      height: 12,
    },
    loadingContainer: {
      paddingVertical: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyContainer: {
      paddingVertical: 40,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 14,
      color: theme.text,
      opacity: 0.5,
      textAlign: "center",
    },
    footerLoading: {
      paddingVertical: 20,
      alignItems: "center",
    },
  });
