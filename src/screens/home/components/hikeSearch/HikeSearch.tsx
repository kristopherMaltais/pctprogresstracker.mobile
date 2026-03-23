import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useNavigation } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { DropDownHikeList } from "./DropDownHikeList";

export const HikeSearch: React.FC = ({}) => {
  const { theme, getIcon, isDarkMode } = useTheme();

  const navigation = useNavigation<any>();

  const openHikeList = () => navigation.navigate("hikeSearch");

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity
        style={{ ...styles(theme).mapIconContainer, borderColor: isDarkMode ? theme.text : "white" }}
        onPress={openHikeList}
      >
        <Image style={styles(theme).mapIcon} source={getIcon("map")} />
      </TouchableOpacity>
      <DropDownHikeList />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      backgroundColor: theme.header,
      height: 80,
      paddingHorizontal: 18,
    },
    mapIcon: { width: 30, height: 30 },
    mapIconContainer: {
      padding: 6,
      borderWidth: 2,
      borderRadius: 30,
    },
  });
