import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type HeaderProps = {
  pageTitle: string;
  toggleAppSettingsDrawer: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  toggleAppSettingsDrawer,
}) => {
  const { getIcon, theme, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { setIsPremiumModalVisible, isPremiumUnlocked } = usePremium();
  const { height } = Dimensions.get("window");
  return (
    <View
      style={{
        ...styles(theme).container,
        height: height * 0.13,
      }}
    >
      <View style={styles(theme).body}>
        <View style={styles(theme).left}>
          <Text
            style={{
              ...styles(theme).title,
              color: isDarkMode ? "#E2E4E6" : "white",
            }}
          >
            {pageTitle}
          </Text>
        </View>
        {!isPremiumUnlocked && (
          <TouchableOpacity
            onPress={() => setIsPremiumModalVisible(true)}
            style={styles(theme).premium}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {t("index:premium.button.headerGoPremium")}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleAppSettingsDrawer}>
          <Image
            source={getIcon("settings")}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "flex-end",
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: theme.header,
    },
    body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginLeft: 8,
    },
    left: { display: "flex", flexDirection: "row", alignItems: "center" },
    premium: {
      paddingHorizontal: 16,
      borderRadius: 15,
      paddingVertical: 8,
      fontWeight: "bold",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      backgroundColor: theme.primary,
    },
  });
