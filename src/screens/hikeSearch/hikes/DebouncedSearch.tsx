import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

export type DebouncedSearchProps = {
  onSearch: (keyword: string) => void;
  placeholder?: string;
};

export const DebouncedSearch: React.FC<DebouncedSearchProps> = ({ onSearch, placeholder }) => {
  const { theme, getIcon } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <View style={styles(theme).searchContainer}>
      <Image source={getIcon("search")} style={styles(theme).searchIcon} />
      <TextInput
        style={styles(theme).input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={placeholder || "Search..."}
        placeholderTextColor={theme.text + "80"}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.secondaryBackground,
      marginTop: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      height: 60,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 12,
      tintColor: theme.text + "80",
    },
    input: {
      flex: 1,
      color: theme.text,
      fontSize: 16,
      height: "100%",
    },
  });
